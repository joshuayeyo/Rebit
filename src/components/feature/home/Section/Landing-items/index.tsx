import CommonContainer from '@/components/common/layouts/Container';
import CommonGrid from '@/components/common/Grid';
import CommonCard from '@/components/feature/home/Card';
import { ChallengeData, FeedData } from '@/types';
import { useNavigate } from 'react-router-dom';
import StoryDetailModal from '@/components/feature/modals/stories/ContentDetail';
import FavBookDetailModal from '@/components/feature/modals/favbooks/ContentDetail';
import { useState } from 'react';
import { useAuth } from '@/provider/Auth';

type Props = {
  data: (ChallengeData | FeedData)[];
};

const LandingItems = ({ data = [] }: Props) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'S' | 'FB' | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { isLogin } = useAuth();

  const handleCardClick = (data: ChallengeData | FeedData) => {
    if (!isLogin) {
      navigate('/login');
      return;
    }

    if (data.type === 'S') {
      setModalType('S');
      setSelectedId(data.id);
    } else if (data.type === 'FB') {
      setModalType('FB');
      setSelectedId(data.id);
    } else {
      navigate(`/challenge/detail?id=${data.id}`);
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalType(null);
  };
  return (
    <>
      <CommonContainer
        maxWidth={'90%'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <CommonGrid columns={2} gap={50}>
          {data.map((data, index: number) => (
            <CommonCard
              key={index}
              maxWidth={'lg'}
              imageURL={
                data.type === 'S'
                  ? data.presignedUrl
                  : data.type === 'FB' && 'book' in data && data.book.cover
                    ? data.book.cover
                    : data.presignedUrl
              }
              title={
                'type' in data && data.type === 'S'
                  ? ''
                  : 'type' in data && data.type === 'FB' && 'book' in data
                    ? data.book.title
                    : 'title' in data
                      ? data.title
                      : ''
              }
              profileImage={
                'creator' in data && data.creator.prsignedUrl
                  ? data.creator.prsignedUrl
                  : 'author' in data && data.author.presignedUrl
                    ? data.author.presignedUrl
                    : undefined
              }
              username={
                ('creator' in data && data.creator.nickname) ||
                ('author' in data && data.author.nickname) ||
                ''
              }
              onClick={() => handleCardClick(data)}
            />
          ))}
        </CommonGrid>
      </CommonContainer>
      {isModalOpen && modalType === 'S' && (
        <StoryDetailModal
          handleModalClose={handleModalClose}
          isModalOpen={isModalOpen}
          id={selectedId}
        />
      )}
      {isModalOpen && modalType === 'FB' && (
        <FavBookDetailModal
          handleModalClose={handleModalClose}
          isModalOpen={isModalOpen}
          id={selectedId}
        />
      )}
    </>
  );
};

export default LandingItems;
