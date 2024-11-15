import Overlay from '@/components/common/overlay';
import styled from '@emotion/styled';
import { Button } from '@/components/common/Button';
import { useEffect, useRef } from 'react';

type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
  children?: React.ReactNode;
  title?: string;
};
const CommonModal = ({
  children,
  isModalOpen,
  handleModalClose,
  title,
}: Props) => {
const modalRef = useRef<HTMLDivElement>(null)

  const handleEscKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleModalClose();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('keydown', handleEscKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <>
      <Overlay isOpen={isModalOpen}  onClick={handleModalClose} />
      <ModalContainer ref={modalRef}>
        <ButtonContainer hasTitle={!!title}>
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
  &::-webkit-scrollbar {
    display: none;
  }
  border: none;
  outline: none;
`;

const ButtonContainer = styled.div<{ hasTitle: boolean }>`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: ${({ hasTitle }) =>
    hasTitle ? 'space-between' : 'flex-end'};
  padding: 2rem;
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
