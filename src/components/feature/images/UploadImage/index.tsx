import { Button } from '@/components/common/Button';
import CommonImage from '@/components/common/Image';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import defaultImage from '@/assets/defaultImage.png';

// type UploadType = 'MEMBER' | 'FEED' | 'CHALLENGE' | 'CHALLENGE_VERIFICATION';

type Props = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  preview: string;
  setPreview: React.Dispatch<React.SetStateAction<string>>;
};

const UploadImage = ({ setFile, preview, setPreview }: Props) => {
  const uploadImage = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!preview) {
      setPreview(defaultImage);
    }
  }, [setPreview, preview]);

  const handleUpload = () => {
    uploadImage.current?.click();
  };

  const handleDelete = () => {
    setPreview(defaultImage);
    setFile(null);
  };

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setPreview(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  return (
    <Wrapper>
      <ImageContainer>
        <CommonImage
          src={preview}
          ratio="square"
          style={{
            border: 'none',
            objectFit: 'cover',
            borderRadius: '5px',
            width: '100%',
            maxWidth: '100%',
          }}
        />
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={uploadImage}
          onChange={handlePreview}
        />
      </ImageContainer>
      <ButtonContainer>
        <Button
          onClick={handleUpload}
          size={'medium'}
          theme={'outline'}
          style={{ width: '150px' }}
          type="button"
        >
          이미지 업로드
        </Button>
        <Button
          onClick={handleDelete}
          size={'medium'}
          theme={'outline'}
          style={{ width: '150px' }}
          type="button"
        >
          이미지 삭제
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.section`
  width: 100%;
  object-fit: fill;
`;

const ButtonContainer = styled.div`
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;
export default UploadImage;
