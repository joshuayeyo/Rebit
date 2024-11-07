import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { eachDayOfInterval, isWithinInterval } from 'date-fns';
import styled from '@emotion/styled';

const Verification = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isInRange, setIsInRange] = useState<boolean>(false);

  const highlightStart = new Date(2024, 10, 7);
  const highlightEnd = new Date(2024, 10, 15);
  const highlightedDates = eachDayOfInterval({ start: highlightStart, end: highlightEnd });

  useEffect(() => {
    if (selectedDate) {
      setIsInRange(
        isWithinInterval(selectedDate, { start: highlightStart, end: highlightEnd })
      );
    } else {
      setIsInRange(false);
    }
  }, [selectedDate, highlightStart, highlightEnd]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <Wrapper>
      <DatePickerWrapper isInRange={isInRange}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          locale={ko}
          inline
          highlightDates={highlightedDates}
        />
      </DatePickerWrapper>
    </Wrapper>
  );
};

export default Verification;

const Wrapper = styled.section`
  height: 100vh;
  background-color: white;
`;

const DatePickerWrapper = styled.div<{ isInRange: boolean }>`
  width: 20%;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;

  .react-datepicker {
    width: 100%;
    font-size: 1rem;
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  .react-datepicker__day--highlighted {
    background-color: #FFEB3B;
    border-radius: 50%;
    color: white;

    &:hover {
      background-color: #FDD835;
      color: white;
      border-radius: 50%;
    }
  }

  .react-datepicker__day--selected {
    background-color: #212121;
    border-radius: 50%;
    color: white;

    &:hover {
      background-color: #424242;
      color: white;
    }
  }

  .react-datepicker__day--highlighted.react-datepicker__day--selected {
    background-color: #212121;
    color: white;

    &:hover {
      background-color: #424242;
      color: white;
    }
  }
`;
