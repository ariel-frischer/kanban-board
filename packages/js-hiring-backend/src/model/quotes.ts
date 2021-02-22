import mongoose from "mongoose";
import { Author } from "src/types";

export interface IQuote extends mongoose.Document {
 title: string,
  description: string,
  status: string,
  author: Author
}

export const QuoteSchema = new mongoose.Schema<IQuote>({
  title: String,
  cow: String,
  description: String,
  status: String,
  author: {},
});

const QuoteDoc = mongoose.model<IQuote>("Quote", QuoteSchema);
export default QuoteDoc;
