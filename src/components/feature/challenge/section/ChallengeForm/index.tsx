import React, { useState,useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import instance from '@/api/instance';
import { ko } from 'date-fns/locale';

type Props = {
  imageKey: string;
  setIsModalOpen: (visible: boolean) => void;
};

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const ChallengeForm = ({imageKey, setIsModalOpen}:Props) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageKey: '',
    type: '',
    minimumEntryFee: 0,
    maxHeadcount: 0,
    minHeadcount: 0,
    challengeStartDate: tomorrow,
    challengeEndDate: tomorrow,
    recruitmentStartDate: tomorrow,
    recruitmentEndDate: tomorrow,
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      imageKey: imageKey,
    }));
  }, [imageKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date, name: string) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        challengeStartDate: format(formData.challengeStartDate, "yyyy-MM-dd'T'00:00:00"),
        challengeEndDate: format(formData.challengeEndDate, "yyyy-MM-dd'T'23:59:59"),
        recruitmentStartDate: format(formData.recruitmentStartDate, "yyyy-MM-dd'T'00:00:00"),
        recruitmentEndDate: format(formData.recruitmentEndDate, "yyyy-MM-dd'T'23:59:59"),
      };
      console.log('Response:',formattedData);
      const response = await instance.post('/api/challenges', formattedData);
      console.log('Response:', response.data);
      setIsModalOpen(false);
      alert('챌린지가 생성되었습니다.')

    } catch (error) {
      console.error('Error sending form data:', error.response ? error.response.data : error.message);
      alert('챌린지가 생성 실패.')

    }
  };

  return (
    <StyledFormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <InputField>
          <label>제목:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </InputField>
        <InputField>
          <label>유형:</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">챌린지 유형을 선택하세요.</option>
            <option value="DAILY_READING">매일매일 책 읽기</option>
            <option value="DAILY_WRITING">좋은 글쓰기</option>
            <option value="CHALLENGE3">기타</option>
          </select>
        </InputField>
        <InputField>
          <label>소개:</label>
          <textarea name="content" 
          value={formData.content} 
          onChange={handleChange} required 
          placeholder="챌린지에 대한 소개를 입력하세요."
          />
        </InputField>
        <CountField>
          <label>최대 인원:</label>
          <input 
          type="number" 
          name="maxHeadcount" 
          // value={formData.maxHeadcount} 
          onChange={handleChange} 
          required 
          />
        </CountField>
        <CountField>
          <label>최소 인원:</label>
          <input 
          type="number" 
          name="minHeadcount" 
          onChange={handleChange} 
          placeholder='최소 인원은 1명 입니다'
          required 
          />
        </CountField>
        <FeeField>
          <label>최소 참여비:</label>
          <input 
          type="number" 
          name="minimumEntryFee" 
          onChange={handleChange} 
          required 
          placeholder='0원보다 큰 금액을 작성하세요'
          />
        </FeeField>
        <DateField>
          <label>모집 기간:</label>
          <DatePicker
            selected={formData.recruitmentStartDate}
            onChange={(date) => handleDateChange(date as Date, 'recruitmentStartDate')}
            dateFormat="yyyy-MM-dd"
            locale={ko}
            minDate={tomorrow} 
          />
          <p>~</p>
          <DatePicker
            selected={formData.recruitmentEndDate}
            onChange={(date) => handleDateChange(date as Date, 'recruitmentEndDate')}
            dateFormat="yyyy-MM-dd"
            locale={ko}
          />
        </DateField>
        <DateField>
          <label>진행 기간:</label>
          <DatePicker
            selected={formData.challengeStartDate}
            onChange={(date) => handleDateChange(date as Date, 'challengeStartDate')}
            dateFormat="yyyy-MM-dd"
            locale={ko}
          />
          <p>~</p>
          <DatePicker
            selected={formData.challengeEndDate}
            onChange={(date) => handleDateChange(date as Date, 'challengeEndDate')}
            dateFormat="yyyy-MM-dd"
            locale={ko}
          />
        </DateField>
        <SubmitButton type="submit">챌린지 생성하기</SubmitButton>
      </StyledForm>
    </StyledFormContainer>
  );
};

export default ChallengeForm;

const StyledFormContainer = styled.div`
  width: 80%;
  height: 100%; 
  overflow-y: auto; 
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  label {
    font-weight: bold;
    margin-right: 2rem;
  }
  input,
  select,
  textarea {
   padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
`;

const InputField = styled.div`
  display: flex;
  flex-direction: row;
  label {
    font-weight: bold;
     margin-right: 2rem;
  }
  input{
    width: 80%;
  }
  textarea{
   width: 80%;
  }
`;

const CountField = styled.div`
  display: flex;
  flex-direction: row;
    input{
    width: 50%;
  }
`
const FeeField = styled.div`
  display: flex;
  flex-direction: row;
  input{
    width: 50%;
  }
  label {
    font-weight: bold;
    margin-right: 1rem;
  }
`

const DateField = styled.div`
  display: flex;
  flex-direction: row;
  p {
    width: 5%;
    text-align: center; 
  }
  .react-datepicker-wrapper {
    width: 20%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    border-radius: 4px;
  }

`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0 auto;
  margin-top: 2rem;
  &:hover {
    background-color: #0056b3;
  }
`;
