import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { selectBook } from '@/store/bookSlice';
import { Box, Image, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type BookProps = {
  id: number;
  isbn: string;
  cover: string;
  title: string;
  author: string;
  pubDate: string;
  link: string;
};

const BookCard = forwardRef<HTMLDivElement, BookProps>(
  ({ id, isbn, cover, title, author, pubDate, link }, ref) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSelectBook = () => {
      const selectedBook = { id, isbn, cover, title, author, pubDate, link };
      dispatch(selectBook(selectedBook));
      navigate(-1);
      setTimeout(() => {
        console.log('Redux 상태:', selectedBook);
      }, 1000);
    };

    const [isHovered, setIsHovered] = useState(false);

    return (
      <Box
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        borderRadius="10px"
        overflow="hidden"
        position="relative"
        width="100%"
        maxWidth="18vw"
        margin="0 auto"
        marginBottom="20px"
      >
        <Image
          src={cover}
          alt={title}
          width="100%"
          objectFit="cover"
          aspectRatio="1/1.2"
        />
        <Box padding="10px 0">
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="gray.800"
            textAlign="center"
          >
            {title}
          </Text>
          <Text color="gray.500" my="2" fontSize="sm" textAlign="center">
            {author}
          </Text>
          <Text fontSize="xs" color="gray.400" textAlign="center">
            {pubDate}
          </Text>
        </Box>
        {isHovered && (
          <Box
            position="absolute"
            bottom="30vh"
            left="50%"
            transform="translateX(-50%)"
          >
            <Button onClick={handleSelectBook} size="sm">
              책 선택하기
            </Button>
          </Box>
        )}
      </Box>
    );
  },
);

export default BookCard;
