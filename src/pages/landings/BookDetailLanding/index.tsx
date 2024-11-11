import styled from '@emotion/styled';
import { BookData } from '@/types';

type BookProps = {
  book: BookData | null;
};

export const BookDetailLanding = ({ book }: BookProps) => {
  return (
    <Wrapper>
      <Left>
        <BookCover src={book?.cover} />
      </Left>
      <Right>
        <BookDescriptionWrapper>
          <BookTitle>
            <span
              style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold' }}
            >
              {book?.title}
            </span>
          </BookTitle>
          <BookDescription>
            <span
              style={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'lighter',
              }}
            >
              {book?.description}
            </span>
          </BookDescription>
          <BookAuthor>
            <span
              style={{
                color: 'white',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              {book?.author}
            </span>
          </BookAuthor>
          <PubInfo>
            <span
              style={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'lighter',
              }}
            >
              {book?.publisher} {book?.pubDate}
            </span>
          </PubInfo>
        </BookDescriptionWrapper>
      </Right>
      .
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Left = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    width: 50%;
    height: 100%;
  }
`;

const BookCover = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Right = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    width: 50%;
    height: 100%;
  }
`;

const BookDescriptionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
  background-color: black;
  padding: 3rem;
  overflow-y: auto;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 5rem;
  }
`;

const BookTitle = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: white;
`;

const BookDescription = styled.div`
  font-size: 1.5rem;
  font-weight: lighter;
  color: white;
`;

const BookAuthor = styled.div`
  position: absolute;
  bottom: 7%;
  font-size: 2rem;
  font-weight: bold;
  color: white;
`;

const PubInfo = styled.div`
  position: absolute;
  bottom: 5%;
  font-size: 1.5rem;
  font-weight: lighter;
  color: white;
`;
