import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import BookSearchPage from '@/pages/BookSearch';
import FeedPage from '@/pages/Feed';
import ChallengePage from '@/pages/Challenge';
import MyPage from '@/pages/MyPage';
import BookDetailPage from '@/pages/BookDetail';
import { RouterPath } from './path';
import ChallengDetailPage from '@/pages/ChallengeDetail';
import PrivateRoute from './PrivateRoute';
import BookDiaryPage from '@/pages/BookDiary';

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
    path: RouterPath.bookdetails,
    element: <BookDetailPage />,
  },
  {
    path: RouterPath.challengeDetail,
    element: <PrivateRoute element={<ChallengDetailPage />} />,
  },
  {
    path: RouterPath.bookSearch,
    element: <BookSearchPage />,
  },
  {
    path: RouterPath.myPage,
    element: <PrivateRoute element={<MyPage />} />,
  },
  {
    path: RouterPath.bookdiary,
    element: <PrivateRoute element={<BookDiaryPage />} />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
