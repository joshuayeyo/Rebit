import instance from '@/api/instance';
import CommonAvatar from '@/components/common/Avatar';
import CommonContainer from '@/components/common/layouts/Container';
import CommonModal from '@/components/common/Modal';
import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi';
import { BookData } from '@/types';

type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
  id: number;
  type: string;
};

type Author = {
  nickname: string;
  imageUrl?: string;
  presignedUrl: string;
};

type FeedData = {
  presignedUrl: string;
  author: Author;
  book: BookData;
  briefReview: string;
  fullReview: string;
  likes: number;
  liked: boolean;
};

const FavBookDetailModal = ({ isModalOpen, handleModalClose, id }: Props) => {
  const [data, setData] = useState<FeedData | null>(null);
  const [isHovered, setIsHovered] = useState(false); // Hover 상태 관리

  useEffect(() => {
    async function getContentDetails() {
      try {
        const res = await instance.get(`api/feeds/${id}`);
        setData(res.data);
      } catch (e) {
        console.log(e);
        alert('Error: 데이터를 불러올 수 없습니다.');
      } 
    }
    getContentDetails();
  }, [id]);

  const handleNavigate = () => {
    const isbn = data?.book.isbn;

    if (isbn) {
      window.open(`/book/details?isbn=${isbn}`, '_blank');
    } else {
      alert('책 정보를 찾을 수 없습니다.');
    }
  };
  return (
    <CommonModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
      {data ? (
        <CommonContainer maxWidth="100%" flexDirection="row">
          <Left
            onMouseEnter={() => setIsHovered(true)} // Hover 시작
            onMouseLeave={() => setIsHovered(false)} // Hover 종료
          >
            <ImageContainer src={data?.book.cover} />
            {isHovered && (
              <HoverButton onClick={handleNavigate}>책 상세 페이지</HoverButton>
            )}
          </Left>
          <Right>
            <CommonContainer flexDirection="column">
              <ProfileSection>
                <CommonAvatar
                  username={data.author.nickname}
                  imageURL={data.author.presignedUrl}
                  size="md"
                />
                <Divider
                  mt="0.8rem"
                  mb="0.8rem"
                  borderColor="gray.800"
                  width="60%"
                />
              </ProfileSection>
              <ContentSection>
                <ContentWrapper>
                  <BiSolidQuoteLeft />
                  <BriefReviewWrapper>{data?.briefReview}</BriefReviewWrapper>
                  <BiSolidQuoteRight style={{ marginLeft: 'auto' }} />
                </ContentWrapper>
                <FullReviewWrapper>{data?.fullReview}</FullReviewWrapper>
              </ContentSection>
            </CommonContainer>
          </Right>
        </CommonContainer>
      ) : (
        <></>
      )}
    </CommonModal>
  );
};

export default FavBookDetailModal;

const Left = styled.section`
  width: 50%;
  height: 60vh;
  position: relative;
`;
const Right = styled.section`
  width: 50%;
  height: 100%;
  padding-right: 2rem;
  padding-left: 2rem;
`;

const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
  background-size: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-top: -5rem;
  position: relative;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.7;
  }

  &:hover::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
  }
`;

const HoverButton = styled.button`
  position: absolute;
  bottom: 60%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f5f5f5;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 999;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
const ProfileSection = styled.section`
  width: 100%;
  height: auto;
`;

const ContentSection = styled.div`
  width: 100%;
  height: calc(100% - 2rem);
  display: flex;
  color: black;
  flex-direction: column;
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: 40%;
  overflow-y: scroll;
  text-align: center;
  padding: 1rem;
`;

const BriefReviewWrapper = styled.span`
  font-weight: bold;
`;

const FullReviewWrapper = styled.div`
  width: 100%;
  height: 60%;
  overflow-y: scroll;
  text-align: left;
  padding: 1rem;
`;
