import styled from '@emotion/styled';
import ChallengeSample from '@/assets/Main/Challenge.svg?react';
import LandingItems from '../Section/Landing-items';
import instance from '@/api/instance';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ChallengeData } from '@/types';
import { useNavigate } from 'react-router-dom';

const ChallengeIntro = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ChallengeData[]>([]);

  useEffect(() => {
    async function getFeedData() {
      try {
        const res = await instance.get(`/api/challenges`, {
          params: { size: 4 },
        });
        const result = await res.data;
        setData(result.content);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
          console.error('Error message:', errorMessage);
          alert(errorMessage);
        }
      }
    }
    getFeedData();
  }, []);

  const handleNavigate = () => {
    navigate('/challenge');
  };

  return (
    <Wrapper>
      <Left>
        <LandingItems data={data} />
      </Left>
      <Right onClick={handleNavigate}>
        <ChallengeSample />
      </Right>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 100vh;
  display: flex;
  scroll-snap-align: start;
`;
const Left = styled.div`
  width: 50vw;
  display: flex;
  align-items: center;
  justify-contents: center;
  padding: 50px;
`;
const Right = styled.div`
  width: 50vw;
  height: 100vh;
  cursor: pointer;
`;
export default ChallengeIntro;
