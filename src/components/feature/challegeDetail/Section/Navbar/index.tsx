import styled from '@emotion/styled';
import { Flex, Box } from '@chakra-ui/react';
import { TbPencilPlus } from "react-icons/tb";
import { useAuth } from '@/provider/Auth';
import PostVerificationModal from '@/components/feature/modals/verification/PostVefication';
type NavbarProps = {
  setFilterType: (
    filterType: 'TODAY' | 'ALL',
  ) => void;
  handleModalClose: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (visible: boolean) => void;
  challengeId: number | null;

};

const Navbar = ({ 
  setFilterType,
  handleModalClose,
  isModalOpen,
  setIsModalOpen,
  challengeId }: NavbarProps) => {
  
  const { isLogin } = useAuth();
  const handleClick = () => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      return;
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <Flex direction="row" justifyContent="space-between" mt={5} padding='0.5rem 6rem'>
      <Box display="flex">
        <StyledButton onClick={() => setFilterType('TODAY')}>
          #오늘의 인증글
        </StyledButton>
        <StyledButton onClick={() => setFilterType('ALL')}>
          #내 인증글
        </StyledButton>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
      <Button onClick={handleClick}>
        글 작성<TbPencilPlus size="50px" />
      </Button>
        {isModalOpen && (
          <PostVerificationModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleModalClose={handleModalClose}
            challengeId={challengeId}
          />
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;

const StyledButton = styled.button`
  background-color: none;
  color: black;
  border: 1px solid black;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
  cursor: pointer;
  &:focus {
      color: orange;
      border: 1px solid orange;
`;

const Button = styled.button`
  font-weight: bold;
  &:hover {
    opacity: 0.5;
  }
`;