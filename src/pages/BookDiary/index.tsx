import { addMonths, addYears, eachDayOfInterval, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths, subYears } from 'date-fns';
import { useState } from 'react';
import CommonHeader from '@/components/common/Header';
import styled from '@emotion/styled';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Button } from '@/components/common/Button';
import PostBookDiaryModal from '@/components/feature/modals/bookdiary/PostDiary';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startCurrentMonth = startOfMonth(currentDate);
  const endCurrentMonth = endOfMonth(currentDate);

  const startOfFirstWeek = startOfWeek(startCurrentMonth, { weekStartsOn: 0 });
  const endOfLastWeek = endOfWeek(endCurrentMonth, { weekStartsOn: 0 });

  const days = eachDayOfInterval({
    start: startOfFirstWeek,
    end: endOfLastWeek,
  });

  const today = format(new Date(), 'yyyy-MM-dd');
  
  const formatDays = days.map((day) => ({
    date: format(day, 'yyyy-MM-dd'),
    year: format(day, 'yyyy'),
    month: format(day, 'MM'),
    day: format(day, 'd'),
    isToday: format(day, 'yyyy-MM-dd') === today,
  }));

  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevYear = () => {
    setCurrentDate((prevDate) => subYears(prevDate, 1));
  };

  const handleNextYear = () => {
    setCurrentDate((prevDate) => addYears(prevDate, 1));
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const handleDayClick = (date: string) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const formatCurrentMonth = format(currentDate, 'MMMM yyyy');

  return (
    <>
      <CommonHeader />
      <CalendarContainer>
        <Navigation>
          <button onClick={handlePrevYear}>Previous Year</button>
          <button onClick={handleNextYear}>Next Year</button>
        </Navigation>
        <Navigation>
          <ArrowButton onClick={handlePrevMonth}>
            <IoIosArrowBack size={24} />
          </ArrowButton>
          <CurrentMonth>{formatCurrentMonth}</CurrentMonth>
          <ArrowButton onClick={handleNextMonth}>
            <IoIosArrowForward size={24} />
          </ArrowButton>
        </Navigation>
        <Grid>
          {weeks.map((week, index) => (
            <Weekday key={index} isSunday={index === 0}>
              {week}
            </Weekday>
          ))}
          {formatDays.map((date, index) => (
            <Day
              key={index}
              $isCurrentMonth={date.month === format(currentDate, 'MM')}
              $isSelected={selectedDate === date.date}
              isSunday={new Date(date.date).getDay() === 0}
              isToday={date.isToday}
              onMouseEnter={() => setHoveredDate(date.date)}
              onMouseLeave={() => setHoveredDate(null)}
              onClick={() => handleDayClick(date.date)}
            >
              {date.day}
              <ImageContainer>
               {hoveredDate === date.date && (
                  <Button theme='nomal' size='medium' onClick={handleModalOpen}>일기쓰기</Button>
                )}
              </ImageContainer>
            </Day>
          ))}
        </Grid>
      </CalendarContainer>
      {isModalOpen && (
        <PostBookDiaryModal isModalOpen={isModalOpen} handleModalClose={handleModalClose} />
      )}
    </>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CurrentMonth = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  width: 80vw;
`;

const Weekday = styled.div<{ isSunday: boolean }>`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.5rem 0;
  color: ${({ isSunday }) => (isSunday ? 'red' : 'inherit')};
`;

const Day = styled.div<{ $isCurrentMonth: boolean; $isSelected: boolean; isSunday: boolean; isToday: boolean }>`
  position: relative;
  text-align: center;
  padding: 1rem 0;
  font-size: 1.4rem;
  height: 15rem;
  color: ${({ $isCurrentMonth, isSunday }) => 
    isSunday ? 'red' : $isCurrentMonth ? '#000' : '#aaa'};
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: ${({ isToday }) => (isToday ? '#d3e4ff' : 'transparent')}; // 오늘 날짜 배경색
  cursor: pointer;
  &:hover {
    background-color: #BBBBBB;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 50px;
  margin: 0 auto 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;
