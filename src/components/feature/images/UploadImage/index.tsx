import { Button } from '@/components/common/Button';
import CommonImage from '@/components/common/Image';
import styled from '@emotion/styled';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';

type Props = {
  accessToken: string;
  setImageKey: React.Dispatch<React.SetStateAction<string>>;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UploadImage = ({ accessToken, setImageKey }: Props) => {
  const [preview, setPreview] = useState(Object);
  const uploadImage = useRef<HTMLInputElement | null>(null);
  // const [presignedUrl, setPresignedUrl] = useState([]);
  const [presignedUrl, setPresignedUrl] = useState('');
  const [file, setFile] = useState([]);

  useEffect(() => {
    if (presignedUrl && file) {
      const extension = file.name.split('.').pop().toLowerCase();
      async function putS3() {
        try {
          await axios
            .put(presignedUrl, file, {
              headers: {
                'Content-Type': `image/${extension}`,
              },
            })
            .then((res) => {
              alert('데이터가 성공적으로 들어갔습니다.');
              console.log(res);
            });
        } catch (e: any) {
          console.log(e);
        }
      }
      putS3();
    }
  }, [presignedUrl]);

  const handleUpload = () => {
    uploadImage.current?.click();
  };

  const handlePreview = (e: any) => {
    if (uploadImage.current?.files != null) {
      setPreview(URL.createObjectURL(uploadImage.current?.files[0]));
    }
    const fileName = e.target.files[0].name;
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    async function getS3() {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/s3/urls/upload?type=FEED&filename=${fileName}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const result = await res.data;
        setPresignedUrl(result.presignedUrl);
        setImageKey(result.key);
      } catch (e) {
        console.log(e);
      }
    }
    getS3();
  };

  const handleDelete = () => {
    setPreview('');
  };

  return (
    <Wrapper>
      <ImageContainer>
        <CommonImage
          src={preview}
          ratio="square"
          style={{
            border: '1px solid',
            objectFit: 'cover',
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
          theme={'lightgray'}
          style={{ width: '150px' }}
          type="button"
        >
          이미지 업로드
        </Button>
        <Button
          onClick={handleDelete}
          size={'medium'}
          theme={'lightgray'}
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
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.section`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const ButtonContainer = styled.div`
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

export default UploadImage;
