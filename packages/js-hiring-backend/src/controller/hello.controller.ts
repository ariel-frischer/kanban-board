import { NextFunction, Request, Response, Router } from "express";
import QuoteDoc, { IQuote } from "../model/quotes";
import { createQuoteMap } from "../utils";

export class HelloController {
  getRouter(): Router {
    const router = Router();
    router.get("/", this.getHello.bind(this));
    router.get("/getQuotes", this.getQuotes.bind(this));
    router.post("/updateQuotes", this.updateQuotes.bind(this));
    return router;
  }

  getHello(request: Request, response: Response) {
    response.send("Hello world").status(200);
  }

async getQuotes(request: Request, response: Response, next: NextFunction) {
  try {
      const quotes = await QuoteDoc.find().exec();
    
      if(quotes.length === 0) {
        response.status(502).json("Quote list is empty...")
        next();
      }
      const quoteMap = createQuoteMap(quotes);

      response.status(200).json(quoteMap);
    } catch(error) {
      console.error(error);
    response.status(400).json(error);
    }
  }

  async updateQuotes(request: Request, response: Response) {
    try { 

      const quotes:IQuote[] = JSON.parse(request.body.quotes);
      for (let index = 0; index < quotes.length; index++) {
        const quote = quotes[index];
        if(!quote._id) {
          // Add Document if it doesn't exist...
          const mongooseQuote = new QuoteDoc({...quote});
          await mongooseQuote.save()
        } else if(quote._id) {
          await QuoteDoc.findByIdAndUpdate(quote._id, {...quote, author: {...quote.author, colors: quote.author.colors}}).exec();

        }
        
      }
      const messages = await QuoteDoc.find();
      console.log('messages.length', messages.length)
    // console.log('request', request)
      response.send("Successfully updated quotes!").status(200);
    } catch(error) {
      console.error(error);
      response.status(400).json(error);
    }
}
  
}
