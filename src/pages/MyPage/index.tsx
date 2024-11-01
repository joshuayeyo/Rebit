import CommonHeader from "@/components/common/Header";
import Navbar from "@/components/feature/mypage/section/Navber";
import UserInfo from "@/components/feature/mypage/section/UserInfo";
import axios from "axios";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Skeleton } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type Props = {
    id: number;
    isLogin: boolean;
};

// type UserData = {
//     nickname: string;
//     imageUrl?: string;
//     bio?: string;
//     point?: number;
// };

const Mypage = ({ isLogin, id }: Props) => {
    const [data, setData] = useState([]);
    const jwtToken = localStorage.getItem('jwt_token');
    const parsedToken = jwtToken ? JSON.parse(jwtToken) : null;
    const accessToken = parsedToken?.accessToken;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getUserDetails() {
            // if(!id || !accessToken) return;
            
            try {
            const res = await axios.get(`${BASE_URL}/api/members/me`,
                { headers: { Authorization: `Bearer ${accessToken}` }, }
            );
            const result = await res;
            setData(result.data);
            console.log(res)
        } catch (e) {
            alert('Error: 데이터를 불러올 수 없습니다.');
        } finally {
            setIsLoading(false);
        }
        }
        getUserDetails();
    }, [id, setData])
    
    return (
        <>
            <CommonHeader />
            <Skeleton isLoaded={!isLoading}>
                <UserInfo nickname={data.nickname} imageUrl={data.presignedUrl} />
            </Skeleton>
            <Navbar />
        </>   
    )
}

export default Mypage;