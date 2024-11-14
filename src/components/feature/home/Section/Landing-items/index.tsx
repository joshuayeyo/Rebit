import CommonContainer from '@/components/common/layouts/Container';
import CommonGrid from '@/components/common/Grid';
import CommonCard from '@/components/feature/home/Card';
import { ChallengeData, FeedData } from '@/types';
import { useNavigate } from 'react-router-dom';

type Props = {
  data: (ChallengeData | FeedData)[];
};

const LandingItems = ({ data = [] }: Props) => {
  const navigate = useNavigate();

  const handleCardClick = (data: ChallengeData | FeedData) => {
    if ('challengeStartDate' in data) {
      navigate(`/challenge`);
    } else {
      navigate(`/feed`);
    }
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
    </>
  );
};

export default LandingItems;
