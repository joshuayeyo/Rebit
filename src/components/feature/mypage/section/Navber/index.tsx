import styled from '@emotion/styled';
import { Flex, Box, Divider } from '@chakra-ui/react';

type Props = {
  selectedSection: string;
  selectedFilter: string;
  onSelectSection: (section: string) => void;
  onSelectFilter: (filter: string) => void;
};

const Navbar = ({
  selectedSection,
  onSelectSection,
  onSelectFilter,
}: Props) => {
  const renderButtons = () => {
    switch (selectedSection) {
      case 'Feed':
        return (
          <>
            <StyledButton onClick={() => onSelectFilter('ALL')}>
              All
            </StyledButton>
            <StyledButton onClick={() => onSelectFilter('FB')}>
              인생책
            </StyledButton>
            <StyledButton onClick={() => onSelectFilter('S')}>
              스토리
            </StyledButton>
          </>
        );
      case 'Wish':
        return (
          <>
            <StyledButton onClick={() => onSelectFilter('Book')}>
              Book
            </StyledButton>
            <StyledButton onClick={() => onSelectFilter('Challenge')}>
              Challenge
            </StyledButton>
          </>
        );
      case 'Challenge':
        return <></>;
      case 'Diary':
        return <StyledButton>Diary</StyledButton>;
      default:
        return null;
    }
  };

  return (
    <Flex direction="column" alignItems="center" mt={5}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <StyledButton onClick={() => onSelectSection('Feed')}>
          Feed
        </StyledButton>
        <StyledButton onClick={() => onSelectSection('Wish')}>
          Wish
        </StyledButton>
        <StyledButton onClick={() => onSelectSection('Challenge')}>
          Challenge
        </StyledButton>
        <StyledButton onClick={() => onSelectSection('Diary')}>
          Diary
        </StyledButton>
      </Box>
      <Divider mt="0.8rem" mb="0.8rem" borderColor="gray.800" width="60%" />
      <Box display="flex" justifyContent="center" alignItems="center">
        {renderButtons()}
      </Box>
    </Flex>
  );
};

export default Navbar;

const StyledButton = styled.button`
    background-color: none;
    color: black;
    border: none;
    padding: 10px 20px;
    font-size: 30px;
    font-weight: bold;
    margin: 0 40px 0 40px;
    cursor: pointer;
    &:focus {
        color: orange;
        text-decoration: underline;
        text-underline-offset: 10px;
`;
