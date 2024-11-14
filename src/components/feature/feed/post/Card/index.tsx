import styled from '@emotion/styled';

type Props = {
  imageUrl: string;
  content?: string;
  onLoad?: () => void;
};

const FeedCard = ({ imageUrl, content = '', onLoad }: Props) => {
  const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(content);
  const trimmedContent = isKorean
    ? content.substring(0, 55) + (content.length > 55 ? '...' : '')
    : content.substring(0, 100) + (content.length > 100 ? '...' : '');

  return (
    <Wrapper>
      <ImageContainer>
        <PostImage src={imageUrl} onLoad={onLoad} />
        <div className="summary">
          <Title>{trimmedContent}</Title>
        </div>
      </ImageContainer>
    </Wrapper>
  );
};

export default FeedCard;

const Wrapper = styled.div`
  border-radius: 10px;
`;

const ImageContainer = styled.div`
  border-radius: 10%;
  position: relative;

  .summary {
    position: absolute;
    top: 50%;
    left: 35%;
    z-index: 1;
    color: white;
    opacity: 0;
    display: flex;
    flex-direction: column;
    pointer-events: none;
    align-items: flex-end;
    text-align: right;
    margin-right: 1rem;
  }

  &:hover .summary {
    transition: 1s ease 0.3s;
    opacity: 1;
  }
`;

const Title = styled.span`
  font-size: 1.5rem;
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: 10%;
  aspect-ratio: 1/1.2;
  object-fit: fill;
  &:hover {
    filter: brightness(0.5);
    transition: 0.5s ease-in-out;
  }
`;
