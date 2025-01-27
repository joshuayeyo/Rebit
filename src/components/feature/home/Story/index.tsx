import styled from '@emotion/styled';

import StorySample from '@/assets/Main/Story.svg?react';
import LandingItems from '../Section/Landing-items';
import { useEffect, useState } from 'react';
import { FeedData } from '@/types';
import instance from '@/api/instance';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StoryIntro = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<FeedData[]>([]);

  const handleNavigate = () => {
    navigate('/feed');
  };

  useEffect(() => {
    async function getFeedData() {
      try {
        const res = await instance.get(`/api/feeds/stories`, {
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

  return (
    <Wrapper>
      <Left onClick={handleNavigate}>
        <StorySample />
      </Left>
      <Right>
        <LandingItems data={data} />
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
  point: cursor;
`;
const Right = styled.div`
  width: 50vw;
  display: flex;
  padding: 50px;
  align-items: center;
  justify-contents: center;
`;

export default StoryIntro;
