import CommonModal from '@/components/common/Modal';
import styled from '@emotion/styled';
import UploadImage from '@/components/feature/images/UploadImage';
import { Button } from '@/components/common/Button';
import { useState } from 'react';
import instance from '@/api/instance';

type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
};

const PostStoryModal = ({ isModalOpen, handleModalClose }: Props) => {
  const today = new Date();
  const time = {
    year: today.getFullYear(),
    month: today.getMonth() + 1, // 리액트의 Month는 0~11월이다.
    date: today.getDate(),
  };
  const [imageKey, setImageKey] = useState('');
  const [storyContent, setStoryContent] = useState('');
  const [placeholder, setPlaceholder] = useState(
    '당신의 Story를 작성하세요...',
  ); // placeholder를 동적으로 사용
  const [isPlaceholoerRed, setIsPlaceholderRed] = useState(false); // 입력된 텍스트가 없을 경우, placeholder를 빨갛게 바꿉니다.

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
      try {
        await instance
          .post(`api/feeds`, {
            type: 'S',
            bookId: 1, // 현재 bookId가 없으면 400 에러가 발생하여 임시로 해둔 값. Story에서는 bookId가 없어야 함.
            imageKey: imageKey,
            content: storyContent,
          })
          .then((response) => {
            console.log(response)
          });
      } catch (e) {
        console.log(e);
      } finally {
        window.location.reload(); // Posting 후 페이지 새로고침
      }
    }
    postFeedData();
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStoryContent(e.target.value);
    if (e.target.value) {
      setPlaceholder('당신의 Story를 작성하세요...'); // 내용이 입력되면 placeholder 초기화
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
                  setImageKey={setImageKey}
                  type="FEED"
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
