import styled from '@emotion/styled';
import { Flex, Box, Divider } from '@chakra-ui/react';

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

const Navbar = () => {
  return (
    <Flex direction="column" alignItems="center" mt={5}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <StyledButton>Feed</StyledButton>
        <StyledButton>Wish</StyledButton>
        <StyledButton>Challenge</StyledButton>
        <StyledButton>Diary</StyledButton>
      </Box>
      <Divider mt="0.8rem" mb="0.8rem" borderColor="gray.800" width="60%" />
      <Box display="flex" justifyContent="center" alignItems="center">
        <StyledButton>전체</StyledButton>
        <StyledButton>인생책</StyledButton>
        <StyledButton>스토리</StyledButton>
        <StyledButton>매거진</StyledButton>
      </Box>
    </Flex>
  );
};

export default Navbar;
