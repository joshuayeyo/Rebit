import instance from '@/api/instance';
import CommonGrid from '@/components/common/Grid';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import FeedCard from '@/components/feature/feed/post/Card';
import { AnimatePresence, motion } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';
import FavBookDetailModal from '@/components/feature/modals/favbooks/ContentDetail';
import StoryDetailModal from '@/components/feature/modals/stories/ContentDetail';

const UserPostedFeeds = ({ filter }: { filter: string }) => {
  const [data, setData] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<'S' | 'FB' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setData([]);
    setPage(0);
    setHasMore(true);
  }, [filter]);

  useEffect(() => {
    const endpoint =
      filter === 'S'
        ? 'feeds/stories'
        : filter === 'FB'
          ? 'feeds/favorite-books'
          : filter === 'M'
            ? 'feeds/magazines'
            : 'feeds';

    async function getFeedData() {
      if (!hasMore) return;
      try {
        const res = await instance.get(`/api/members/${endpoint}`, {
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
      }
    }
    if (hasMore && page >= 0) {
      getFeedData();
    }
  }, [page, filter, hasMore]);

  const handleCardClick = (id: number, type: 'S' | 'FB') => {
    setSelectedId(id);
    setSelectedType(type);
    setIsModalOpen(true);
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

  const filteredData = data.filter((item) => {
    if (filter === 'S') return item.type === 'S';
    if (filter === 'FB') return item.type === 'FB';
    if (filter === 'M') return item.type === 'M';
    return true;
  });

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
        <CommonGrid columns={4} gap={50} style={{ overflow: 'hidden ' }}>
          <AnimatePresence>
            {Array.isArray(filteredData) ? (
              filteredData.map((data, index) => (
                <motion.div
                  key={data.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ItemWrapper
                    key={data.id}
                    onClick={() => handleCardClick(data.id, data.type)}
                  >
                    <FeedCard
                      imageUrl={
                        data.type === 'S' || data.type === 'M'
                          ? data.presignedUrl
                          : data.book?.cover
                      }
                      content={data.content}
                    />
                  </ItemWrapper>
                </motion.div>
              ))
            ) : (
              <div>필터링된 데이터가 없습니다.</div> // 기본값 처리
            )}
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
        </>
      )}
    </Wrapper>
  );
};

export default UserPostedFeeds;

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
