import { Request, Response } from 'express'
import Faq from '../models/Faq'

export const getAllFaqs = async (req: Request, res: Response) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 }).limit(8)
    res.status(200).json(faqs)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching faqs' })
  }
}

export const createFaq = async (req: Request, res: Response) => {
  try {
    const faq = await Faq.create(req.body)
    res.status(201).json({ message: 'Faq created successfully', faq })
  } catch (error) {
    res.status(500).json({ message: 'Error creating faq' })
  }
}

export const updateFaq = async (req: Request, res: Response) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!faq) {
      res.status(404).json({ message: 'Faq not found' })
      return
    }
    res.status(200).json({ message: 'Faq updated successfully', faq })
  } catch (error) {
    res.status(500).json({ message: 'Error updating faq' })
  }
}

export const deleteFaq = async (req: Request, res: Response) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id)
    if (!faq) {
      res.status(404).json({ message: 'Faq not found' })
      return
    }
    res.status(200).json({ message: 'Faq deleted successfully', faq })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting faq' })
  }
}
