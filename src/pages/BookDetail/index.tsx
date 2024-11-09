import instance from '@/api/instance';
import { motion } from 'framer-motion';
import useLandingPage from '@/util/hooks/uesLandingPage';
import CommonAvatar from '@/components/common/Avatar';
import { Button } from '@/components/common/Button';
import CommonHeader from '@/components/common/Header';
import CommonContainer from '@/components/common/layouts/Container';
import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { BookDetailLanding } from '../landings/BookDetailLanding';
import { useLocation } from 'react-router-dom';
import { BookData } from '@/types';
import { ReviewData } from '@/types';
import axios from 'axios';

const BookDetailPage = () => {
  const [data, setData] = useState<BookData | null>(null);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const isLandingVisible = useLandingPage(4000);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isbn = queryParams.get('isbn'); // 쿼리에서 isbn 값 추출

  useEffect(() => {
    async function getBookData() {
      try {
        const res = await instance.get(`api/books/detail/${isbn}`);
        setData(res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
          console.error('Error message:', errorMessage);
          alert(errorMessage);
        }
      }
    }
    getBookData();
  }, [setData]);

  useEffect(() => {
    async function getBriefReviews() {
      try {
        const res = await instance.get(`api/books/${isbn}/brief-reviews`);
        console.log(res.data);
        if (res.data?.content && res.data.content.length > 0) {
          setReviews(res.data.content);
        } else {
          return;
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
    getBriefReviews();
  }, [setReviews]);

  const NavigateToBookStore = () => {
    if (data?.link) {
      window.location.href = data.link;
    } else {
      console.log('서점 링크가 없습니다.');
    }
  };

  return (
    <>
      {isLandingVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <BookDetailLanding book={data} />
        </motion.div>
      )}
      {!isLandingVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Wrapper>
            <CommonHeader />
            <DetailsWrapper>
              <CommonContainer flexDirection="row">
                <BookCoverWrapper>
                  <BookCoverContainer>
                    <BookCover src={data?.cover} alt="bookCover" />
                  </BookCoverContainer>
                  <ButtonWrapper>
                    <Button onClick={NavigateToBookStore}>서점으로 이동</Button>
                  </ButtonWrapper>
                </BookCoverWrapper>
                <BookDescriptionWrapper>
                  <UnderlinedHeading1>책 정보</UnderlinedHeading1>
                  <BookDescriptionContainer>
                    <BookTitle>{data?.title}</BookTitle>
                    <BookDescription>{data?.description}</BookDescription>
                    <BookAuthor>{data?.author}</BookAuthor>
                    <PublishInfo>
                      {data?.publisher}
                      {data?.pubDate}
                    </PublishInfo>
                  </BookDescriptionContainer>
                  <TopFullReview>
                    <UnderlinedHeading2>Best 서평</UnderlinedHeading2>
                    <FullReviewContainer>
                      <CommonAvatar size="sm" username="abc" imageURL="" />
                      <span>{data?.topFullReview} </span>
                    </FullReviewContainer>
                  </TopFullReview>
                </BookDescriptionWrapper>
              </CommonContainer>
            </DetailsWrapper>
            <BriefBookReviewsWrapper>
              <span>한줄평</span>
              <Divider />
              <BriefBookReviewContainer>
                {reviews?.length > 0 ? (
                  reviews?.map((review, index) => (
                    <div key={index}>
                      <CommonAvatar
                        size="sm"
                        imageURL={review.briefReviewAuthorImage}
                        username={review.briefReviewAuthor}
                      />
                      <span>{review.briefReview}</span>
                    </div>
                  ))
                ) : (
                  <span>한줄평이 없습니다.</span>
                )}
              </BriefBookReviewContainer>
            </BriefBookReviewsWrapper>
          </Wrapper>
        </motion.div>
      )}
    </>
  );
};

export default BookDetailPage;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const DetailsWrapper = styled.section`
  max-height: 60%;
  margin-top: 3vh;
  flex-direction: row;
`;

const BookCoverWrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BookCoverContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const BookCover = styled.img`
  object-fit: cover;
  max-width: 80%;
  box-shadow: 3px 4px 20px rgba(0, 0, 0, 0.8);
`;

const ButtonWrapper = styled.div`
  border: 1px solid;
`;

const BookDescriptionWrapper = styled.section`
  width: 60%;
  display: flex;
  flex-direction: column;
  padding: 3rem;
`;

const BookDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const BookTitle = styled.span`
  font-size: 2rem;
`;

const BookDescription = styled.span`
  font-size: 0.8rem;
  font-weight: lighter;
`;

const BookAuthor = styled.span`
  font-size: 1rem;
`;

const PublishInfo = styled.span`
  font-size: 1rem;
`;

const TopFullReview = styled.div`
  height: 100%;
  margin-top: 10%;
  height: 50%;
`;

const FullReviewContainer = styled.div`
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const BriefBookReviewsWrapper = styled.section`
  width: 100%;
  padding: 1rem;
`;

const BriefBookReviewContainer = styled.div`
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const UnderlinedHeading1 = styled.span`
  font-size: 2rem;
  font-weight: bolder;
  position: relative;
  margin-bottom: 0.5rem;
  display: inline-block;
  &:after {
    content: '';
    display: block;
    width: 5.5rem;
    height: 10px;
    background-color: #e2bdff;
    z-index: -1;
    position: absolute;
    bottom: 0.5rem; /* Adjust position closer to the text */
    left: 0;
  }
`;

const UnderlinedHeading2 = styled.span`
  font-size: 2rem;
  font-weight: bolder;
  position: relative;
  margin-bottom: 0.5rem;
  display: inline-block;
  &:after {
    content: '';
    display: block;
    width: 8rem;
    height: 10px;
    background-color: #e2bdff;
    z-index: -1;
    position: absolute;
    bottom: 0.5rem; /* Adjust position closer to the text */
    left: 0;
  }
`;
