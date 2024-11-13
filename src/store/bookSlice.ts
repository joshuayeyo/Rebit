import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookState {
  selectedBook: {
    id: number;
    isbn: string;
    cover: string;
    title: string;
    author: string;
    pubDate: string;
  } | null;
}

const initialState: BookState = {
  selectedBook: JSON.parse(localStorage.getItem('selectedBook') || 'null'),
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    selectBook(state, action: PayloadAction<BookState['selectedBook']>) {
      state.selectedBook = action.payload;
      // localStorage에 책 정보 저장
      localStorage.setItem('selectedBook', JSON.stringify(action.payload));
    },
  },
});

export const { selectBook } = bookSlice.actions;
export default bookSlice.reducer;
