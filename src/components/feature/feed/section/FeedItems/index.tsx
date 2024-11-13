import CommonGrid from '@/components/common/Grid';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Skeleton } from '@chakra-ui/react';
import StoryDetailModal from '@/components/feature/modals/stories/ContentDetail';
import FeedCard from '@/components/feature/feed/post/Card';
import PostFeedsButton from '../WriteButton';
import useFilter from '@/util/hooks/useFilter';
import { motion, AnimatePresence } from 'framer-motion';
import instance from '@/api/instance';
import { useAuth } from '@/provider/Auth';
import FavBookDetailModal from '@/components/feature/modals/favbooks/ContentDetail';
import InfiniteScroll from 'react-infinite-scroll-component';

type selectedType = 'S' | 'FB' | 'M' | null;

const FeedItemSection = ({ filter }: { filter: string }) => {
  const { isLogin } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<selectedType>(null);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const handleDropdownOpen = () => setIsDropdownVisible(true);
  const handleDropdownClose = () => setIsDropdownVisible(false);

  useEffect(() => {
    async function getFeedData() {
      if (!hasMore) return;
      try {
        const res = await instance.get(`/api/feeds`, {
          params: { page: page },
        });
        const result = await res.data;
        if (result.content && result.content.length > 0) {
          setData((prevData) => [...prevData, ...result.content]);
          setHasMore(result.content.length > 0);
        } else {
          setHasMore(false);
        }
      } catch (e) {
        console.log(e);
        alert('Error: 데이터를 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    }
    if (hasMore && page >= 0) {
      getFeedData();
    }
  }, [page, hasMore]);

  const handleCardClick = (id: number, type: 'S' | 'FB' | 'M') => {
    if (!isLogin) {
      window.location.href = '/login';
      return;
    }
    setSelectedId(id);
    setSelectedType(type);
    setIsModalOpen(true);
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
  if (isModalOpen || isPostModalOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  if (!data) return <></>;

  const { filteredData, setFilter } = useFilter(data, 'type', filter);
  useEffect(() => {
    setFilter(filter);
  }, [filter, filteredData, setFilter]);

  const fetchData = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // 페이지를 증가시켜서 새로운 데이터를 로드
    }
  };

  return (
    <Wrapper>
      <InfiniteScroll
        dataLength={filteredData.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<></>}
        endMessage={<></>}
      >
        <CommonGrid columns={4} gap={50} style={{ overflow: 'hidden' }}>
          <AnimatePresence>
            {Array.isArray(filteredData) &&
              filteredData.map((data, index) => (
                <motion.div
                  key={data.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ItemWrapper
                    onClick={() => handleCardClick(data.id, data.type)}
                  >
                    <Skeleton isLoaded={!isLoading}>
                      <FeedCard
                        imageUrl={
                          data.type === 'S' || data.type === 'M'
                            ? data.presignedUrl
                            : data.book?.cover
                        }
                        content={
                          data.type === 'S'
                            ? data.content
                            : data.type === 'FB'
                              ? data.briefReview
                              : ''
                        }
                      />
                    </Skeleton>
                  </ItemWrapper>
                </motion.div>
              ))}
          </AnimatePresence>
        </CommonGrid>
      </InfiniteScroll>
      {isModalOpen && selectedId !== null && selectedType !== null && (
        <>
          {selectedType === 'S' && (
            <StoryDetailModal
              isModalOpen={isModalOpen}
              handleModalClose={handleModalClose}
              id={selectedId}
            />
          )}
          {selectedType === 'FB' && (
            <FavBookDetailModal
              isModalOpen={isModalOpen}
              handleModalClose={handleModalClose}
              id={selectedId}
            />
          )}
          {/*{selectedType === 'M' && (*/}
          {/*  <MagazineDetailModal*/}
          {/*    isModalOpen={isModalOpen}*/}
          {/*    handleModalClose={handleModalClose}*/}
          {/*    id={selectedId}*/}
          {/*  />*/}
          {/*)}*/}
        </>
      )}
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
