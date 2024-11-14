export type BookData = {
  id: number;
  isbn: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  publisher: string;
  pubDate: string;
  link: string;
  topFullReview: string;
};

export type ReviewData = {
  briefReviewAuthorImage: string;
  briefReviewAuthor: string;
  briefReview: string;
};

export type FeedData = {
  presignedUrl: string;
  author: AuthorData;
  content: string;
  book: BookData;
  briefReview: string;
  fullReview: string;
  likes: number;
  isLiked: boolean;
  type: string;
};
export type DiaryData = {
  id:number;
  content: string;
  book: BookData;
  date:string;
  isbn: string;
};


export type AuthorData = {
  nickname: string;
  presignedUrl: string;
};

export type UserData = {
  id: number;
  nickname: string;
  imageKey: string;
  presignedUrl: string;
  bio: string;
  email: string;
  role: 'ROLE_USER';
  point: number;
};

export type ChallengeData = {
  id: number;
  creator: {
    id: number;
    nickname: string;
    imageKey: string;
    prsignedUrl: string;
  };
  title: string;
  content: string;
  imageKey: string;
  presignedUrl: string;
  type: 'DAILY_WRITING' | 'OTHER_TYPES';
  minimumEntryFee: number;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  challengeStartDate: string;
  challengeEndDate: string;
  minHeadcount: number;
  maxHeadcount: number;
  createdAt: string;
  currentHeadcount: number;
  totalEntryFee: number;
};

export type VerificationData = {
  id: number;
  participationId: number;
  author: {
    id: number;
    nickname: string;
    imageKey: string;
    presignedUrl: string;
  };
  title: string;
  imageKey: string;
  presignedUrl: string;
  content: string;
  createdAt: string;
};

export type Participant = {
  participationId: number;
  memberId: number;
  nickname: string;
  imageKey: string;
  presignedUrl: string;
  participatedAt: string;
  entryFee: number;
};

export type FilterType =
  | 'RECRUITING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'UPCOMING'
  | 'ALL';
