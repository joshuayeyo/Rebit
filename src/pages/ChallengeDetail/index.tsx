import Intro from '@/components/feature/challegeDetail/Intro';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChallengeData } from '@/types';
import instance from '@/api/instance';
import CommonHeader from "@/components/common/Header";
const ChallengDetailPage = () =>{

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = Number(queryParams.get('id'));
  const filter = queryParams.get('filter');
  console.log(id);
  console.log(filter);
  const [data, setData] = useState<ChallengeData | null>(null);

  useEffect(() => {
    async function getChallengeDetailData() {
      try {
        const res = await instance.get(`/api/challenges/${id}`);
        const result = await res.data;
        console.log(result);
        setData(result);
      } catch (e) {
        console.log(e);
        alert('Error: 데이터를 불러올 수 없습니다.');
      }
    }
    getChallengeDetailData();
  }, [setData]);


  return (
    <>
    <CommonHeader />
    <Intro data={data} filter={filter}/>
    </>
  )
}

export default ChallengDetailPage;