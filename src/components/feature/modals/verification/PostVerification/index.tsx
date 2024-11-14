import CommonModal from '@/components/common/Modal';
import styled from '@emotion/styled';
import UploadImage from '@/components/feature/images/UploadImage';
import { Button } from '@/components/common/Button';
import { useState, useEffect } from 'react';
import instance from '@/api/instance';
import axios from 'axios';
type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
  setIsModalOpen: (visible: boolean) => void;
  challengeId: number | null;
};

const PostVerificationModal = ({
  isModalOpen,
  handleModalClose,
  setIsModalOpen,
  challengeId,
}: Props) => {
  const [imageKey, setImageKey] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    imageKey: '',
    content: '',
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      imageKey: imageKey,
    }));
  }, [imageKey]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    async function postVerificationData() {
      try {
        await instance.post(
          `/api/challenges/${challengeId}/verifications`,
          formData,
        );
        alert('데이터가 성공적으로 들어갔습니다.');
        setIsModalOpen(false);
        window.location.reload();

      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
          console.error('Error message:', errorMessage);
          alert(errorMessage);
          handleModalClose(); 
        }
      }
    }
    postVerificationData();
  };

  return (
    <>
      <CommonModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%', height: '100%' }}>
          <FlexContainer>
            <Left>
              <ImageContainer>
                <UploadImage
                  setImageKey={setImageKey}
                  type="CHALLENGE_VERIFICATION"
                />
              </ImageContainer>
            </Left>
            <Right>
              <StyledForm>
                <InputField>
                  <label>제목:</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </InputField>
                <TextAreaField>
                  <label>내용:</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    placeholder="오늘의 인증글 내용을 작성해주세요."
                  />
                </TextAreaField>
              </StyledForm>
            </Right>
          </FlexContainer>
          <SubmitButton>
            <Button
              size={'medium'}
              theme={'outline'}
              style={{ justifyContent: 'flex-end' }}
              type="submit"
            >
              POST!
            </Button>
          </SubmitButton>
        </form>
      </CommonModal>
    </>
  );
};
export default PostVerificationModal;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 1rem;
  height: calc(100% - 6rem);
`;

const Left = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  margin-right: 2rem;
  margin-left: 2rem;
`;
const ImageContainer = styled.div`
  width: 80%;
  height: 100%;
`;
const Right = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  margin-right: 2rem;
  margin-left: 2rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  label {
    font-weight: bold;
    width: 100px;
    margin-right: 1rem;
  }

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
`;

const TextAreaField = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  textarea {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    resize: none;
  }
`;

const SubmitButton = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`;
