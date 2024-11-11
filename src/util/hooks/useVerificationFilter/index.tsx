import { useEffect, useState } from 'react';

type VerificationFilterType = 'ALL' | 'MY_VERIFICATION';

interface author {
  id: number;
}

interface ChallengeWithCreator {
  author: author;
}


function useChallengeVerification<T extends ChallengeWithCreator>( challenges: T[] | null, userId: number, initialFilter: VerificationFilterType = 'ALL') {
  const [filter, setFilter] = useState<VerificationFilterType>(initialFilter);
  const [filteredData, setFilteredData] = useState<T[]>(Array.isArray(challenges) ? challenges : []);

  useEffect(() => {
    const updateFilteredData = () => {
      if (!challenges || !Array.isArray(challenges)) { // null 또는 배열이 아닌 경우 종료
        console.log("challenges가 배열이 아닙니다.");
        return;
      }
      const filtered = challenges.filter((challenge) => {
        if (filter === 'MY_VERIFICATION') {
          return challenge.author.id === userId;
        }
        return true; // 'ALL' 필터에서는 모든 챌린지를 보여줍니다.
      });
      setFilteredData(filtered);
    };

    updateFilteredData();
  }, [challenges, filter, userId]);

  useEffect(() => {
    // console.log(`Filtered data for filter type "${filter}":`, filteredData);
  }, [filter, filteredData]);

  return { filteredData, setFilter };
}


export default useChallengeVerification;
