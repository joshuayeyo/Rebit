import { useEffect, useState } from 'react';

type FilterType =
  | 'RECRUITING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'UPCOMING'
  | 'ALL';

interface ChallengeWithDates {
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  challengeStartDate: string;
  challengeEndDate: string;
}

function useChallengeFilter<T extends ChallengeWithDates>(
  challenges: T[],
  initialFilter: FilterType = 'ALL',
) {
  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const [filteredData, setFilteredData] = useState<T[]>(challenges);

  useEffect(() => {
    const updateFilteredData = () => {
      const currentDate = new Date();

      const filtered = challenges.filter((challenge) => {
        const recruitmentStart = new Date(challenge.recruitmentStartDate);
        const recruitmentEnd = new Date(challenge.recruitmentEndDate);
        const challengeStart = new Date(challenge.challengeStartDate);
        const challengeEnd = new Date(challenge.challengeEndDate);
        if (filter === 'UPCOMING') {
          return currentDate < recruitmentStart;
        } else if (filter === 'RECRUITING') {
          return (
            currentDate >= recruitmentStart && currentDate <= recruitmentEnd
          );
        } else if (filter === 'IN_PROGRESS') {
          return currentDate >= challengeStart && currentDate <= challengeEnd;
        } else if (filter === 'COMPLETED') {
          return currentDate > challengeEnd;
        }
      });

      setFilteredData(filtered);
    };

    updateFilteredData();
  }, [challenges, filter]);


  return { filteredData, setFilter };
}

export default useChallengeFilter;
