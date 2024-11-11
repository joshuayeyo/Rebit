import styled from '@emotion/styled';
import CommonModal from '@/components/common/Modal';
import CommonContainer from '@/components/common/layouts/Container';
import { Divider } from '@chakra-ui/react';
import CommonAvatar from '@/components/common/Avatar';
import StoryContentDetail from '@/components/feature/feed/section/contentDetail/StoryDetail';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoBookmarkOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import instance from '@/api/instance';
import { Spinner } from '@/components/common/Spinner';
import { VerificationData } from '@/types';

type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
  challengeId: number |null;
  verificationId: number;
}
const VerificationDetailModal = ({isModalOpen,handleModalClose,challengeId, verificationId}: Props) =>{
  const [data, setData] = useState<VerificationData | null>(null);

  useEffect(() => {
    async function getContentDetails() {
      try {
        const res = await instance.get(`/api/challenges/${challengeId}/verifications/${verificationId}`);
        console.log("데이터 가져왔어",res.data);
        const result = await res;
        setData(result.data);
      } catch (e) {
        console.log(e);
        alert('Error: 데이터를 불러올 수 없습니다.');
      } finally {
        // setIsLoading(false);
      }
    }
    getContentDetails();
  }, [challengeId, setData]);

  return (
    <CommonModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
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
              <ReactSection>
                <IconLeft>
                  <IoIosHeartEmpty size="2rem" />
                </IconLeft>
                {/* <Text>{data?.likes} Likes</Text> */}
                <IconRight>
                  <IoBookmarkOutline size="2rem" />
                </IconRight>
              </ReactSection>
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

const ReactSection = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const IconLeft = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const IconRight = styled.button`
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
`;

const Text = styled.text`
  font-size: 1rem;
  margin-left: 0.5rem;
`;
export default VerificationDetailModal;