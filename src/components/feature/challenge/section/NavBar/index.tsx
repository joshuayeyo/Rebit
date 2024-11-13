import { useState } from 'react';
import styled from '@emotion/styled';
import { Flex, Box, Heading } from '@chakra-ui/react';

type NavbarProps = {
  setFilterType: (
    filterType: 'RECRUITING' | 'IN_PROGRESS' | 'COMPLETED' | 'UPCOMING' | 'ALL',
  ) => void;
};

const Navbar = ({ setFilterType }: NavbarProps) => {
  const [selectedFilter, setSelectedFilter] = useState<
    'RECRUITING' | 'IN_PROGRESS' | 'COMPLETED' | 'UPCOMING' | 'ALL'
  >('RECRUITING');

  const handleButtonClick = (
    filterType: 'RECRUITING' | 'IN_PROGRESS' | 'COMPLETED' | 'UPCOMING' | 'ALL',
  ) => {
    setSelectedFilter(filterType);
    setFilterType(filterType);
  };

  return (
    <Flex direction="column" alignItems="center" mt={5}>
      <Heading as="h1" fontSize="60px" mb={4}>
        Challenge
      </Heading>
      <Box display="flex" justifyContent="center" alignItems="center">
        <StyledButton
          isSelected={selectedFilter === 'UPCOMING'}
          onClick={() => handleButtonClick('UPCOMING')}
        >
          모집 예정 챌린지
        </StyledButton>
        <StyledButton
          isSelected={selectedFilter === 'RECRUITING'}
          onClick={() => handleButtonClick('RECRUITING')}
        >
          모집중인 챌린지
        </StyledButton>
        <StyledButton
          isSelected={selectedFilter === 'IN_PROGRESS'}
          onClick={() => handleButtonClick('IN_PROGRESS')}
        >
          진행중인 챌린지
        </StyledButton>
      </Box>
    </Flex>
  );
};

export default Navbar;

const StyledButton = styled.button<{ isSelected: boolean }>`
  background-color: none;
  color: ${({ isSelected }) => (isSelected ? 'orange' : 'black')};
  border: none;
  padding: 10px 20px;
  font-size: 25px;
  font-weight: bold;
  margin: 0 40px 0 40px;
  cursor: pointer;
  text-decoration: ${({ isSelected }) => (isSelected ? 'underline' : 'none')};
  text-underline-offset: 10px;
`;
