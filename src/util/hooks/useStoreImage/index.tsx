import instance from '@/api/instance';
import axios from 'axios';
import { useState } from 'react';

type UploadType = 'MEMBER' | 'FEED' | 'CHALLENGE' | 'CHALLENGE_VERIFICATION';

type Props = {
  type: UploadType;
};

export const useStoreImage = ({ type }: Props) => {
  const [imageKey, setImageKey] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage2S3 = async (file: File) => {
    if (isUploading) return;
    setIsUploading(true);
    try {
      const fileName = file.name;
      const res = await instance.get(
        `api/s3/urls/upload?type=${type}&filename=${fileName}`,
      );
      const { presignedUrl, key } = res.data;
      setImageKey(key);

      const extension = file.name.split('.').pop()?.toLowerCase();
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': `image/${extension}`,
        },
      });
      return key;
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  return { imageKey, uploadImage2S3 };
};
