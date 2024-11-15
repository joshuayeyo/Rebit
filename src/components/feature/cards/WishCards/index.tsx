import styled from '@emotion/styled';

type Props = {
  imageUrl: string;
  title: string;
  author: string;
};

const WishCard = ({ imageUrl, title, author }: Props) => {
  return (
    <Wrapper>
      <ImageContainer>
        <PostImage src={imageUrl} />
        <Title>{title}</Title>
      </ImageContainer>
      <PosterContiner>
        <Author>{author}</Author>
      </PosterContiner>
    </Wrapper>
  );
};
export default WishCard;

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
  justify-content: end;
  width: 100%;
`;

const Author = styled.div`
  font-size: 1rem;
  margin-right: 0.5rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
