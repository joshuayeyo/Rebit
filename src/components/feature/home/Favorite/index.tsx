import styled from '@emotion/styled';

import Favorite from '@/assets/Main/Favorite.svg?react';
import LandingItems from '../Section/Landing-items';

const FavoriteIntro = () => {
  return (
    <Wrapper>
      <Left>
        <Favorite />
      </Left>
      <Right>
        <LandingItems />
      </Right>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 100vh;
  display: flex;
  scroll-snap-align: start;
`;
const Left = styled.div`
  width: 50vw;
`;
const Right = styled.div`
  background-color: #89ff56;
  width: 50vw;
  display: flex;
  padding: 50px;
  align-items: center;
  justify-contents: center;
`;

export default FavoriteIntro;
