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
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Left = styled.div`
  width: 50%;
  height: 100%;
  align-item: center;
  justify-contents: center;
`;

const BookCover = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Right = styled.div`
  width: 50%;
  height: 100%;
  align-item: center;
  justify-contents: center;
`;

const BookDescriptionWrapper = styled.section`
  width: 100%;
  height: 100%;
  background-color: black;
  padding: 3rem;
`;

const BookTitle = styled.div`
  margin-top: 5%;
`;

const BookDescription = styled.div`
  margin-top: 3%;
`;

const BookAuthor = styled.div`
  margin-top: 70%;
`;

const PubInfo = styled.div`
  margin-top: 1%;
`;
