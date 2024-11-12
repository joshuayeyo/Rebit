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
      if (!challenges || !Array.isArray(challenges)) {
        console.log("challenges가 배열이 아닙니다.");
        return;
      }
      const filtered = challenges.filter((challenge) => {
        if (filter === 'MY_VERIFICATION') {
          return challenge.author.id === userId;
        }
        return true;
      });
      setFilteredData(filtered);
    };

    updateFilteredData();
  }, [challenges, filter, userId]);

  useEffect(() => {
  }, [filter, filteredData]);

  return { filteredData, setFilter };
}


export default useChallengeVerification;
