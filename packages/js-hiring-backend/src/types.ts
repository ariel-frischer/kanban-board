import { IQuote } from "./model/quotes";

// export type ParsedQuote = {
//   description: string;
//   title: string;
//   status: string;
//   _id?: string;
// };

export type Id = string;

export type AuthorColors = {
  soft: string;
  hard: string;
};

export type Author = {
  id: Id;
  name: string;
  avatarUrl: string;
  url: string;
  colors: AuthorColors;
};


// export type Quote = {
//   id: Id;
//   description: string;
//   title: string;
//   status: string;
//   author: Author;
//   _id?: string;
// };


export type QuoteMap = {
  [key: string]: IQuote[];
};

export type Task = {
  id: Id;
  content: string;
};

export enum STATUS {
  READY = "READY",
  IN_PROGRESS = "IN_PROGRESS",
  QA = "QA",
  COMPLETE = "COMPLETE",
}

export const statuses: STATUS[] = Object.values(STATUS);