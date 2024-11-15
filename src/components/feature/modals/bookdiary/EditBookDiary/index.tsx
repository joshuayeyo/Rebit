import CommonModal from '@/components/common/Modal';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import UploadBook from '../../favbooks/UploadBook';
import { Button } from '@/components/common/Button';
import instance from '@/api/instance';
import { DiaryData } from '@/types';

type Props = {
  data: DiaryData;
  isModalOpen: boolean;
  handleModalClose: () => void;
  selectedDate: string | null;
  id: number;
};

const EditBookDiaryModal = ({
  id,
  data,
  isModalOpen,
  handleModalClose,
  selectedDate,
}: Props) => {
  const date = selectedDate ? new Date(selectedDate) : new Date();
  const time = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  const [Content, setContent] = useState(data.content);
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
    async function postFeedData() {
      try {
        await instance.put(`api/diaries/${id}`).then((response) => {
          console.log('다이어리 조회', response);
          window.location.reload();
        });
      } catch (error) {
        console.log(error);
      }
    }
    postFeedData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    async function postFeedData() {
      try {
        await instance
          .put(`api/diaries/${id}`, {
            content: Content,
            isbn: selectedBook?.isbn,
            date: selectedDate,
          })
          .then((response) => {
            console.log('다이어리 조회', response);
            handleModalClose();
          });
      } catch (error) {
        console.log(error);
      }
    }
    postFeedData();
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <CommonModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
      <form onSubmit={handleSubmit} style={{ width: '100%', height: '100%' }}>
        <HeaderBox>
          <Today>
            {time.year}.{time.month}.{time.date}
          </Today>
        </HeaderBox>
        <FlexBox>
          <Left>
            <UploadBook />
          </Left>
          <Right>
            <FormContainer>
              <TextForm value={Content} onChange={handleContentChange} />
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
  );
};

export default EditBookDiaryModal;

const HeaderBox = styled.section`
  height: auto;
  width: auto;
  position: absolute;
  top: 1.5rem;
  left: 1rem;
`;

const Today = styled.div`
  font-size: 40px;
  font-family: 'DungGeunMo';
  font-weight: bold;
  color: #a451f7;
  justify-content: flex-start;
  margin-bottom: 1rem;
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
  overflow: auto;
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
  overflow-y: auto;
  padding: 1rem;
  box-sizing: border-box;
`;

const TextForm = styled.textarea`
  width: 90%;
  height: 70%;
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
