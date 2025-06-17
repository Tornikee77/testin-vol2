import { Request, Response } from 'express'
import LatestNews from '../models/LatestNews'

export const getAllNews = async (req: Request, res: Response) => {
  try {
    const news = await LatestNews.find().sort({ createdAt: -1 }).limit(3)
    res.status(200).json(news)
  } catch (error) {
    console.error('GET ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const createLatestNews = async (req: Request, res: Response) => {
  try {
    const news = await LatestNews.create(req.body)
    res.status(201).json(news)
  } catch (error) {
    console.error('CREATE ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateLatestNews = async (req: Request, res: Response) => {
  try {
    const updatedNews = await LatestNews.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!updatedNews) {
      res.status(400).json({ message: 'News item not found' })
    }

    res.status(200).json({
      message: 'News  items updated successfully',
      updatedNews: updatedNews,
    })
  } catch (error) {
    console.error('UPDATE ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
export const deleteLatestNews = async (req: Request, res: Response) => {
  try {
    const deletedNews = await LatestNews.findByIdAndDelete(req.params.id)
    if (!deletedNews) {
      res.status(400).json({ message: 'News  not found' })
    }
    res.status(200).json({
      message: 'News  deleted successfully',
      removedNews: deletedNews,
    })
  } catch (error) {
    console.error('DELETE ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
