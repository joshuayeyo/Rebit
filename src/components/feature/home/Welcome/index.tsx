import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import MainHeader from '@/components/feature/home/Header';

const Welcome = () => {
  return (
    <Wrapper>
      <MainHeader />
      <Box>
        <Tagline>#내일상 속 독서 습관</Tagline>
        <Mainlogo>
          {Array.from('Rebit').map((letter, index) => (
            <MotionLetter key={index} custom={index}>
              {letter}
            </MotionLetter>
          ))}
        </Mainlogo>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  scroll-snap-align: end;
  background-color: black;
  overflow: hidden;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 80%;
  transform: translateY(15vh);
`;

const Mainlogo = styled.div`
  font-size: 46vw; /* 반응형 폰트 크기 */
  font-weight: bold;
  color: white;
  white-space: nowrap;
  z-index: -1;
  pointer-events: none;
  user-select: none;
`;

const Tagline = styled.div`
  position: absolute;
  top: 6%;
  right: 0%;
  background-color: #ff0080;
  color: white;
  padding: 5px 10px;
  font-size: 1.4vw;
  border-radius: 5px;
  font-weight: bold;
  pointer-events: none;
  user-select: none;
`;

const Letter = styled(motion.div)<{ custom: number }>`
  display: inline-block;
`;

const letterVariants = {
  hidden: {
    opacity: 0,
    x: 10,
  },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: custom * 0.1, duration: 0.3 },
  }),
};

// MotionLetter 컴포넌트 정의
const MotionLetter = ({
  custom,
  children,
}: {
  custom: number;
  children: React.ReactNode;
}) => (
  <Letter
    variants={letterVariants}
    initial="hidden"
    animate="visible"
    custom={custom}
  >
    {children}
  </Letter>
);

export default Welcome;
