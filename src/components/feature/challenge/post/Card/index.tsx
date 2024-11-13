import styled from '@emotion/styled';
import { IoIosHeartEmpty } from 'react-icons/io';

type Props = {
  imageUrl: string;
  title: string;
  author: string;
  profilePics: string;
};

const ChallengeCard = ({ imageUrl, title, author, profilePics }: Props) => {
  return (
    <Wrapper>
      <ImageContainer>
        <PostImage src={imageUrl} />
        <Title>{title}</Title>
      </ImageContainer>
      <PosterContiner>
        <IoIosHeartEmpty size="2rem" />
        <AuthorProfileWrapper>
          <Author>{author}</Author>
          <Profile src={profilePics} />
        </AuthorProfileWrapper>
      </PosterContiner>
    </Wrapper>
  );
};
export default ChallengeCard;

const Wrapper = styled.div``;

const ImageContainer = styled.div`
  position: relative;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PostImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1.2;
  object-fit: fill;
  &:hover {
    filter: brightness(0.5);
    transition: 0.5s ease-in-out;
  }
`;

const PosterContiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const AuthorProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Author = styled.div`
  font-size: 1rem;
  margin-right: 0.5rem;
`;

const Profile = styled.img`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  object-fit: cover;
`;
