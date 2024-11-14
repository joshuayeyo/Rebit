import CommonModal from '@/components/common/Modal';
import styled from '@emotion/styled';
import UploadImage from '@/components/feature/images/UploadImage';
import { Button } from '@/components/common/Button';
import { useState } from 'react';
import instance from '@/api/instance';
import { useStoreImage } from '@/util/hooks/useStoreImage';

type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
};

const PostStoryModal = ({ isModalOpen, handleModalClose }: Props) => {
  const today = new Date();
  const time = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  };

  const [storyContent, setStoryContent] = useState('');
  const [placeholder, setPlaceholder] = useState(
    '당신의 Story를 작성하세요...',
  );
  const [isPlaceholoerRed, setIsPlaceholderRed] = useState(false); 
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const { imageKey, uploadImage2S3 } = useStoreImage({ type: 'FEED' });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!storyContent) {
      setPlaceholder('내용을 입력해야 합니다!');
      setIsPlaceholderRed(true);
      return;
    }
    if (imageKey == '') {
      alert('이미지가 없습니다!');
      return;
    }

    async function postFeedData() {
      if (file) {
        try {
          const imageKey = await uploadImage2S3(file);
          console.log(imageKey);
          await instance
            .post(`api/feeds`, {
              type: 'S',
              bookId: 1,
              imageKey: imageKey,
              content: storyContent,
            })
            .then((response) => {
              console.log(response);
            });
        } catch (e) {
          console.log(e);
        } finally {
          window.location.reload();
        }
      }
    }
    postFeedData();
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStoryContent(e.target.value);
    if (e.target.value) {
      setPlaceholder('당신의 Story를 작성하세요...');
      setIsPlaceholderRed(false);
    }
  };

  return (
    <>
      <CommonModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%', height: '100%' }}>
          <HeaderBox>
            <Today>
              {time.year}.{time.month}.{time.date}
            </Today>
          </HeaderBox>
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
                <TextForm
                  value={storyContent}
                  onChange={handleContentChange}
                  placeholder={placeholder}
                  isPlaceholderRed={isPlaceholoerRed}
                />{' '}
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
              POST!
            </Button>
          </SubmitButton>
        </form>
      </CommonModal>
    </>
  );
};

export default PostStoryModal;

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
  color: black;
  justify-content: flex-start;
  margin-bottom: 1rem;
  margin-left: 5rem;
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

const TextForm = styled.textarea<{ isPlaceholderRed: boolean }>`
  width: 90%;
  height: 80%;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  resize: none;
  color: ${(props) => (props.isPlaceholderRed ? '#ff0000' : 'inherit')};
  &:focus {
    outline: none;
    border-color: #a451f7;
  }
  ::placeholder {
    color: ${(props) =>
      props.isPlaceholderRed ? '#ff0000' : '#999'}; // placeholder 빨간색
  }
`;

const SubmitButton = styled.div`
  margin-top: -0.2rem;
  display: flex;
  width: 100%;
  height: 2rem;
  justify-content: flex-end;
`;
