import { Flex } from "@chakra-ui/react";
import styled from '@emotion/styled';
import PostChallengyModal from "@/components/feature/modals/challenges/PostChallenge";
import { useAuth } from '@/provider/Auth';


type Props = {
  handleModalClose: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (visible: boolean) => void;
}


const WriteButton = ({ handleModalClose, isModalOpen, setIsModalOpen }: Props) => { 
  const { isLogin } = useAuth();
  const handleClick =() => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      return;
    }else{
      setIsModalOpen(true);
    }
  };

  return (
    <Flex position="fixed" bottom="30px" right="3vw">
      <Button onClick={handleClick}>
        + 챌린지 생성
      </Button>
      {isModalOpen &&(
        <PostChallengyModal
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
        />
      )}
    </Flex>
  );

}

export default WriteButton;

const Button = styled.button`
  background-color: #474747;
  color: white;
  border-radius: 20px;
  padding: 10px 15px 10px 10px;
  font-weight: bold;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
  `