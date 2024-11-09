import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import BookSearchPage from '@/pages/BookSearch';
import FeedPage from '@/pages/Feed';
import ChallengePage from '@/pages/Challenge';
import MyPage from '@/pages/MyPage';
import ChallengDetailPage from '@/pages/ChallengeDetail';
import { RouterPath } from './path';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: RouterPath.home,
    element: <HomePage />,
  },
  {
    path: RouterPath.login,
    element: <LoginPage />,
  },
  {
    path: RouterPath.feed,
    element: <FeedPage />,
  },
  {
    path: RouterPath.challenge,
    element: <ChallengePage />,
  },
  {
    path: RouterPath.challengeDetail,
    element: <ChallengDetailPage />,
  },
  {
    path: RouterPath.bookSearch,
    element: <BookSearchPage />,
  },
  {
    path: RouterPath.myPage,
    element: <PrivateRoute element={<MyPage />} />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
