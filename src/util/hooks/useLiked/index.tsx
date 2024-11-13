import instance from '@/api/instance';
import { useEffect, useState } from 'react';

type Props = {
  feedId: number;
  initialLiked: boolean;
  initialLikes: number;
};

export default function useLiked({
  feedId,
  initialLiked,
  initialLikes,
}: Props) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);

  useEffect(() => {
    setIsLiked(initialLiked);
    setLikes(initialLikes);
  }, [initialLiked, initialLikes]);

  const toggleLiked = async () => {
    try {
      if (isLiked) {
        await instance.delete(`api/feeds/${feedId}/likes`);
      } else {
        await instance.post(`api/feeds/${feedId}/likes`, { feedId });
      }
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      setLikes((prevLikes) => (newLikedState ? prevLikes + 1 : prevLikes - 1));
    } catch (error) {
      alert('좋아요를 추가할 수 없습니다. 개발자에게 항의하세요.');
      console.log(error);
    }
  };
  return { isLiked, setLikes, likes, toggleLiked };
}
