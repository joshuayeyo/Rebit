import instance from '@/api/instance';
import { useState } from 'react';

type Props = {
    initialWishlisted: boolean | null;
    isbn?: string;
    challengeId?: number;
}

// 책 위시리스트 toggle
export function toggleBookWishlist({
    initialWishlisted,
    isbn,
}: Props) {
    const [isWishlisted, setIsWishlisted] = useState(initialWishlisted ?? false);

    const toggleBookWishlisted = async () => {
        try {
            if (isWishlisted) {
                await instance.delete(`api/wishes/books/${isbn}`)
            } else {
                await instance.post(`api/wishes/books/${isbn}`, { isbn });
            }
            setIsWishlisted(prevState => !prevState);
        } catch (error) {
            console.log(error);
        }
    };
    return { isWishlisted, toggleBookWishlisted, setIsWishlisted}
};

// 챌린지 위시리스트 토글
export function toggleChallengeWishlist({
    initialWishlisted,
    challengeId,
}: Props) {
    const [isWishlisted, setIsWishlisted] = useState(initialWishlisted ?? false);

    const toggleChallengeWishlisted = async () => {
        try {
            if (isWishlisted) {
                await instance.delete(`api/wishes/challenges/${challengeId}`)
            } else {
                await instance.post(`api/wishes/challenges/${challengeId}`, { challengeId });
            }
            setIsWishlisted(prevState => !prevState);
        } catch (error) {
            console.log(error)
        }
    };
    return { isWishlisted, toggleChallengeWishlisted, setIsWishlisted}
};