import { useEffect, useState } from 'react';
import instance from '@/api/instance';
import styled from '@emotion/styled';
import { Skeleton } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import ChallengeCard from '@/components/feature/challenge/post/Card'; // Ensure this path is correct
import CommonGrid from '@/components/common/Grid';
import { Link } from 'react-router-dom';

const UserPostedChallenges = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user-posted challenges
  useEffect(() => {
    async function getUserPosts() {
      try {
        const res = await instance.get(`/api/members/challenges`);
        setData(res.data.content);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    }
    getUserPosts();
  }, []);

  return (
    <Wrapper>
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
