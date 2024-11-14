import { Heading, Card, CardBody, Avatar, Flex, Text } from '@chakra-ui/react';
import CommonImage from '@/components/common/Image';

type Props = {
  maxWidth: string;
  imageURL: string;
  title?: string;
  content?: string;
  username: string;
  profileImage?: string;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const CommonCard = ({
  maxWidth,
  imageURL,
  title,
  content,
  profileImage,
  username,
  onClick,
}: Props) => {
  return (
    <>
      <Card maxW={maxWidth} onClick={onClick} style={{ cursor: 'pointer' }}>
        <CardBody>
          <CommonImage src={imageURL} ratio={'square'} width={500} />
          <br />
          <Heading
            size="md"
            isTruncated
            noOfLines={1} // 한 줄만 표시
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {title}
          </Heading>
          <Text size="sm">{content}</Text>
          <Flex
            gap="2"
            alignItems="center"
            justifyContent="flex-end"
            flexWrap="wrap"
          >
            <Avatar size="sm" src={profileImage} />
            <Heading size="sm">{username}</Heading>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default CommonCard;
