import CommonImage from "@/components/common/Image";
import CommonContainer from "@/components/common/layouts/Container";
import styled from "@emotion/styled";
import PointLogo from "@/assets/Mypage/point.svg?react"

type Props = {
    nickname: string;
    imageUrl?: string;
    bio?: string;
    points?: number;
}

const UserInfo = ({ nickname, imageUrl, bio, points }: Props) => {

    const handleEditProfileButton = () => {
        alert("프로필을 수정합니다!")
    }

    const handleReloadPoints = () => {
        alert("포인트를 충전합니다!")
    }

    const pointsValue = (points?: number) => {
        if (points && points > 99999) {
            return "+99999";
        }
        return points !== undefined ? points.toString() : "0";
        };
    

    return (
        <Wrapper>
            <CommonContainer
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                style={{ height: "100%" }}
            >
                <ProfileImage>
                    <CommonImage 
                        src={imageUrl}
                        ratio="square"
                        radius="circle"
                        style={{ width: "60%", maxWidth: "80%" }}
                    />
                </ProfileImage>
                <CommonContainer
                    flexDirection="column"
                    alignItems="flex-start"
                >
                    <Username>
                        {nickname}
                    </Username>
                    <Userbio>
                        {bio ? bio : "바이오가 없습니다."} 
                    </Userbio>
                    <EditButton onClick={handleEditProfileButton}>
                        Edit Profile
                    </EditButton>
                </CommonContainer>
                <CommonContainer
                    flexDirection="column"
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    style={{ marginLeft: "auto" }}
                >
                    <UnknownSection>
                        <CommonContainer
                        flexDirection="column"
                        style={{ color: 'white', fontSize: '40px', fontWeight: 'bold' }}
                        >
                            #17 Challenges
                            <br/>
                            #32 Feeds
                            <br/>
                            #102 Diaries
                        </CommonContainer>
                        <PointContainer>
                            <PointInfo>
                                <PointLogoContainer>
                                    <PointLogo />                           
                                </PointLogoContainer>
                                <PointAccount>
                                    {pointsValue(points)}
                                </PointAccount>
                            </PointInfo>
                            <button onClick={handleReloadPoints} style={{ color: 'white', fontSize: '18px', textDecoration: 'underline' }}>포인트 충전하기</button>
                        </PointContainer>
                    </UnknownSection>
                </CommonContainer>
            </CommonContainer>
        </Wrapper>
    )
}

export default UserInfo;

const Wrapper = styled.section`
    width: 100%;
    margin-top: 2rem;
    height: 30vh;
    min-height: 10vh;
    background-color: green;
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
    color: white;
    font-size: 1.5rem;
`;

const EditButton = styled.button`
    cursor: pointer;
`

const UnknownSection = styled.div`
    width: auto;
    padding: 2rem;
`

const PointContainer = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 1rem;
`

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

`

const PointLogoContainer = styled.div`
    justify-content: flex-start; 
`

const PointAccount = styled.div`
    justify-content: flex-end;
    overflow: scroll;
    margin-left: auto;
    padding-right: 1rem;
`