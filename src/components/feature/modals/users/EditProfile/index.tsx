import instance from '@/api/instance';
import CommonModal from '@/components/common/Modal';
import UploadImage from '@/components/feature/images/UploadImage';
import EditProfileForm from '@/components/feature/mypage/section/EditProfileForm';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
};

const EditProfileModal = ({ isModalOpen, handleModalClose }: Props) => {
  const [imageKey, setImageKey] = useState('');
  const [initialNickname, setInitialNickname] = useState('');
  const [initialBio, setInitialBio] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchProfileData = async () => {
          try {
              const response = await instance.get("/api/members/me");
              const { imageKey, nickname, bio } = response.data;
              console.log(response.data)
              setImageKey(imageKey || null);
              setInitialNickname(nickname || null);
              setInitialBio(bio || null);
          } catch (error) {
              console.error("Error fetching profile data:", error);
          } finally {
              setLoading(false);
          }
      };

      if (isModalOpen) {
          fetchProfileData();
      }
  }, [isModalOpen]);

  if (loading) return null; // 로딩 중일 때 빈 화면을 보여줌

  return (
    <CommonModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
      <Wrapper>
        <ImageContainer>
          <UploadImage setImageKey={setImageKey} type="MEMBER" />
        </ImageContainer>
        <FormContainer>
          <EditProfileForm 
            imageKey={imageKey}
            initialNickname={initialNickname}
            initialBio={initialBio}
          />
        </FormContainer>
      </Wrapper>
    </CommonModal>
  );
};

export default EditProfileModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 2rem);
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const FormContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
