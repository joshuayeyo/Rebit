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
  const jwtToken = localStorage.getItem('jwt_token');
  const parsedToken = jwtToken ? JSON.parse(jwtToken) : null;
  const accessToken = parsedToken?.accessToken;
  const [imageKey, setImageKey] = useState('');
  const [storyContent, setStoryContent] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
            alert('데이터가 성공적으로 들어갔습니다.');
            console.log(response.data);
          });
      } catch (e) {
        console.log(e);
      }
    }
    postFeedData();
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
                  accessToken={accessToken}
                  setImageKey={setImageKey}
                />
              </ImageContainer>
            </Left>
            <Right>
              <FormContainer>
                <TextForm
                  value={storyContent}
                  onChange={(e) => setStoryContent(e.target.value)}
                  placeholder="당신의 Story를 작성하세요..."
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

const TextForm = styled.textarea`
  width: 90%;
  height: 80%;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  resize: none;
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
