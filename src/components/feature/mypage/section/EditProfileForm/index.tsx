import { Button } from '@/components/common/Button';
import CommonContainer from '@/components/common/layouts/Container';
import styled from '@emotion/styled';
// import { useState } from 'react';

type Props = {
  nickname: string;
  setNickname: (e: string) => void;
  bio: string;
  setBio: (e: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const EditProfileForm = ({
  onSubmit,
  nickname,
  setNickname,
  bio,
  setBio,
}: Props) => {
  return (
    <Form onSubmit={onSubmit}>
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
        <Button size="medium" theme="lightgray" type="submit">
          프로필 수정하기
        </Button>
      </CommonContainer>
    </Form>
  );
};

export default EditProfileForm;

const Form = styled.form`
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
