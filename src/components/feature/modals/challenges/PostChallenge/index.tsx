import CommonModal from '@/components/common/Modal';
import styled from '@emotion/styled';
import UploadImage from '@/components/feature/images/UploadImage';
import { useState } from 'react';
import ChallengeForm from '@/components/feature/challenge/section/ChallengeForm';

type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
  setIsModalOpen: (visible: boolean) => void;
};

const PostChallengyModal = ({
  isModalOpen,
  handleModalClose,
  setIsModalOpen,
}: Props) => {
  const [imageKey, setImageKey] = useState('');

  return (
    <CommonModal
      isModalOpen={isModalOpen}
      handleModalClose={handleModalClose}
      title="챌린지 생성하기"
    >
      <Container>
        <ImageContainer>
          <UploadImage setImageKey={setImageKey} type="CHALLENGE" />
        </ImageContainer>
        <FormContainer>
          <ChallengeForm imageKey={imageKey} setIsModalOpen={setIsModalOpen} />
        </FormContainer>
      </Container>
    </CommonModal>
  );
};

export default PostChallengyModal;

const Container = styled.div`
  border-top: 1px solid #000;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 2rem);
  margin-top: 20px;
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const FormContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
