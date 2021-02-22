import QuoteDoc, { IQuote } from "./model/quotes";
import {QuoteMap, Author, STATUS, statuses } from "./types";

const getQuoteStatus = (status: STATUS, items: IQuote[]): IQuote[] =>
  items.filter((quote: IQuote) => quote.status === status);


export const createQuoteMap = (quotes:IQuote[]) => {
 const statusQuoteMap: QuoteMap = statuses.reduce(
  (previous: QuoteMap, status: STATUS) => (
    {
    ...previous,
    [status]: getQuoteStatus(status, quotes)
    }),
  {}
);
return statusQuoteMap;
}



// Remove large and unnecessary url data from author in quotes
// export const parseQuoteMap = (quoteMap: QuoteMap) => {
//   const quoteMapArray = Object.values(quoteMap).flat();
//   return quoteMapArray.map((quote) => {
//     return {
//       status: quote.status,
//       description: quote.description,
//       title: quote.title,
//       _id: quote._id,
//     };
//   });
// };
