import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { eachDayOfInterval, isWithinInterval, differenceInDays} from 'date-fns';
import styled from '@emotion/styled';
import { ChallengeData, UserData, VerificationData } from '@/types';
import { FaMedal } from 'react-icons/fa';
import Navbar from '../Section/Navbar';
import VerificationSection from '../Section/DetailItems';
import useChallengeVerification from '@/util/hooks/useVerificationFilter';


type ChallengeProps = {
  data: ChallengeData | null;
  userData: UserData | null;
  challengeId: number | null;
  verificationData: VerificationData[] | null;
  isParticipating: boolean;
  page: number;
  setPage: (page: number) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
};

type FilterType = 'MY_VERIFICATION' | 'ALL';


const Verification = ({ data, userData, challengeId, verificationData, isParticipating, page, setPage, hasMore, setHasMore }: ChallengeProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isInRange, setIsInRange] = useState<boolean>(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>('ALL');
  const { filteredData } = useChallengeVerification(verificationData || [], userData?.id || 0, 'MY_VERIFICATION');
  const [filteredDataCount, setFilteredDataCount] = useState(0);

  console.log("참여여부",isParticipating);

  function formatDate(date: string | null | undefined): string {
    if (!date) return '';
    const dateObject = new Date(date);
    return dateObject.toISOString().split('T')[0].replace(/-/g, '/');
  }
  const handlePostModalClose = () => {
    setIsPostModalOpen(false);
  }; 

  const challengeStartDate = formatDate(data?.challengeStartDate);
  const challengeEndDate = formatDate(data?.challengeEndDate);
  const totalDays = differenceInDays(challengeEndDate, challengeStartDate) + 1;
  const todayIndex = differenceInDays(new Date(), challengeStartDate) + 1;
  const highlightedDates = eachDayOfInterval({ start: challengeStartDate, end: challengeEndDate });
  const progressPercentage = (filteredDataCount / totalDays) * 100;

  useEffect(() => {
    setFilteredDataCount(filteredData.length);
    if (selectedDate) {
      setIsInRange(
        isWithinInterval(selectedDate, { start: challengeStartDate, end: challengeEndDate })
      );
    } else {
      setIsInRange(false);
    }
  }, [selectedDate, filteredData]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };


  return (
    <Wrapper>
      <HeaderWrapper>
      <ProfileContainer isVisible={isParticipating}>
        <ProfileWrapper>
          <Profile src={userData?.presignedUrl} alt="프로필 사진" />  
          <AuthorInfo>
            <Author>{userData?.nickname}</Author>
            <Bio>{userData?.bio}</Bio>
          </AuthorInfo>
        </ProfileWrapper>
        <MedalWrapper>
          <FaMedalStyled size={45} />
          <ProgerssWrapper>
            <span>{filteredDataCount}/{totalDays}</span>
            <ProgressBar progress={progressPercentage} />
          </ProgerssWrapper>
        </MedalWrapper>
      </ProfileContainer>
        <TitleWrapper>
          <Title>Proof</Title>
          <Period>{challengeStartDate} ~ {challengeEndDate}</Period>
          <Today>#Day{todayIndex}</Today>
        </TitleWrapper>
        <DatePickerWrapper isInRange={isInRange}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            locale={ko}
            inline
            highlightDates={highlightedDates}
          />
        </DatePickerWrapper>
      </HeaderWrapper>
      <Navbar 
        setFilterType={setFilterType}
        isModalOpen={isPostModalOpen}
        setIsModalOpen={setIsPostModalOpen}
        handleModalClose={handlePostModalClose}
        challengeId={challengeId}
        isParticipating={isParticipating}
        />
      <VerificationSection 
      filterType={filterType} 
      verificationData={verificationData || []} 
      userId={userData?.id ?? 0} 
      challengeId={challengeId}
      page={page}
      setPage={setPage}
      hasMore={hasMore}
      setHasMore={setHasMore}
      ></VerificationSection>
    </Wrapper>
  );


};

export default Verification;

const Wrapper = styled.section`
  height: 100vh;
  background-color: white;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 5rem 7rem; 
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const ProfileContainer = styled.div<{ isVisible: boolean }>`
  display: flex;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  align-items: center;
  flex-direction: column;
  width: 25%;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

`

const Profile = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 1rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: auto;
`;

const Author = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const Bio = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0.2rem 0 0 0;
`;

const MedalWrapper = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: end;
  font-size: 2rem;
  font-weight: bold;
  color: #212121;
`;

const ProgerssWrapper = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  flex-direction: column;
  margin-left: 0.5rem;
`

const FaMedalStyled = styled(FaMedal)`
  margin-right: 0.5rem;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 0.5rem;

  &::before {
    content: "";
    display: block;
    height: 100%;
    width: ${(props) => props.progress}%; /* 달성 비율에 따라 조정 */
    background-color: #f5af19;
    transition: width 0.3s ease; /* 애니메이션 효과 추가 */
  }
`;
;

const TitleWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: bold;
`;


const Period = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-decoration: underline 3px solid black;
  color: rgba(245, 175, 25, 0.6);
  -webkit-text-stroke: 1px black; 
`;

const Today = styled.h1`
  margin-top: 3rem;
  font-size: 3rem;
  font-weight: bold;
  color: rgba(245, 175, 25, 0.6);
`

const DatePickerWrapper = styled.div<{ isInRange: boolean }>`
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;

  .react-datepicker {
    width: 100%;
    font-size: 1rem;
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  .react-datepicker__day--highlighted {
    background-color: #FFEB3B;
    border-radius: 50%;
    color: white;

    &:hover {
      background-color: #FDD835;
      color: white;
      border-radius: 50%;
    }
  }

  .react-datepicker__day--selected {
    background-color: #212121;
    border-radius: 50%;
    color: white;

    &:hover {
      background-color: #424242;
      color: white;
    }
  }

  .react-datepicker__day--highlighted.react-datepicker__day--selected {
    background-color: #212121;
    color: white;

    &:hover {
      background-color: #424242;
      color: white;
    }
  }
`;
