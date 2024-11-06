import { useAuth } from '@/provider/Auth';
import { Navigate } from 'react-router-dom';
interface PrivateRouteProps {
  element: JSX.Element; // element의 타입을 JSX.Element로 지정
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isLogin } = useAuth(); // 로그인 상태 가져오기

  return isLogin ? element : <Navigate to="/login" />; // 로그인 상태에 따라 요소를 렌더링
};

export default PrivateRoute;
