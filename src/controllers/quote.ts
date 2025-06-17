import { Request, Response } from 'express'
import Quote from '../models/Quote'

export const getAllQuotes = async (req: Request, res: Response) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 }).limit(5)
    res.status(200).json(quotes)
  } catch (error) {
    console.error('GET ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const createQuote = async (req: Request, res: Response) => {
  try {
    const quotes = await Quote.create(req.body)
    res.status(201).json(quotes)
  } catch (error) {
    console.error('CREATE ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateQuote = async (req: Request, res: Response) => {
  try {
    const updateQuote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updateQuote) {
      res.status(400).json({ message: 'Quote item not found' })
      return
    }

    res.status(200).json({
      message: 'Quote items updated successfully',
      quote: updateQuote,
    })
  } catch (error) {
    console.error('UPDATE ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteQuote = async (req: Request, res: Response) => {
  try {
    const deletedQuote = await Quote.findByIdAndDelete(req.params.id)
    if (!deletedQuote) {
      res.status(400).json({ message: 'Quote  not found' })
      return
    }
    res.status(200).json({
      message: 'Quote  deleted successfully',
      removedQuote: deletedQuote,
    })
  } catch (error) {
    console.error('DELETE ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
