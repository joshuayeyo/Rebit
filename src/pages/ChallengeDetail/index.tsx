import Intro from '@/components/feature/challegeDetail/Intro';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChallengeData, UserData } from '@/types';
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

    // const Verification = () => {
    //   async function postVerificationData() {
    //     try {
    //       const response = await instance.get(`/api/challenges/${id}/participations`);
    //       console.log(response.data);
    //     } catch (e) {
    //       console.log(e);
    //       alert('챌린지 정보를 가져오는 데 실패했습니다.');
    //     }
    //   }
    //   postVerificationData();
    // };

    // const Verificationpost = () => {
    //   async function postVerificationData() {
    //     try {
    //       const response = await instance.get(`/api/challenges/${id}/verification`);
    //       console.log(response.data);
    //     } catch (e) {
    //       console.log(e);
    //       alert('챌린지 정보를 가져오는 데 실패했습니다.');
    //     }
    //   }
    //   postVerificationData();
    // };

    // Verificationpost();
    // Verification();  
    
    getChallengeDetailData();
    getUserInfo();
  }, [setChallengeData]);

  return (
    <>
      <CommonHeader />
      <Intro challengeData={challengeData} userData={userData} filter={filter} />
      {filter === 'IN_PROGRESS' && <Verification data={challengeData} userData={userData} challengeId={id}/>}
    </>
  );
};

export default ChallengDetailPage;
