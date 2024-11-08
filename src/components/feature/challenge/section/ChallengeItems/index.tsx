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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { filteredData, setFilter } = useChallengeFilter(data);

  useEffect(() => {
    async function getFeedData() {
      try {
        const res = await instance.get(`/api/challenges`);
        const result = await res.data;
        console.log(result.content);
        setData(result.content);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        alert('Error: 데이터를 불러올 수 없습니다.');
      }
    }
    getFeedData();
  }, [setData]);

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
              filteredData.map((data) => (
                <motion.div
                  key={data.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
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
