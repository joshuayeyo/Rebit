import instance from '@/api/instance';
import { Button } from '@/components/common/Button';
import CommonContainer from '@/components/common/layouts/Container';
import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';

type Props = {
  imageKey: string;
};

const EditProfileForm = ({ imageKey }: Props) => {
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await instance.put(`api/members/me`, {
        imageKey,
        nickname,
        bio,
      });
      console.log(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <Wrapper>
      <CommonContainer
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <NickNameField>
          <FormLabel>닉네임: </FormLabel>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
          />
        </NickNameField>
        <BioField>
          <FormLabel>바이오</FormLabel>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="바이오를 입력하세요"
          />
        </BioField>
        <Button size="medium" theme="lightgray" onClick={handleSubmit}>
          프로필 수정하기
        </Button>
      </CommonContainer>
    </Wrapper>
  );
};

export default EditProfileForm;

const Wrapper = styled.div`
  width: 80%;
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormLabel = styled.span`
  margin-right: 1rem;
`;

const NickNameField = styled.div`
  height: 3rem;
  display: flex;
  font-size: 1rem;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  input {
    width: 70%;
  }
`;

const BioField = styled.div`
  height: 2rem;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  input {
    width: 70%;
  }
`;
