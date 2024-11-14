import Overlay from '@/components/common/overlay';
import styled from '@emotion/styled';
import { Button } from '@/components/common/Button';
import { useEffect, useState } from 'react';
import instance from '@/api/instance';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { MdModeEditOutline } from "react-icons/md";

type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
  handleEditClick?: () => void;
  handleDeletClick?: () => void;
  children?: React.ReactNode;
  title?: string;
  posterId?: number;
};

const CommonModal = ({
  children,
  isModalOpen,
  handleModalClose,
  handleEditClick,
  handleDeletClick,
  title,
  posterId,
}: Props) => {
  const [myId, setMyId] = useState<number | null>(null);

  useEffect(() => {
    async function getMyData() {
      try {
        const res = await instance.get(`api/members/me`);
        console.log(res.data);
        setMyId(res.data.id);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
          console.error('Error message:', errorMessage);
          alert(errorMessage);
        }
      }
    }
    getMyData();
  }, []);

  return (
    <>
      <Overlay isOpen={isModalOpen} />
      <ModalContainer>
        <ButtonContainer hasTitle={!!title}>
          {myId === posterId && (
            <>
              <IconContainer onClick={handleEditClick}>
                <MdModeEditOutline size="30" />
              </IconContainer>
              <IconContainer onClick={handleDeletClick}>
                <MdDelete size="30" />
              </IconContainer>
            </>
          )}
          {title && <Title>{title}</Title>}
          <Button onClick={handleModalClose} theme="outline" size="medium">
            X
          </Button>
        </ButtonContainer>
        <ContentSection>{children}</ContentSection>
      </ModalContainer>
    </>
  );
};

export default CommonModal;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 999;
  background-color: white;
  width: 60vw;
  height: 60vh;
  position: fixed;
  top: 20%;
  right: 20%;
  border-radius: 10px;
  overflow: auto;
  padding: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonContainer = styled.div<{ hasTitle: boolean }>`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: ${({ hasTitle }) =>
    hasTitle ? 'space-between' : 'flex-end'};
  padding: 2rem;
  padding-right: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
`;

const ContentSection = styled.section`
  width: 100%;
  height: 100%;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
`;


const IconContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;
