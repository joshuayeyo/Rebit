import CommonHeader from '@/components/common/Header';
import Navbar from '@/components/feature/mypage/section/Navber';
import UserInfo from '@/components/feature/mypage/section/UserInfo';
import { useEffect, useState } from 'react';
import { Skeleton } from '@chakra-ui/react';
import instance from '@/api/instance';

type UserData = {
  nickname: string;
  presignedUrl: string;
  bio?: string;
  point?: number;
};

const Mypage = () => {
  const [data, setData] = useState<UserData | null>(null);
  const jwtToken = localStorage.getItem('jwt_token');
  const parsedToken = jwtToken ? JSON.parse(jwtToken) : null;
  const accessToken = parsedToken?.accessToken;
  const [isLoading, setIsLoading] = useState(true);

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
  }, [accessToken]);

  return (
    <>
      <CommonHeader />
      {data ? (
        <Skeleton isLoaded={!isLoading}>
          <UserInfo nickname={data.nickname} imageUrl={data.presignedUrl} />
          <Navbar />
        </Skeleton>
      ) : (
        <></>
      )}
    </>
  );
};

export default Mypage;
