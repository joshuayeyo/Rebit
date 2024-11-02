import CommonHeader from '@/components/common/Header';
import FeedItemSection from '@/components/feature/feed/section/FeedItems';
import Navbar from '@/components/feature/feed/section/Navbar';
import { useState } from 'react';
const FeedPage = () => {
  const [filter, setFilter] = useState<string>('ALL');

  return (
    <>
      <CommonHeader />
      <Navbar setFilter={setFilter} />
      <FeedItemSection filter={filter} />
    </>
  );
};

export default FeedPage;
