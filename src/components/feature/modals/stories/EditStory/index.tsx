import CommonModal from '@/components/common/Modal';
import styled from '@emotion/styled';
import UploadImage from '@/components/feature/images/UploadImage';
import { Button } from '@/components/common/Button';
import { useState } from 'react';
import instance from '@/api/instance';
import { useStoreImage } from '@/util/hooks/useStoreImage';
import { FeedData } from '@/types';

type Props = {
  data: FeedData;
  isModalOpen: boolean;
  handleModalClose: () => void;
};

const EditStoryModal = ({ data, isModalOpen, handleModalClose }: Props) => {
  const [storyContent, setStoryContent] = useState(data?.content);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(data?.presignedUrl);
  const { uploadImage2S3 } = useStoreImage({ type: 'FEED' });
  const [imageKey, setImageKey] = useState(data.imageKey);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let updatedImageKey = imageKey;

    if (file) {
      updatedImageKey = await uploadImage2S3(file);
    }

    if (imageKey == '') {
      alert('이미지가 없습니다!');
      return;
    }

    async function postFeedData() {
      try {
        console.log(imageKey);
        await instance
          .put(`api/feeds/stories/${data.id}`, {
            imageKey: updatedImageKey,
            content: storyContent,
            bookId: 1,
          })
          .then((response) => {
            console.log(response);
            handleModalClose();
          });
      } catch (e) {
        console.log(e);
      }
    }
    postFeedData();
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStoryContent(e.target.value);
  };

  return (
    <>
      <CommonModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%', height: '100%' }}>
          <FlexContainer>
            <Left>
              <ImageContainer>
                <UploadImage
                  setFile={setFile}
                  setPreview={setPreview}
                  preview={preview}
                />
              </ImageContainer>
            </Left>
            <Right>
              <FormContainer>
                <TextForm value={storyContent} onChange={handleContentChange} />{' '}
              </FormContainer>
            </Right>
          </FlexContainer>
          <SubmitButton>
            <Button
              size={'medium'}
              theme={'lightgray'}
              style={{ justifyContent: 'flex-end' }}
              type="submit"
            >
              edit!
            </Button>
          </SubmitButton>
        </form>
      </CommonModal>
    </>
  );
};

export default EditStoryModal;

const HeaderBox = styled.section`
  height: auto;
  width: auto;
  position: absolute;
  top: 1.5rem;
  left: 1rem;
`;

const Today = styled.div`
  font-size: 40px;
  font-family: 'DungGeunMo';
  font-weight: bold;
  color: #a451f7;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 1rem;
  height: calc(100% - 6rem);
  align-items: stretch;
`;

const Left = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  margin-right: 2rem;
  margin-left: 2rem;
`;
const ImageContainer = styled.div`
  width: 80%;
  height: 100%;
`;
const Right = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  margin-right: 2rem;
  margin-left: 2rem;
`;

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextForm = styled.textarea`
  width: 90%;
  height: 80%;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  resize: none;
  color:'inherit')};
  &:focus {
    outline: none;
    border-color: #a451f7;
  }
`;

const SubmitButton = styled.div`
  margin-top: -0.2rem;
  display: flex;
  width: 100%;
  height: 2rem;
  justify-content: flex-end;
`;
