import styled from '@emotion/styled';

import Favorite from '@/assets/Main/Favorite.svg?react';
import LandingItems from '../Section/Landing-items';
import { useEffect, useState } from 'react';
import { FeedData } from '@/types';
import instance from '@/api/instance';
import axios from 'axios';

const FavoriteIntro = () => {
  const [data, setData] = useState<FeedData[]>([]);

  useEffect(() => {
    async function getFeedData() {
      try {
        const allFBData: FeedData[] = [];
        let currentPage = 1;
        let hasMoreData = true;

        while (hasMoreData) {
          const res = await instance.get(`/api/feeds`, {params: {page: currentPage} });
          const result = await res.data;
          const fbData = result.content.filter((item: FeedData) => item.type === 'FB');
          allFBData.push(...fbData);

          if (allFBData.length >= 4) {
            hasMoreData = false;
          } else {
            currentPage += 1;
          }  
        }
        setData(allFBData.slice(0, 4));
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
        <Favorite />
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
  background-color: #89ff56;
  width: 50vw;
  display: flex;
  padding: 50px;
  align-items: center;
  justify-contents: center;
`;

export default FavoriteIntro;
