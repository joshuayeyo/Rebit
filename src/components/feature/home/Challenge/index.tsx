import styled from '@emotion/styled';
import ChallengeSample from '@/assets/Main/Challenge.svg?react';
import LandingItems from '../Section/Landing-items';
import instance from '@/api/instance';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ChallengeData } from '@/types';

const ChallengeIntro = () => {
  const [data, setData] = useState<ChallengeData[]>([]);

  useEffect(() => {
    async function getFeedData() {
      try {
        const res = await instance.get(`/api/challenges` );
        const result = await res.data;
        setData(result.content.slice(0, 4))
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


  return (
    <Wrapper>
      <Left>
        <LandingItems data={data} />
      </Left>
      <Right>
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
`;
export default ChallengeIntro;
