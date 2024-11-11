import { useState } from 'react';
import CommonHeader from '@/components/common/Header';
import Navbar from '@/components/feature/challenge/section/NavBar/';
import ChallegeItemSection from '@/components/feature/challenge/section/ChallengeItems';

type FilterType =
  | 'RECRUITING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'UPCOMING'
  | 'ALL';

const ChallengePage = () => {
  const [filterType, setFilterType] = useState<FilterType>('RECRUITING');
  return (
    <>
      <CommonHeader />
      <Navbar setFilterType={setFilterType} />
      <ChallegeItemSection filterType={filterType} />
    </>
  );
};

export default ChallengePage;
