import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Login";
import BookSearchPage from "@/pages/BookSearch";
import FeedPage from "@/pages/Feed";
import ChallengePage from "@/pages/Challenge";
import MyPage from "@/pages/MyPage";
import ChallengDetailPage from "@/pages/ChallengeDetail";


// import LoginPage from "@/pages/Login";

import { RouterPath } from "./path";

const router = createBrowserRouter([
    {
        path: RouterPath.home,
        element: <HomePage />,
    },
    // {
    //     path: RouterPath.layout,
    //     element: <Layout />,
    //     children: [
    //         {
    //             path: RouterPath.myPage,
    //             element: <MyPage />
    //         },
    //         {
    //             path: RouterPath.challenge,
    //             element: <ChallengeFeedPage />
    //         }
    //     ]
    // },
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
        element: <MyPage />
    },
]);

export const Routes = () => {
    return<RouterProvider router={router} />
}