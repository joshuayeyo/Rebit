import {
  addMonths,
  addYears,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subMonths,
  subYears,
} from 'date-fns';
import { useState, useEffect } from 'react';
import CommonHeader from '@/components/common/Header';
import styled from '@emotion/styled';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Button } from '@/components/common/Button';
import PostBookDiaryModal from '@/components/feature/modals/bookdiary/PostDiary';
import DiaryDetailModal from '../../modals/bookdiary/ContentDetail';
import instance from '@/api/instance';
import { DiaryData } from '@/types';

const DiaryCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedID, setSelectedID] = useState<number | null>(null);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<DiaryData[]>([]);

  const startCurrentMonth = startOfMonth(currentDate);
  const endCurrentMonth = endOfMonth(currentDate);
  const startOfFirstWeek = startOfWeek(startCurrentMonth, { weekStartsOn: 0 });
  const endOfLastWeek = endOfWeek(endCurrentMonth, { weekStartsOn: 0 });
  const days = eachDayOfInterval({
    start: startOfFirstWeek,
    end: endOfLastWeek,
  });

  useEffect(() => {
    const fetchDiaryData = async () => {
      try {
        const response = await instance.get('api/diaries', {
          params: { date: filterDate },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching diary data:', error);
        setData([]);
      }
    };

    fetchDiaryData();
  }, [currentDate, selectedDate]);

  const today = format(new Date(), 'yyyy-MM-dd');

  const formatDays = days.map((day) => ({
    date: format(day, 'yyyy-MM-dd'),
    year: format(day, 'yyyy'),
    month: format(day, 'MM'),
    day: format(day, 'd'),
    isToday: format(day, 'yyyy-MM-dd') === today,
  }));

  const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevYear = () =>
    setCurrentDate((prevDate) => subYears(prevDate, 1));
  const handleNextYear = () =>
    setCurrentDate((prevDate) => addYears(prevDate, 1));
  const handlePrevMonth = () =>
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  const handleNextMonth = () =>
    setCurrentDate((prevDate) => addMonths(prevDate, 1));

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
  };

  const handlePostModalOpen = () => setIsPostModalOpen(true);
  const handlePostModalClose = () => setIsPostModalOpen(false);

  const handleViewModalOpen = (id: number, date: string) => {
    setSelectedID(id);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleViewModalClose = () => setIsModalOpen(false);

  const formatCurrentMonth = format(currentDate, 'MMMM yyyy');
  const filterDate = format(new Date(currentDate.setDate(1)), 'yyyy-MM-dd');

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
          {formatDays.map((date, index) => {
            const diaryEntry = data.find((entry) => entry.date === date.date);

            return (
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
                  {diaryEntry ? (
                    <Image
                      src={diaryEntry.book.cover}
                      alt="일기 이미지"
                      width={50}
                      height={50}
                      onClick={() =>
                        handleViewModalOpen(diaryEntry.id, date.date)
                      }
                      style={{ cursor: 'pointer' }}
                    />
                  ) : (
                    hoveredDate === date.date && (
                      <Button
                        theme="outline"
                        size="medium"
                        onClick={handlePostModalOpen}
                      >
                        일기쓰기
                      </Button>
                    )
                  )}
                </ImageContainer>
              </Day>
            );
          })}
        </Grid>
      </CalendarContainer>
      <Footer />
      {isPostModalOpen && (
        <PostBookDiaryModal
          isModalOpen={isPostModalOpen}
          handleModalClose={handlePostModalClose}
          selectedDate={selectedDate}
        />
      )}
      {isModalOpen && selectedID && selectedDate && (
        <DiaryDetailModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          handleModalClose={handleViewModalClose}
          id={selectedID}
          selectedDate={selectedDate}
        />
      )}
    </>
  );
};

export default DiaryCalendar;

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

const Day = styled.div<{
  $isCurrentMonth: boolean;
  $isSelected: boolean;
  isSunday: boolean;
  isToday: boolean;
}>`
  position: relative;
  text-align: center;
  padding: 1rem 0;
  font-size: 1.4rem;
  height: 15rem;
  color: ${({ $isCurrentMonth, isSunday }) =>
    isSunday ? 'red' : $isCurrentMonth ? '#000' : '#aaa'};
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: ${({ isToday }) => (isToday ? '#d3e4ff' : 'transparent')};
  cursor: pointer;
  &:hover {
    background-color: #e9e9e9;
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

const Image = styled.img`
  height: 11rem;
  width: 9rem;
  object-fit: cover;
  margin-top: 7.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.3);
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 100px;
`;
