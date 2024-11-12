import styled from '@emotion/styled';

import StorySample from '@/assets/Main/Story.svg?react';
import LandingItems from '../Section/Landing-items';
import { useEffect, useState } from 'react';
import { FeedData } from '@/types';
import instance from '@/api/instance';
import axios from 'axios';

const StoryIntro = () => {
  const [data, setData] = useState<FeedData[]>([]);

  useEffect(() => {
    async function getFeedData() {
      try {
        const res = await instance.get(`/api/feeds`);
        const result = await res.data;
        const filteredData = result.content
          .filter((item: FeedData) => item.type === 'S')
          .slice(0, 4);
        setData(filteredData);
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
`;
const Right = styled.div`
  width: 50vw;
  display: flex;
  padding: 50px;
  align-items: center;
  justify-contents: center;
`;

export default StoryIntro;
