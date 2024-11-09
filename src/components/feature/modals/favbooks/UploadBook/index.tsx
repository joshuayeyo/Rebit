import { useState, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import styled from '@emotion/styled';

const UploadBook = () => {
  const [selectedBook, setSelectedBook] = useState(() => {
    const savedBook = localStorage.getItem('selectedBook');
    return savedBook ? JSON.parse(savedBook) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedBook = localStorage.getItem('selectedBook');
      setSelectedBook(updatedBook ? JSON.parse(updatedBook) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleNavigate = () => {
    window.open('/book/search', '_blank');
  };

  return (
    <Wrapper>
      <ImageContainer>
        {selectedBook ? (
          <BookCover src={selectedBook.cover} alt="Selected Book" />
        ) : (
          <NoBookSelected>책을 선택하세요</NoBookSelected>
        )}
      </ImageContainer>
      <Button
        type="button"
        size="medium"
        theme="lightgray"
        onClick={handleNavigate}
      >
        책 검색
      </Button>
    </Wrapper>
  );
};

export default UploadBook;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
`;

const ImageContainer = styled.div`
  width: 80%;
  max-width: 200px;
  max-height: 300px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookCover = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const NoBookSelected = styled.div`
  font-size: 16px;
  color: gray;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed gray;
`;
