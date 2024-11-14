import CommonGrid from '@/components/common/Grid';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import WriteButton from '../WriteButton';
import { motion, AnimatePresence } from 'framer-motion';
import instance from '@/api/instance';
import { Skeleton } from '@chakra-ui/react';
import ChallengeCard from '../../post/Card';
import useChallengeFilter from '@/util/hooks/useChallengeFilter';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer'; // useInView 훅 가져오기
import axios from 'axios';

type FilterType =
  | 'RECRUITING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'UPCOMING'
  | 'ALL';

type ChallegeItemSectionProps = {
  filterType: FilterType;
};

const ChallegeItemSection = ({ filterType }: ChallegeItemSectionProps) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isModalOpen] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { filteredData, setFilter } = useChallengeFilter(data);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({ threshold: 1.0 });

  useEffect(() => {
    async function getFeedData() {
      try {
        const res = await instance.get(`/api/challenges`, {
          params: { page: page },
        });

        const result = await res.data;
        if (result.content && result.content.length > 0) {
          setData((prevData) => [...prevData, ...result.content]);
        } else {
          setHasMore(false);
        }

        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
          console.error('Error message:', errorMessage);
          alert(errorMessage);
        }
      }
    }
    if (hasMore && page >= 0) {
      getFeedData();
    }
  }, [page]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  const handlePostModalClose = () => {
    setIsPostModalOpen(false);
  };

  if (isModalOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  useEffect(() => {
    setFilter(filterType);
  }, [filterType]);

  return (
    <Wrapper>
      <Skeleton isLoaded={!isLoading}>
        <CommonGrid columns={4} gap={50}>
          <AnimatePresence>
            {Array.isArray(filteredData) &&
              filteredData.map((data, index) => (
                <motion.div
                  key={data.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  ref={index === filteredData.length - 1 ? ref : null}
                >
                  <Link
                    to={`/challenge/detail?id=${data.id}&filter=${filterType}`}
                  >
                    <ItemWrapper>
                      <ChallengeCard
                        imageUrl={data.presignedUrl}
                        title={data.title}
                        author={data.creator.nickname}
                        profilePics={data.creator.prsignedUrl}
                      />
                    </ItemWrapper>
                  </Link>
                </motion.div>
              ))}
          </AnimatePresence>
        </CommonGrid>
        <WriteButton
          isModalOpen={isPostModalOpen}
          setIsModalOpen={setIsPostModalOpen}
          handleModalClose={handlePostModalClose}
        />
      </Skeleton>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ItemWrapper = styled.button`
  width: 18vw;
  min-width: 10vw;
`;
export default ChallegeItemSection;
