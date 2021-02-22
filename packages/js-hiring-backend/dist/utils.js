"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuoteMap = void 0;
const types_1 = require("./types");
const getQuoteStatus = (status, items) => items.filter((quote) => quote.status === status);
exports.createQuoteMap = (quotes) => {
    const statusQuoteMap = types_1.statuses.reduce((previous, status) => (Object.assign(Object.assign({}, previous), { [status]: getQuoteStatus(status, quotes) })), {});
    return statusQuoteMap;
};
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
//# sourceMappingURL=utils.js.map