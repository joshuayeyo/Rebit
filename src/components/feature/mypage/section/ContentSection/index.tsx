import UserPostedChallenges from "@/components/feature/mypage/section/PostedChallanges";
import UserWishes from "@/components/feature/mypage/section/UserWishes";
import UserPostedFeeds from "@/components/feature/mypage/section/PostedFeeds";

interface Props {
    section: string;
    selectedFilter: string; // selectedFilter 값을 받기 위해 수정
}

const ContentSection = ({ section, selectedFilter }: Props) => {
    switch (section) {
        case 'Feed':
            return <UserPostedFeeds filter={selectedFilter} />; // 필터 값 전달
        case 'Wish':
            return <UserWishes filter={selectedFilter}/>;
        case 'Challenge':
            return <UserPostedChallenges />;
        default:
        return null;
    }
};

export default ContentSection;