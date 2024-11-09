import CommonModal from '@/components/common/Modal';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import UploadBook from '../UploadBook';
import { Button } from '@/components/common/Button';
import instance from '@/api/instance';

type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
};

const PostFavbookModal = ({ isModalOpen, handleModalClose }: Props) => {
  const today = new Date();
  const time = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  };

  const [briefReview, setBriefReview] = useState('');
  const [fullReview, setFullReview] = useState('');

  const [briefPlaceholder, setBriefPlaceholder] =
    useState('한줄평을 작성하세요...');
  const [fullPlaceholder, setFullPlaceholder] =
    useState('서평을 작성하세요...');
  const [isBriefPlaceholderRed, setIsBriefPlaceholderRed] = useState(false);
  const [isFullPlaceholderRed, setIsFullPlaceholderRed] = useState(false);

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

  console.log(selectedBook);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // 유효성 검사
    if (!briefReview) {
      setBriefPlaceholder('한줄평을 입력해야 합니다!');
      setIsBriefPlaceholderRed(true);
      return;
    }

    if (!fullReview) {
      setFullPlaceholder('서평을 입력해야 합니다!');
      setIsFullPlaceholderRed(true);
      return;
    }

    async function postFeedData() {
      try {
        await instance
          .post('api/feeds', {
            type: 'FB',
            bookId: selectedBook.id,
            briefReview: briefReview,
            fullReview: fullReview,
          })
          .then((response) => {
            console.log(response);
            window.location.reload(); // Posting 후 페이지 새로고침
          });
      } catch (e) {
        console.log(e);
      }
    }
    postFeedData();
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    type: 'brief' | 'full',
  ) => {
    if (type === 'brief') {
      setBriefReview(e.target.value);
      if (e.target.value) {
        setBriefPlaceholder('한줄평을 작성하세요...');
        setIsBriefPlaceholderRed(false);
      }
    } else if (type === 'full') {
      setFullReview(e.target.value);
      if (e.target.value) {
        setFullPlaceholder('자세한 리뷰를 작성하세요...');
        setIsFullPlaceholderRed(false);
      }
    }
  };

  return (
    <>
      <CommonModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      >
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
                <TextForm
                  value={briefReview}
                  onChange={(e) => handleContentChange(e, 'brief')}
                  placeholder={briefPlaceholder}
                  isPlaceholderRed={isBriefPlaceholderRed}
                />
                <TextForm
                  value={fullReview}
                  onChange={(e) => handleContentChange(e, 'full')}
                  placeholder={fullPlaceholder}
                  isPlaceholderRed={isFullPlaceholderRed}
                />
              </FormContainer>
              <SubmitButton>
                <Button
                  size="medium"
                  theme="lightgray"
                  style={{ justifyContent: 'flex-end' }}
                  type="submit"
                >
                  POST!
                </Button>
              </SubmitButton>
            </Right>
          </FlexBox>
        </form>
      </CommonModal>
    </>
  );
};

export default PostFavbookModal;

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

const TextForm = styled.textarea<{ isPlaceholderRed: boolean }>`
  width: 90%;
  height: 70%; // 텍스트 영역이 전체 높이를 차지하지 않도록 조정
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  resize: none;
  color: ${(props) => (props.isPlaceholderRed ? '#ff0000' : 'inherit')};
  &:focus {
    outline: none;
    border-color: #a451f7;
  }
  ::placeholder {
    color: ${(props) => (props.isPlaceholderRed ? '#ff0000' : '#999')};
  }
`;

const SubmitButton = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: 1rem;
  box-sizing: border-box;
`;
