import styled from '@emotion/styled';

type Props = {
  imageUrl: string;
  title: string;
  author: string;
  profilePics: string;
};

const ChallengeCard = ({ imageUrl, title, author, profilePics}: Props) => {
  return (
    <Wrapper>
      <ImageContainer>
        <PostImage src={imageUrl} />
        <Title>{title}</Title>
      </ImageContainer>
      <PosterContiner>
        <Author>{author}</Author>
        <Profile src={profilePics}/>
      </PosterContiner>
    </Wrapper>
  );
};
export default ChallengeCard;

const Wrapper = styled.div``;

const ImageContainer = styled.div`
  position: relative;
`;

const Title = styled.text`
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
  flex-direction: row;
`;
  
const Author = styled.text`
  font-size: 1rem;
  margin-right: 1rem; 
`;
const Profile = styled.img`
  border-radius: 50%; 
  width: 10%;
  aspect-ratio: 1/1.2;
  object-fit: cover;
`;

