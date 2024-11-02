import CommonModal from '@/components/common/Modal';
import styled from '@emotion/styled';
import UploadImage from '@/components/feature/images/UploadImage';
import { Button } from '@/components/common/Button';
import { useState } from 'react';
import axios from 'axios';
// import CommonForm from '@/components/common/Form';

const BASE_URL = import.meta.env.VITE_BASE_URL;

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
        await axios
          .post(
            `${BASE_URL}/api/feeds`,
            {
              type: 'S',
              bookId: 1,
              imageKey: imageKey,
              content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            },
          )
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
                Form이 들어갈 공간입니다.
                {/* <CommonForm setStoryContent={setStoryContent} /> */}
              </FormContainer>
            </Right>
          </FlexContainer>
          <SubmitButton>
            <Button
              size={'medium'}
              theme={'outline'}
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
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmitButton = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`;
