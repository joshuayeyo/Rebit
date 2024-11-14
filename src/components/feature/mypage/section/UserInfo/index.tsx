import CommonImage from '@/components/common/Image';
import CommonContainer from '@/components/common/layouts/Container';
import styled from '@emotion/styled';
import PointLogo from '@/assets/Mypage/point.svg?react';
import { useState } from 'react';
import EditProfileModal from '@/components/feature/modals/users/EditProfile';
import instance from '@/api/instance';

type Props = {
  nickname: string;
  imageUrl?: string;
  bio?: string;
  points?: number;
  coverImageUrl: string;
  challengeCount: number;
  diaryCount: number;
  feedCount: number;
};

const UserInfo = ({ nickname, imageUrl, bio, points, coverImageUrl, challengeCount, diaryCount, feedCount }: Props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  // 모달 열려있을 때, 스크롤 금지, 닫았을 때 다시 스크롤
  if (isEditModalOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  const handleEditProfileButton = () => {
    setIsEditModalOpen(true);
  };

  const handleReloadPoints = async () => {
    const amount = prompt("충전할 금액을 입력하세요:"); // 금액을 입력 받음

    if (amount === null || isNaN(Number(amount)) || Number(amount) <= 0) {
        alert("유효한 금액을 입력해주세요.");
        return;
    }
    try {
        // 포인트 충전 API 요청
        const response = await instance.post("/api/members/points",
          { points: amount }
        );
        alert(`${amount} 원이 충전되었습니다!`);
        console.log(response)
    } catch (error) {
      console.log(error)
    }};


  const pointsValue = () => {
    if (points && points > 99999) {
      return '+99999';
    }
    return points !== undefined ? points.toString() : '0';
  };

  return (
    <Wrapper coverImageUrl={coverImageUrl}>
      <CommonContainer
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ height: '100%' }}
      >
        <ProfileImage>
          <CommonImage
            src={imageUrl}
            ratio="square"
            radius="circle"
            style={{ width: '60%', maxWidth: '80%' }}
          />
        </ProfileImage>
        <CommonContainer flexDirection="column" alignItems="flex-start">
          <Username>{nickname}</Username>
          <Userbio>{bio ? bio : '책을 통해 세상을 보는 독서광'}</Userbio>
          <EditButton onClick={handleEditProfileButton}>
            Edit Profile
          </EditButton>
        </CommonContainer>
        <CommonContainer
          flexDirection="column"
          alignItems="flex-end"
          justifyContent="flex-end"
          style={{ marginLeft: 'auto' }}
        >
          <UnknownSection>
            <CommonContainer
              flexDirection="column"
              style={{ color: 'white', fontSize: '40px', fontWeight: 'bold' }}
            >
              #{challengeCount} Challenges
              <br />
              #{feedCount} Feeds
              <br />
              #{diaryCount} Diaries
            </CommonContainer>
            <PointContainer>
              <PointInfo>
                <PointLogoContainer>
                  <PointLogo />
                </PointLogoContainer>
                <PointAccount>{pointsValue()}</PointAccount>
              </PointInfo>
              <button
                onClick={handleReloadPoints}
                style={{
                  color: 'white',
                  fontSize: '18px',
                  textDecoration: 'underline',
                }}
              >
                포인트 충전하기
              </button>
            </PointContainer>
          </UnknownSection>
        </CommonContainer>
      </CommonContainer>
      {isEditModalOpen && (
        <EditProfileModal
          isModalOpen={isEditModalOpen}
          handleModalClose={handleEditModalClose}
        />
      )}
    </Wrapper>
  );
};

export default UserInfo;

const Wrapper = styled.section<{ coverImageUrl: string }>`
  width: 100%;
  margin-top: 2rem;
  height: 30vh;
  min-height: 10vh;
  background-image: url(${props => props.coverImageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const ProfileImage = styled.div`
  height: auto;
  max-width: 100%;
  padding: 30px;

  @media (max-width: 768px) {
    padding: 20px;
    max-width: 50%;
  }

  @media (max-width: 480px) {
    padding: 10px;
    max-width: 30%;
  }
`;

const Username = styled.text`
  color: white;
  font-size: 3rem;
`;

const Userbio = styled.text`
  color: black;
  font-size: 1.5rem;
`;

const EditButton = styled.button`
  cursor: pointer;
  color-white;
`;

const UnknownSection = styled.div`
  width: auto;
  padding: 2rem;
  background-color: black;
`;

const PointContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1rem;
`;

const PointInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
  opacity: 0.8;
  padding: 0.3rem;
  width: 50%;
`;

const PointLogoContainer = styled.div`
  justify-content: flex-start;
`;

const PointAccount = styled.div`
  justify-content: flex-end;
  overflow: scroll;
  margin-left: auto;
  padding-right: 1rem;
`;
