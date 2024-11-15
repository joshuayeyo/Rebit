import CommonModal from '@/components/common/Modal';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import UploadBook from '../UploadBook';
import { Button } from '@/components/common/Button';
import instance from '@/api/instance';
import { FeedData } from '@/types';

type Props = {
  data: FeedData;
  isModalOpen: boolean;
  handleModalClose: () => void;
};

const EditFavbookModal = ({ data, isModalOpen, handleModalClose }: Props) => {
  const [briefReview, setBriefReview] = useState(data?.briefReview);
  const [fullReview, setFullReview] = useState(data?.fullReview);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    async function postFbData() {
      try {
        await instance
          .put(`api/feeds/favorite-books/${data.id}`, {
            bookId: selectedBook.id,
            briefReview: briefReview,
            fullReview: fullReview,
          })
          .then((response) => {
            console.log(response);
            handleModalClose();
          });
      } catch (e) {
        console.log(e);
      }
    }
    postFbData();
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    type: 'brief' | 'full',
  ) => {
    if (type === 'brief') {
      setBriefReview(e.target.value);
    } else if (type === 'full') {
      setFullReview(e.target.value);
    }
  };

  return (
    <>
      <CommonModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%', height: '100%' }}>
          <HeaderBox></HeaderBox>
          <FlexBox>
            <Left>
              <UploadBook />
            </Left>
            <Right>
              <FormContainer>
                <TextForm
                  value={briefReview}
                  onChange={(e) => handleContentChange(e, 'brief')}
                />
                <TextForm
                  value={fullReview}
                  onChange={(e) => handleContentChange(e, 'full')}
                />
              </FormContainer>
              <SubmitButton>
                <Button
                  size="medium"
                  theme="lightgray"
                  style={{ justifyContent: 'flex-end' }}
                  type="submit"
                >
                  Edit!
                </Button>
              </SubmitButton>
            </Right>
          </FlexBox>
        </form>
      </CommonModal>
    </>
  );
};

export default EditFavbookModal;

const HeaderBox = styled.section`
  height: auto;
  width: auto;
  position: absolute;
  top: 1.5rem;
  left: 1rem;
`;

const FlexBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: stretch;
`;

const Left = styled.div`
  width: 50%;
  height: 100%;
  overflow: auto; // 내용이 넘칠 때 스크롤 추가
  box-sizing: border-box;
`;

const Right = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto; // 스크롤을 입력 필드에만 적용
  padding: 1rem;
  box-sizing: border-box;
`;

const TextForm = styled.textarea`
  width: 90%;
  height: 70%; // 텍스트 영역이 전체 높이를 차지하지 않도록 조정
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  resize: none;
  color: inherit;
  &:focus {
    outline: none;
    border-color: #a451f7;
  }
`;

const SubmitButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: 1rem;
  box-sizing: border-box;
`;
