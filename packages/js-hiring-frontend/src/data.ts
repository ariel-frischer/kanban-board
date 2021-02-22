import finnImg from "./static/media/finn-min.png";
import bmoImg from "./static/media/bmo-min.png";
import princessImg from "./static/media/princess-min.png";
import jakeImg from "./static/media/jake-min.png";
import { colors } from "@material-ui/core";
import { Author, Quote, QuoteMap } from "./types";

const jake: Author = {
  id: "1",
  name: "Jake",
  url: "http://adventuretime.wikia.com/wiki/Jake",
  avatarUrl: jakeImg,
  colors: {
    soft: colors.yellow[50],
    hard: colors.amber[50],
  },
};

const BMO: Author = {
  id: "2",
  name: "BMO",
  url: "http://adventuretime.wikia.com/wiki/BMO",
  avatarUrl: bmoImg,
  colors: {
    soft: colors.green[50],
    hard: colors.green[500],
  },
};

const finn: Author = {
  id: "3",
  name: "Finn",
  url: "http://adventuretime.wikia.com/wiki/Finn",
  avatarUrl: finnImg,
  colors: {
    soft: colors.blue[50],
    hard: colors.blue[500],
  },
};

const princess: Author = {
  id: "4",
  name: "Princess bubblegum",
  url: "http://adventuretime.wikia.com/wiki/Princess_Bubblegum",
  avatarUrl: princessImg,
  colors: {
    soft: colors.pink[50],
    hard: colors.pink[200],
  },
};

export const authors: Author[] = [jake, BMO, finn, princess];
export const statuses: string[] = ["Ready", "InProgress", "QA", "Complete"];
export enum STATUS {
  READY = "READY",
  IN_PROGRESS = "IN_PROGRESS",
  QA = "QA",
  COMPLETE = "COMPLETE",
}

export const quotes: Quote[] = [
  {
    id: "1",
    title: "Title1",
    status: STATUS.READY,
    description: "Sometimes life is scary and dark",
    author: BMO,
  },
  {
    id: "2",
    title: "Title2",
    status: STATUS.COMPLETE,
    description:
      "Sucking at something is the first step towards being sorta good at something.",
    author: jake,
  },
  {
    id: "3",
    title: "Title3",
    status: STATUS.IN_PROGRESS,
    description: "You got to focus on what's real, man",
    author: jake,
  },
  {
    id: "4",
    title: "Title4",
    status: STATUS.QA,
    description: "Is that where creativity comes from? From sad biz?",
    author: finn,
  },
  {
    id: "5",
    title: "Title5",
    status: STATUS.READY,
    description: "Homies help homies. Always",
    author: finn,
  },
  {
    id: "6",
    title: "Title1",
    status: STATUS.COMPLETE,
    description: "Responsibility demands sacrifice",
    author: princess,
  },
  {
    id: "7",
    title: "Title6",
    status: STATUS.IN_PROGRESS,
    description:
      "That's it! The answer was so simple, I was too smart to see it!",
    author: princess,
  },
  {
    id: "8",
    title: "Title7",
    status: STATUS.COMPLETE,
    description:
      "People make mistakes. It's all a part of growing up and you never really stop growing",
    author: finn,
  },
  {
    id: "9",
    title: "Title8",
    status: STATUS.READY,
    description:
      "Don't you always call sweatpants 'give up on life pants,' Jake?",
    author: finn,
  },
  {
    id: "10",
    title: "Title9",
    status: STATUS.IN_PROGRESS,
    description: "I should not have drunk that much tea!",
    author: princess,
  },
  {
    id: "11",
    title: "Title10",
    status: STATUS.READY,
    description: "Please! I need the real you!",
    author: princess,
  },
  {
    id: "12",
    title: "Title11",
    status: STATUS.COMPLETE,
    description: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
    author: princess,
  },
];

// So we do not have any clashes with our hardcoded ones
let idCount: number = quotes.length + 1;

export const getQuotes = (count: number): Quote[] =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: Quote = quotes[Math.floor(Math.random() * quotes.length)];

    const custom: Quote = {
      ...random,
      id: `G${idCount++}`,
    };

    return custom;
  });

export const getAuthors = (count: number): Author[] =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: Author = authors[Math.floor(Math.random() * authors.length)];

    const custom: Author = {
      ...random,
      id: `author-${idCount++}`,
    };

    return custom;
  });

const getByAuthor = (author: Author, items: Quote[]): Quote[] =>
  items.filter((quote: Quote) => quote.author === author);

export const authorQuoteMap: QuoteMap = authors.reduce(
  (previous: QuoteMap, author: Author) => ({
    ...previous,
    [author.name]: getByAuthor(author, quotes),
  }),
  {}
);

export const generateQuoteMap = (quoteCount: number): QuoteMap =>
  authors.reduce(
    (previous: QuoteMap, author: Author) => ({
      ...previous,
      [author.name]: getQuotes(quoteCount / authors.length),
    }),
    {}
  );
