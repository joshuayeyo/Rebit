import CommonGrid from '@/components/common/Grid';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { Skeleton } from '@chakra-ui/react';
import StoryDetailModal from '@/components/feature/modals/stories/ContentDetail';
import FeedCard from '@/components/feature/feed/post/Card';
import PostFeedsButton from '../WriteButton';
import useFilter from '@/util/hooks/useFilter';
import { motion, AnimatePresence } from 'framer-motion';
const BASE_URL = import.meta.env.VITE_BASE_URL;

type selectedType = 'S' | 'FB' | 'M' | null;

const FeedItemSection = ({ filter }: { filter: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<selectedType>(null);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleDropdownOpen = () => setIsDropdownVisible(true);
  const handleDropdownClose = () => setIsDropdownVisible(false);

  useEffect(() => {
    async function getFeedData() {
      try {
        const res = await axios.get(`${BASE_URL}/api/feeds`);
        console.log(res);
        const result = await res.data;
        setData(result.content);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        alert('Error: 데이터를 불러올 수 없습니다.');
      }
    }
    getFeedData();
  }, [setData]);

  const handleCardClick = (id: number, type: 'S' | 'FB' | 'M') => {
    setSelectedId(id);
    setIsModalOpen(true);
    setSelectedType(type);
  };

  // Detail Modal과 Post 모달을 분리한다.
  const handlePostModalClose = () => {
    setIsPostModalOpen(false);
    setSelectedType(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedId(null);
    setSelectedType(null);
  };

  // 모달 열려있을 때, 스크롤 금지, 닫았을 때 다시 스크롤
  if (isModalOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  if (!data) return <></>;
  const { filteredData, setFilter } = useFilter(data, 'type', filter);

  useEffect(() => {
    setFilter(filter);
  }, [filter, filteredData, setFilter]);

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
                  <ItemWrapper
                    onClick={() => handleCardClick(data.id, data.type)}
                  >
                    <FeedCard
                      imageUrl={data.presignedUrl}
                      content={data.content}
                    />
                  </ItemWrapper>
                </motion.div>
              ))}
          </AnimatePresence>
        </CommonGrid>
        {isModalOpen && selectedId !== null && selectedType !== null && (
          <>
            {selectedType === 'S' && (
              <StoryDetailModal
                isModalOpen={isModalOpen}
                handleModalClose={handleModalClose}
                id={selectedId}
                type="S"
              />
            )}
            {/*{selectedType === 'FB' && (*/}
            {/*  <FavBookDetailModal*/}
            {/*    isModalOpen={isModalOpen}*/}
            {/*    handleModalClose={handleModalClose}*/}
            {/*    id={selectedId}*/}
            {/*    type="FB"*/}
            {/*  />*/}
            {/*)}*/}
            {/*{selectedType === 'M' && (*/}
            {/*  <MagazineDetailModal*/}
            {/*    isModalOpen={isModalOpen}*/}
            {/*    handleModalClose={handleModalClose}*/}
            {/*    id={selectedId}*/}
            {/*    type="M"*/}
            {/*  />*/}
            {/*)}*/}
          </>
        )}
      </Skeleton>
      <ButtonWrapper
        onMouseEnter={handleDropdownOpen}
        onMouseLeave={handleDropdownClose}
      >
        <PostFeedsButton
          isDropdownVisible={isDropdownVisible}
          setIsDropdownVisible={setIsDropdownVisible}
          isModalOpen={isPostModalOpen}
          setIsModalOpen={setIsPostModalOpen}
          handleModalClose={handlePostModalClose}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default FeedItemSection;

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

const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`;
