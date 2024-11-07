import styled from '@emotion/styled';
import { Skeleton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChallengeData } from '@/types';
import Contents from '../Contents';

type ChallengeIntroProps = {
  data: ChallengeData | null;
  filter: string | null;
};

const Intro = ({ data, filter }: ChallengeIntroProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Wrapper>
      <Skeleton isLoaded={!isLoading}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <Left
            src={data?.presignedUrl}
            onLoad={handleImageLoad}
            alt={data?.title}
          />
        </motion.div>
      </Skeleton>
      <Right>
        <Contents data={data} filter={filter} />
      </Right>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 100dvh;
  overflow: hidden;
  display: flex;
  background-color: black;
  scroll-snap-align: start;
`;

const Left = styled.img`
  width: 50vw;
  background-color: #ffffff;
`;

const Right = styled.div`
  background-color: black;
  width: 50vw;
  display: flex;
  padding: 50px;
  align-items: center;
  justify-content: center;
`;

export default Intro;
