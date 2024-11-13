import styled from '@emotion/styled';
import CommonModal from '@/components/common/Modal';
import CommonContainer from '@/components/common/layouts/Container';
import { Divider } from '@chakra-ui/react';
import CommonAvatar from '@/components/common/Avatar';
import StoryContentDetail from '@/components/feature/feed/section/contentDetail/StoryDetail';
import { IoIosHeartEmpty } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/common/Spinner';
import useLiked from '@/util/hooks/useLiked';
import instance from '@/api/instance';
import { FeedData } from '@/types';

type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
  id: number;
};

const StoryDetailModal = ({ isModalOpen, handleModalClose, id }: Props) => {
  const [data, setData] = useState<FeedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isLiked, likes, setLikes, toggleLiked } = useLiked({
    feedId: id,
    initialLiked: data?.isLiked ?? false, // 초기 liked 상태(아직 백에서 구현 안된 상태임)
    initialLikes: data ? data.likes : 0,
  });

  useEffect(() => {
    async function getContentDetails() {
      try {
        const res = await instance.get(`/api/feeds/${id}`);
        const result = await res;
        setData(result.data);
        setLikes(res.data.likes);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    getContentDetails();
  }, [id, setLikes]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <CommonModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
      {data ? (
        <CommonContainer maxWidth="100%" flexDirection="row">
          <Left>
            <ImageContainer src={data?.presignedUrl}></ImageContainer>
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

const Text = styled.text`
  font-size: 1rem;
  margin-left: 0.5rem;
`;
export default StoryDetailModal;
