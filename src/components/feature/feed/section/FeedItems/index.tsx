import { useEffect, useState } from 'react';
import { Skeleton } from '@chakra-ui/react';
import CommonGrid from '@/components/common/Grid';
import FeedCard from '@/components/feature/feed/post/Card';
import StoryDetailModal from '@/components/feature/modals/stories/ContentDetail';
import FavBookDetailModal from '@/components/feature/modals/favbooks/ContentDetail';
import MagazineDetailModal from '@/components/feature/modals/magazine/ContentDetail';
import PostFeedsButton from '../WriteButton';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import instance from '@/api/instance';
import { useAuth } from '@/provider/Auth';

type selectedType = 'S' | 'FB' | 'M' | null;

const FeedItemSection = ({ filter }: { filter: string }) => {
  const { isLogin } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(
    // localStorage.getItem('isModalOpen') === 'true'
    false,
  );
  const [isPostModalOpen, setIsPostModalOpen] = useState(
    localStorage.getItem('isPostModalOpen') === 'true',
  );
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(
    localStorage.getItem('selectedId')
      ? Number(localStorage.getItem('selectedId'))
      : null,
  );
  const [selectedType, setSelectedType] = useState<selectedType>(
    localStorage.getItem('selectedType') as selectedType,
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

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
        const res = await instance.get(`/api/${endpoint}`, {
          params: { page: page, size: 8 },
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
  }, [page, filter, hasMore]);

  const handleCardClick = (id: number, type: 'S' | 'FB' | 'M') => {
    if (!isLogin) {
      window.location.href = '/login';
      return;
    }
    setSelectedId(id);
    setSelectedType(type);
    setIsModalOpen(true);
  };

  const handlePostModalClose = () => {
    setIsPostModalOpen(false);
    setSelectedType(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedId(null);
    setSelectedType(null);
  };

  useEffect(() => {
    localStorage.setItem('isPostModalOpen', JSON.stringify(isPostModalOpen));
    localStorage.setItem(
      'selectedId',
      selectedId !== null ? selectedId.toString() : '',
    );
    localStorage.setItem('selectedType', selectedType || '');
  }, [isPostModalOpen, selectedId, selectedType]);

  // 모달 열려있을 때, 스크롤 금지, 닫았을 때 다시 스크롤
  if (isModalOpen || isPostModalOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

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
        <CommonGrid columns={4} gap={50} style={{ overflow: 'hidden' }}>
          <AnimatePresence>
            {filteredData.map((data) => (
              <motion.div
                key={data.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
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
              setIsModalOpen={setIsModalOpen}
              handleModalClose={handleModalClose}
              id={selectedId}
            />
          )}
          {selectedType === 'FB' && (
            <FavBookDetailModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              handleModalClose={handleModalClose}
              id={selectedId}
            />
          )}
          {selectedType === 'M' && (
            <MagazineDetailModal
              isModalOpen={isModalOpen}
              handleModalClose={handleModalClose}
              id={selectedId}
            />
          )}
        </>
      )}
      <ButtonWrapper
        onMouseEnter={() => setIsDropdownVisible(true)}
        onMouseLeave={() => setIsDropdownVisible(false)}
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
