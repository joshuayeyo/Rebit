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
        const allStoryData: FeedData[] =[];
        let currentPage = 1;
        let hasMoreData = true;

        while (hasMoreData) {
          const res = await instance.get(`api/feeds`, { params: {page: currentPage}});
          const result = await res.data;

          const storyData = result.content.filter((item: FeedData) => item.type === 'S');
          allStoryData.push(...storyData);

          if (allStoryData.length >= 4) {
            hasMoreData = false;
          } else {
            currentPage += 1; // 페이지를 증가시켜서 계속 요청
          }
          setData(allStoryData.slice(0, 4))
        }
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
