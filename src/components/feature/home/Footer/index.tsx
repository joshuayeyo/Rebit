import { FiGithub } from 'react-icons/fi';
import { SiNotion } from 'react-icons/si';
import styled from '@emotion/styled';
import CommonContainer from '../../../common/layouts/Container';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <Heading>about us</Heading>
        <TextContainer>
          <Text>카카오테크 캠퍼스 2기 15조 CoolKids</Text>
          <CommonContainer flexDirection="row" alignItems="center">
            <FiGithub color="white" size="1.5rem" />
            <StyledLink to="https://github.com/kakao-tech-campus-2nd-step3/Team15_FE">
              https://github.com/kakao-tech-campus-2nd-step3/Team15_FE
            </StyledLink>
          </CommonContainer>
          <CommonContainer flexDirection="row" alignItems="center">
            <SiNotion color="white" size="1.5rem" />
            <StyledLink to="https://www.notion.so/c81e1a6e0847453296648a72419cd817?pvs=4">
              https://www.notion.so/c81e1a6e0847453296648a72419cd817?pvs=4
            </StyledLink>
          </CommonContainer>
        </TextContainer>
      </Container>
      <Hashtags>
        <Hashtag>#CoolKids_NeverDie</Hashtag>
        <Hashtag>#WE_R_CoolKids</Hashtag>
      </Hashtags>
      <Copyright>© 2024 kakaotechcampus</Copyright>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  scroll-snap-align: start;
  background-color: black;
  padding: 50px 5vw;
  overflow: hidden;
`;

const Container = styled.div`
  margin-top: 20px;
`;

const Heading = styled.h2`
  font-family: 'DungGeunMo', sans-serif;
  font-size: 5rem;
  color: white;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-family: 'DungGeunMo', sans-serif;
  font-weight: bold;
  font-size: 2rem;
  color: white;
  margin-bottom: 1rem;
`;

const TextContainer = styled.div`
  margin-left: 2rem;
`;

const StyledLink = styled(Link)`
  font-family: 'DungGeunMo', sans-serif;
  color: white;
  margin-left: 0.5rem;
  font-size: 1rem;
  text-decoration: none;
`;

const Hashtags = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 1;
`;

const Hashtag = styled.p`
  font-family: 'DungGeunMo', sans-serif;
  font-size: 10rem;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
  margin-bottom: 0.5rem;
`;

const Copyright = styled.p`
  font-family: 'DungGeunMo', sans-serif;
  font-size: 2em;
  color: white;
  text-align: center;
  margin-top: auto;
  margin-bottom: 1rem;
`;

export default Footer;