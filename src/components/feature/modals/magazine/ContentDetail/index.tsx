import styled from '@emotion/styled';
import CommonModal from '@/components/common/Modal';
import CommonContainer from '@/components/common/layouts/Container';
import { Divider } from '@chakra-ui/react';
import CommonAvatar from '@/components/common/Avatar';
import StoryContentDetail from '@/components/feature/feed/section/contentDetail/StoryDetail';
import { IoIosHeartEmpty } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/common/Spinner';
import instance from '@/api/instance';
import { FeedData } from '@/types';

type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
  id: number;
};

const MagazineDetailModal = ({ isModalOpen, handleModalClose, id }: Props) => {
  const [data, setData] = useState<FeedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getContentDetails() {
      try {
        const res = await instance.get(`/api/feeds/magazines/${id}`);
        setData(res.data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    getContentDetails();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <CommonModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
      {data ? (
        <CommonContainer maxWidth="100%" flexDirection="row">
          <Left>
            <ImageContainer src={data.presignedUrl} />
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
                <StoryContentDetail content={data.content} />
              </ContentSection>
              <ReactSection>
                <IconLeft>
                  <IoIosHeartEmpty size="2rem" />
                </IconLeft>
                <Text>Likes</Text>
              </ReactSection>
            </CommonContainer>
          </Right>
        </CommonContainer>
      ) : (
        <Spinner />
      )}
    </CommonModal>
  );
};

export default MagazineDetailModal;

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
  position: absolute;
  bottom: 5%;
  left: 60%rem;
`;

const IconLeft = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
`;

const Text = styled.span`
  font-size: 1rem;
  margin-left: 0.5rem;
`;
