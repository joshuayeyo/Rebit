import styled from '@emotion/styled';
import { ChallengeData, UserData } from '@/types';
import { useAuth } from '@/provider/Auth';
import instance from '@/api/instance';
import { useState } from 'react';
import axios from 'axios';
import { IoIosHeartEmpty } from 'react-icons/io';

type ChallengeProps = {
  challengeData: ChallengeData | null;
  userData: UserData | null;
  filter: string | null;
};

const Contents = ({ challengeData, filter, userData }: ChallengeProps) => {
  const { isLogin } = useAuth();
  const [entryFee, setEntryFee] = useState<number>(0);
  const userPoint = userData?.point !== undefined ? userData.point : 0;

  function formatDate(date: string | null | undefined): string {
    if (!date) return '';

    const dateObject = new Date(date);
    return dateObject.toISOString().split('T')[0].replace(/-/g, '/');
  }
  const recruitmentStartDate = formatDate(challengeData?.recruitmentStartDate);
  const recruitmentEndDate = formatDate(challengeData?.recruitmentEndDate);
  const challengeStartDate = formatDate(challengeData?.challengeStartDate);
  const challengeEndDate = formatDate(challengeData?.challengeEndDate);

  const isValidEntryFee = (fee: number): boolean => {
    return fee > 0 && fee <= 1000000 && userPoint !== null && fee <= userPoint;
  };

  const handleSubmit = () => {
    if (!isValidEntryFee(entryFee)) {
      alert(
        `유효한 참가비를 입력하세요. 참가비는 1원 이상 1,000,000원 이하이고, 보유 포인트 이하여야 합니다. 보유 포인트는 ${userPoint} 입니다.`
      );
      window.location.reload();
      return;
    }

    if (filter === 'UPCOMING') {
      alert('아직 모집기간이 아닙니다.');
    } else if (filter === 'RECRUITING') {
      if (!isLogin) {
        alert('챌린지 참가 신청을 위해 로그인이 필요합니다.');
      } else {
        async function getFeedData() {
          try {
            const res = await instance.post(
              `/api/challenges/${challengeData?.id}/participations`,
              {
                entryFee: entryFee,
              },
            );
            console.log(res);
            alert('참가 신청이 완료되었습니다.');
          } catch (error) {
            if (axios.isAxiosError(error)) {
              const errorMessage =
                error.response?.data?.message ||
                '알 수 없는 오류가 발생했습니다.';
              console.error('Error message:', errorMessage);
              alert(errorMessage);
            }
          }
        }
        getFeedData();
      }
    }
  };

  return (
    <Wrapper>
      <TagWrapper>
        <TiTleTag>Challenge</TiTleTag>
        <TiTleTag>#{challengeData?.type}</TiTleTag>
      </TagWrapper>
      <Title>{challengeData?.title}</Title>
      <TagWrapper>
        <DateTag>recruitment : </DateTag>
        <DateTag>
          {recruitmentStartDate}~{recruitmentEndDate}
        </DateTag>
      </TagWrapper>
      <TagWrapper>
        <DateTag>challenge progress : </DateTag>
        <DateTag>
          {challengeStartDate}~{challengeEndDate}
        </DateTag>
      </TagWrapper>
      <DesCriptWrapper>
        <Content>{challengeData?.content}</Content>
        <ContentDetail>
          ✓최소 참여비는 {challengeData?.minimumEntryFee}원입니다
          <br />
          ✓챌린지 진행 일자부터 매일 인증글을 올리는 방식으로, 챌린지를 성공한
          참여자에게는
          <br />
          (총 참여비/ 참여자 수)로 상금이 배분됩니다{' '}
        </ContentDetail>
      </DesCriptWrapper>
      {filter === 'IN_PROGRESS' ? (
        <FeeWrapper>
          <Content>
            <> 총 상금 : ₩{challengeData?.totalEntryFee}</>
          </Content>
        </FeeWrapper>
      ) : (
        <>
          <FeeWrapper>
            <Content>
              Entry fee
              <FeeBox
                placeholder="참가비를 입력하세요"
                value={entryFee}
                onChange={(e) => setEntryFee(Number(e.target.value))}
              ></FeeBox>
              ₩
            </Content>
          </FeeWrapper>
          <ButtonWrapper>
            <CountWrapper>
              {challengeData?.currentHeadcount}/{challengeData?.maxHeadcount}
            </CountWrapper>
            <SubmitButton type="submit" onClick={handleSubmit}>
              챌린지 참가하기
            </SubmitButton>
            <IoIosHeartEmpty size="2rem" color="white" />
          </ButtonWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Contents;

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }
`;
const Title = styled.div`
  margin-top: 40px;
  color: white;
  font-size: 3rem;
  font-weight: bold;
  text-decoration: underline 3px solid white;
`;
const TagWrapper = styled.div`
  width: 100%;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: bold;
`;

const TiTleTag = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;
const DateTag = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const DesCriptWrapper = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  margin-top: 40px;
  border-radius: 10px;
  color: black;
  font-size: 3rem;
  font-weight: bold;
  text-decoration: underline 3px solid white;
`;

const FeeWrapper = styled.div`
  width: 100%;
  height: 10vh;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  margin-top: 40px;
  border-radius: 10px;
  color: black;
  font-size: 3rem;
  font-weight: bold;
`;

const Content = styled.div`
  padding: 0;
  color: black;
  font-size: 2rem;
  padding: 20px;
`;

const ContentDetail = styled.div`
  padding: 0;
  color: black;
  font-size: 1rem;
  padding: 20px;
`;

const FeeBox = styled.input`
  width: 60%;
  font-size: 2rem;
  font-weight: bold;
  margin: 10px;
  border-radius: 10px;
  background-color: white;
  text-align: center;

  ::placeholder {
    font-size: 1rem;
    color: gray;
    text-align: center;
  }
`;

const CountWrapper = styled.div`
  margin-right: 2rem;
  font-weight: bold;
  font-size: 2rem;
  color:white;
`;


const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: black;
  font-weight: bold;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 60%;
  &:active {
    transform: scale(0.98);
  }
`;
