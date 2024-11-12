import Intro from '@/components/feature/challegeDetail/Intro';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChallengeData, UserData, VerificationData, Participant } from '@/types';
import instance from '@/api/instance';
import CommonHeader from '@/components/common/Header';
import Verification from '@/components/feature/challegeDetail/Verification';
import axios from 'axios';


const ChallengDetailPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = Number(queryParams.get('id'));
  const filter = queryParams.get('filter');
  const [challengeData, setChallengeData] = useState<ChallengeData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [verificationData, setVerificationData] = useState<VerificationData[]| null>([]);
  const [isParticipating, setIsParticipating] = useState(false);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function getChallengeDetailData() {
      try {
        const res = await instance.get(`/api/challenges/${id}`);
        const result = await res.data;
        setChallengeData(result);
      } catch (e) {
        console.log(e);
        alert('Error: 데이터를 불러올 수 없습니다.');
      }
    }

    async function getUserInfo() {
      try {
        const response = await instance.get('/api/members/me');
        setUserData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
          console.error('Error message:', errorMessage);
          alert(errorMessage);
        }
    }}

    const VerificationData = () => {
      if (!hasMore) return;
      async function postVerificationData() {
        try {
          const response = await instance.get(`/api/challenges/${id}/verifications`,{
            params: { page: page },
          });
          const result = await response.data;
          if(result.content && result.content.length > 0) {
            setVerificationData((prevData) => [...(prevData || []), ...result.content]);
          } else {
            setHasMore(false);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
            console.error('Error message:', errorMessage);
            alert(errorMessage);
          }
        }
      }
      if (hasMore && page >= 0) {
        postVerificationData();
      }
    }

    VerificationData();
    getChallengeDetailData();
    getUserInfo();
  }, [page, hasMore, id]);
  
  useEffect(() => {
    const Participations = () => {
      async function Data() {
        try {
          const response = await instance.get(`/api/challenges/${id}/participations`);
          const isUserParticipating = response.data.content.some(
            (participant:Participant) => participant.memberId === userData?.id
          );
          setIsParticipating(isUserParticipating);
        } catch (e) {
          console.log(e);
          alert('챌린지 정보를 가져오는 데 실패했습니다.');
        }
      }
      Data();
    };
    
    Participations();

  }, [userData, id]);

  return (
    <>
      <CommonHeader />
      <Intro challengeData={challengeData} userData={userData} filter={filter} />
      {filter === 'IN_PROGRESS' && 
      <Verification 
      data={challengeData} 
      userData={userData} 
      challengeId={id} 
      verificationData={verificationData}
      isParticipating={isParticipating}
      page={page}
      setPage={setPage}
      hasMore={hasMore}
      setHasMore={setHasMore}
      />}
    </>
  );
};

export default ChallengDetailPage;
