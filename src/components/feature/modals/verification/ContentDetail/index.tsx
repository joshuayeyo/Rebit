import styled from '@emotion/styled';
import CommonModal from '@/components/common/Modal';
import CommonContainer from '@/components/common/layouts/Container';
import { Divider } from '@chakra-ui/react';
import CommonAvatar from '@/components/common/Avatar';
import StoryContentDetail from '@/components/feature/feed/section/contentDetail/StoryDetail';
import { useEffect, useState } from 'react';
import instance from '@/api/instance';
import { Spinner } from '@/components/common/Spinner';
import { VerificationData } from '@/types';

type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
  setIsModalOpen: (visible: boolean) => void;
  challengeId: number | null;
  verificationId: number;
};
const VerificationDetailModal = ({
  isModalOpen,
  handleModalClose,
  challengeId,
  verificationId,
  setIsModalOpen
}: Props) => {
  const [data, setData] = useState<VerificationData | null>(null);
  const [isdelete, setisDelete] = useState(false);
  const [posterId, setIsposterId] = useState(Number);

  useEffect(() => {
    async function getContentDetails() {
      try {
        const res = await instance.get(
          `/api/challenges/${challengeId}/verifications/${verificationId}`,
        );
        const result = await res;
        setData(result.data);
        setIsposterId(result.data.author.id);
      } catch (e) {
        console.log(e);
        alert('Error: 데이터를 불러올 수 없습니다.');
      }
    }
    getContentDetails();
  }, [challengeId, setData,isdelete]);

  const handleDeleteClick = async () => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
  
    if (!isConfirmed) {
      return;
    }
    try {
      const res = await instance.delete(`/api/challenges/${challengeId}/verifications/${verificationId}`);
      console.log('삭제 성공:', res.data);
      setIsModalOpen(false);
      setisDelete(true);
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
    <CommonModal posterId={posterId} isModalOpen={isModalOpen} handleModalClose={handleModalClose} handleDeletClick={handleDeleteClick}>
      {data ? (
        <>
          <Left>
            <ImageContainer src={data?.presignedUrl}></ImageContainer>
          </Left>
          <Right>
            <CommonContainer flexDirection="column">
              <ProfileSection>
                <CommonAvatar
                  username={data?.author.nickname}
                  imageURL={data.author.nickname}
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
                <StoryContentDetail content={data.content} />
              </ContentSection>
            </CommonContainer>
          </Right>
        </>
      ) : (
        <Spinner />
      )}
    </CommonModal>
    
  );
};

const Left = styled.section`
  width: 50%;
  height: 60vh;
`;
const Right = styled.section`
  width: 50%;
  height: 100%;
  padding-right: 2rem;
  padding-left: 2rem;
`;

const ImageContainer = styled.img`
  width: 100%;
  object-fit: cover;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-top: -5rem;
`;

const ProfileSection = styled.section`
  width: 100%;
  height: auto;
`;

const ContentSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export default VerificationDetailModal;
