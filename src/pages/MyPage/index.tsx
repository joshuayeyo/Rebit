import CommonHeader from '@/components/common/Header';
import Navbar from '@/components/feature/mypage/section/Navber';
import UserInfo from '@/components/feature/mypage/section/UserInfo';
import { useEffect, useState } from 'react';
import { Skeleton } from '@chakra-ui/react';
import instance from '@/api/instance';
import { UserData } from '@/types';
import ContentSection from '@/components/feature/mypage/section/ContentSection';

const Mypage = () => {
  const [activitySummary, setActibitySummary] = useState<number>()
  const [data, setData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState('Feed');
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  useEffect(() => {
    async function getUserDetails() {
      try {
        const res = await instance.get(`/api/members/me`);
        setData(res.data);
      } catch (error) {
        console.log(error);
        alert('Error: 데이터를 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    }
    getUserDetails();
  }, []);
  useEffect(() => {
    async function getUserActivitySummary() {
      try {
        const res = await instance.get(`/api/members/me/activity-summary`);
        setActibitySummary(res.data);
      } catch (error) {
        console.log(error);
        alert('Error: 데이터를 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    }
    getUserActivitySummary();
  }, []);
  return (
    <>
      <CommonHeader />
      {data ? (
        <Skeleton isLoaded={!isLoading}>
          <UserInfo 
            nickname={data.nickname} 
            imageUrl={data.presignedUrl} 
            coverImageUrl={data.coverPresignedUrl}
            bio={data.bio}
            points={data.point}
            diaryCount={activitySummary?.diaryCount} 
            feedCount={activitySummary?.feedCount} 
            challengeCount={activitySummary?.challengeCount}
          />
          <Navbar 
            selectedSection={selectedSection} 
            onSelectSection={setSelectedSection} 
            selectedFilter={selectedFilter} 
            onSelectFilter={setSelectedFilter} 
          />
          <ContentSection
            section={selectedSection}
            selectedFilter={selectedFilter}
          />
        </Skeleton>
      ) : (
        <></>
      )}
    </>
  );
};

export default Mypage;
