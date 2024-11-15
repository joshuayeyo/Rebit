import instance from '@/api/instance';
import CommonAvatar from '@/components/common/Avatar';
import CommonContainer from '@/components/common/layouts/Container';
import CommonModal from '@/components/common/Modal';
import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi';
import { FeedData } from '@/types';
import { IoIosHeartEmpty } from 'react-icons/io';
import useLiked from '@/util/hooks/useLiked';
import EditFavbookModal from '../EditFavBook';
type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
  setIsModalOpen: (visible: boolean) => void;
  id: number;
};

const FavBookDetailModal = ({ isModalOpen, handleModalClose, id, setIsModalOpen }: Props) => {
  const [data, setData] = useState<FeedData | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [posterId, setIsposterId] = useState(Number);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { isLiked, likes, setLikes, toggleLiked } = useLiked({
    feedId: id,
    initialLiked: data?.isLiked ?? false,
    initialLikes: data ? data.likes : 0,
  });

  useEffect(() => {
    async function getContentDetails() {
      try {
        const res = await instance.get(`api/feeds/${id}`);
        setIsposterId(res.data.author.id);
        setData(res.data);
        setLikes(res.data.likes);
      } catch (e) {
        console.log(e);
      }
    }
    getContentDetails();
  }, [id, setLikes,isEditModalOpen, isDelete]);

  const handleNavigate = () => {
    const isbn = data?.book.isbn;
    if (isbn) {
      window.location.href = `/book/details?isbn=${isbn}`;
    } else {
      alert('책 정보를 찾을 수 없습니다.');
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = async () => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirmed) {
      return;
    }
    try {
      const res = await instance.delete(`/api/feeds/${id}`);
      console.log('삭제 성공:', res.data);
      handleModalClose();
      window.location.reload();
      setTimeout(() => {
        window.history.go(-1);
      }, 100);
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제하는 중 오류가 발생했습니다.');
    }
  };
    
  return (
    <>
      <CommonModal
        posterId={posterId}
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        handleEditClick={handleEditClick}
        handleDeletClick={handleDeleteClick}
      >
        {data ? (
          <CommonContainer maxWidth="100%" flexDirection="row">
            <Left
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <ImageContainer src={data.book.cover} />
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
                  <Divider mt="0.8rem" mb="0.8rem" borderColor="gray.800" width="60%" />
                </ProfileSection>
                <ContentSection>
                  <ContentWrapper>
                    <BiSolidQuoteLeft />
                    <BriefReviewWrapper>{data.briefReview}</BriefReviewWrapper>
                    <BiSolidQuoteRight style={{ marginLeft: 'auto' }} />
                  </ContentWrapper>
                  <FullReviewWrapper>{data.fullReview}</FullReviewWrapper>
                </ContentSection>
                <ReactSection>
                  <IconLeft onClick={toggleLiked}>
                    {isLiked ? (
                      <IoIosHeartEmpty size="2rem" color="red" />
                    ) : (
                      <IoIosHeartEmpty size="2rem" />
                    )}
                  </IconLeft>
                  <Text>{likes} Likes</Text>
                </ReactSection>
              </CommonContainer>
            </Right>
          </CommonContainer>
        ) : null}
      </CommonModal>
      {isEditModalOpen &&(
        <EditFavbookModal
          data={data!!}
          isModalOpen={isEditModalOpen}
          handleModalClose={handleEditModalClose}
        />
      )}
    </>)
  };
  

export default FavBookDetailModal;

const Left = styled.section`
  width: 50%;
  height: 60vh;
`;

const Right = styled.section`
  width: 50%;
  height: 60vh;
  padding-right: 2rem;
  padding-left: 2rem;
  position: relative;
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
  bottom: 50%;
  left: 25%;
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
  white-space: pre-wrap;
  font-size: 1rem;
`;

const FullReviewWrapper = styled.div`
  width: 100%;
  height: 60%;
  overflow-y: scroll;
  text-align: left;
  padding: 1rem;
  white-space: pre-wrap;
  font-size: 1rem;
`;

const ReactSection = styled.div`
  width: 100%;
  margin-top: 2rem;
  flex-direction: row;
  align-items: center;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 6rem;
  left: 1rem;
`;

const IconLeft = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
`;

const Text = styled.span`
  font-size: 1rem;
  margin-left: 0.5rem;
`;
