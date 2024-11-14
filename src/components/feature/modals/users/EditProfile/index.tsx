import instance from '@/api/instance';
import CommonModal from '@/components/common/Modal';
import UploadImage from '@/components/feature/images/UploadImage';
import EditProfileForm from '@/components/feature/mypage/section/EditProfileForm';
import { useStoreImage } from '@/util/hooks/useStoreImage';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

type Props = {
  isModalOpen: boolean;
  handleModalClose: () => void;
};

const EditProfileModal = ({ isModalOpen, handleModalClose }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [imageKey, setImageKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [bio, setBio] = useState('')
  const [nickname, setNickname] = useState('')
  
  const { uploadImage2S3 } = useStoreImage({ type: 'MEMBER' });

  useEffect(() => {
      const fetchProfileData = async () => {
          try {
              const response = await instance.get("/api/members/me");
              const { presignedUrl, imageKey, nickname, bio } = response.data;
              setPreview(presignedUrl)
              setImageKey(imageKey || null);
              setNickname(nickname || null);
              setBio(bio || null);
          } catch (error) {
              console.log(error);
          } finally {
              setLoading(false);
          }
      };
      if (isModalOpen) {
          fetchProfileData();
      }
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let updatedImageKey = imageKey;

    if (file) {
      updatedImageKey = await uploadImage2S3(file);
    }

    const updatedData = {
      imageKey: updatedImageKey,
      nickname: nickname,
      bio: bio,
    }


    if (!isUploading && imageKey) {
      setIsUploading(true); // 업로드 상태 변경
      try {
        await instance.put('/api/members/me', updatedData);
        setIsUploading(false);
        window.location.reload();
      } catch (error) {
        setIsUploading(false);
        console.log(error);
      }
    }
  };

  if (loading) return null;

  return (
    <CommonModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
      <Wrapper>
        <ImageContainer>
          <UploadImage setFile={setFile} preview={preview} setPreview={setPreview} />
        </ImageContainer>
        <FormContainer>
          <EditProfileForm 
            nickname={nickname}
            setNickname={setNickname}
            bio={bio}
            setBio={setBio}
            onSubmit={handleSubmit}
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
