import styled from '@emotion/styled';
import CommonModal from '@/components/common/Modal';
import CommonContainer from '@/components/common/layouts/Container';
import StoryContentDetail from '@/components/feature/feed/section/contentDetail/StoryDetail';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/common/Spinner';
import instance from '@/api/instance';
import { DiaryData } from '@/types';
import EditBookDiaryModal from '../EditBookDiary';
type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
  setIsModalOpen: (visible: boolean) => void;
  selectedDate: string | null;
  id: number;
};

const DiaryDetailModal = ({ isModalOpen, handleModalClose, id, setIsModalOpen, selectedDate}: Props) => {
  const [data, setData] = useState<DiaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posterId, setIsposterId] = useState(Number);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    async function getContentDetails() {
      try {
        const res = await instance.get(`/api/diaries/${id}`);
        setData(res.data);
        setIsposterId(res.data.memberId);

      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    getContentDetails();
  }, [id,isEditModalOpen, isDelete]);

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
      const res = await instance.delete(`/api/diaries/${id}`);
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
    <CommonModal posterId={posterId} isModalOpen={isModalOpen} handleModalClose={handleModalClose} handleEditClick={handleEditClick} handleDeletClick={handleDeleteClick}>
      {isLoading ? (
        <Spinner />
      ) : data ? (
        <CommonContainer maxWidth="100%" flexDirection="row">
          <Left>
            <ImageContainer src={data.book.cover} alt="책 커버 이미지" />
          </Left>
          <Right>
            <CommonContainer flexDirection="column">
              <Date>{data.date}</Date>
              <Line />
              <ContentSection>
                <StoryContentDetail content={data.content} />
              </ContentSection>
            </CommonContainer>
          </Right>
        </CommonContainer>
      ) : (
        <p>데이터를 불러오지 못했습니다.</p>
      )}
    </CommonModal>
      {isEditModalOpen &&(
        <EditBookDiaryModal
          id={id}
          data={data!!}
          isModalOpen={isEditModalOpen}
          handleModalClose={handleEditModalClose}
          selectedDate={selectedDate}
        />
      )}
      </>
  )
};

export default DiaryDetailModal;

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

const Date = styled.div`
  color: black;
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 0.5rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  margin: 1rem 0; /* 구분선 위아래 여백 */
`;

const ContentSection = styled.div`
  width: 100%;
  height: calc(100% - 2rem);
  display: flex;
  color: black;
  flex-direction: column;
`;
