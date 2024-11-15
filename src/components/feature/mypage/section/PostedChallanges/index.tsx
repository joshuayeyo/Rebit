import { useEffect, useState } from 'react';
import instance from '@/api/instance';
import styled from '@emotion/styled';
import { Skeleton } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import ChallengeCard from '@/components/feature/challenge/post/Card'; // Ensure this path is correct
import CommonGrid from '@/components/common/Grid';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const UserPostedChallenges = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function getUserPosts() {
      try {
        const res = await instance.get(`/api/members/challenges`, 
          {params: {page: page}}
        );
        const result = res.data
        if (result.content && result.content.length > 0) {
          setData((prevData) => [...prevData, ...result.content]);
          setHasMore(result.content.length > 0);
        } else {
          setHasMore(false);
        }      
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }  
    if (hasMore && page >= 0) {
      getUserPosts();
    }
  }, [page, hasMore]);

  const fetchData = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // 페이지를 증가시켜서 새로운 데이터를 로드
    }
  };

  return (
    <Wrapper>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<></>}
        endMessage={<></>}
      >
        <Skeleton isLoaded={!isLoading}>
          <CommonGrid columns={4} gap={50}>
            <AnimatePresence>
              {data.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={`/challenge/detail?id=${challenge.id}&filter=IN_PROGRESS`}
                  >
                    <ItemWrapper>
                      <ChallengeCard
                        imageUrl={challenge.presignedUrl}
                        title={challenge.title}
                        author={challenge.creator.nickname}
                        profilePics={challenge.creator.prsignedUrl}
                      />
                    </ItemWrapper>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </CommonGrid>
        </Skeleton>
      </InfiniteScroll>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemWrapper = styled.button`
  width: 18vw;
  min-width: 10vw;
`;

export default UserPostedChallenges;
