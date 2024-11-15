import styled from '@emotion/styled';
import instance from '@/api/instance';
import { useEffect, useState } from 'react';
import WishCard from '@/components/feature/cards/WishCards';
import CommonGrid from '@/components/common/Grid';
import { BookData, ChallengeData } from '@/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion'

const UserWishes = ({ filter }: { filter: string }) => {
  const [challengeId, setChallengeId] = useState<number[]>([]);
  const [challengeData, setChallengeData] = useState<ChallengeData[]>([]);
  const [bookIsbn, setBookIsbn] = useState<string[]>([]);
  const [bookData, setBookData] = useState<BookData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  

  useEffect(() => {
    async function getChallengeWishes() {
      try {
        const res = await instance.get(`api/wishes/challenges`, {
          params: {page: page},
        });
        const idList = res.data.content.map(
          (challenge: { challengeId: number }) => challenge.challengeId,
        );
        setChallengeId(idList);
        setHasMore(res.data.content.length >0);
      } catch (e) {
        console.log(e);
      }
    }
    if (hasMore) {
      getChallengeWishes();
    }
  }, [page, hasMore]);

  useEffect(() => {
    async function getBookWishes() {
      try {
        const res = await instance.get(`api/wishes/books`, {
          params: {page: page},
        });
        const isbnList = res.data.content.map(
          (book: { isbn: string }) => book.isbn,
        );
        setBookIsbn(isbnList);
        setHasMore(res.data.content.length >0);
      } catch (e) {
        console.log(e);
      }
    }
    if (hasMore) {
      getBookWishes();
    }
  }, [page, hasMore]);

  useEffect(() => {
    if (bookIsbn.length > 0) {
      bookIsbn.forEach((isbn) => {
        instance.get(`api/books/${isbn}`).then((res) => {
          setBookData((prevData) => {
            if (!prevData.some((book) => book.isbn === res.data.isbn)) {
              return [...prevData, res.data];
            }
            return prevData;
          });
        }).catch((e) => console.log(e));
      });
    }
  }, [bookIsbn]);

  useEffect(() => {
    if (challengeId.length > 0) {
      challengeId.forEach((id) => {
        instance.get(`api/challenges/${id}`).then((res) => {
          setChallengeData((prevData) => {
            if (!prevData.some((challenge) => challenge.id === res.data.challengeId)) {
              return [...prevData, res.data]; 
            }
            return prevData;
          });
        }).catch((e) => console.log(e));
      });
    }
  }, [challengeId]);

  const fetchData = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleBookCardClick = (isbn: string) => {
    if (isbn) {
      window.location.href = `/book/details?isbn=${isbn}`;
    } else {
      alert('책 정보를 찾을 수 없습니다.');
    }
  };

  const handleChallengeCardClick = (id: number) => {
    window.location.href = `/challenge/detail?id=${id}`;
  };


  const renderContent = () => {
    if (filter === 'Book') {
      return bookData?.map((book: BookData, index) => (
        <motion.div
        key={index}  
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.4 }}
        >
          <ItemWrapper onClick={() => handleBookCardClick(book.isbn)}>
            <WishCard
              imageUrl={book.cover || ''}
              title={book.title || ''}
              author={book.author || ''}
            />
          </ItemWrapper>
        </motion.div>

      ));
    }

    if (filter === 'Challenge') {
      return challengeData?.map((challenge: ChallengeData, index) => (
        <motion.div
        key={index}  
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.4 }}
        >
          <ItemWrapper key={index} onClick={() => handleChallengeCardClick(challenge.id)}>
            <WishCard
              imageUrl={challenge.presignedUrl || ''}
              title={challenge.title || ''}
              author={challenge.creator.nickname || ''}
            />
          </ItemWrapper>
        </motion.div>
      ));
    }

    return null;
  };

  return (
    <Wrapper>
      <InfiniteScroll
        dataLength={filter === 'Book' ? bookData.length : challengeData.length} 
        next={fetchData}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
        endMessage={<div>No more data</div>}
      >
        <CommonGrid columns={4} gap={50}>
          {renderContent()}
        </CommonGrid>
      </InfiniteScroll>

    </Wrapper>
  );
};

export default UserWishes;

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
