import { Request, Response } from 'express'
import Business from '../models/Business'

export const getAllBusinesses = async (req: Request, res: Response) => {
  try {
    const businesses = await Business.find().sort({ createdAt: -1 }).limit(10)
    res.status(200).json(businesses)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching businesses' })
  }
}

export const createBusiness = async (req: Request, res: Response) => {
  try {
    const business = await Business.create(req.body)
    res.status(201).json({ message: 'Business created successfully', business })
  } catch (error) {
    res.status(500).json({ message: 'Error creating business' })
  }
}

export const updateBusiness = async (req: Request, res: Response) => {
  try {
    const business = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!business) {
       res.status(404).json({ message: 'Business not found' })
       return
    }
    res.status(200).json({ message: 'Business updated successfully', business })
  } catch (error) {
    res.status(500).json({ message: 'Error updating business' })
  }
}

export const deleteBusiness = async (req: Request, res: Response) => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id)
    if (!business) {
      res.status(404).json({ message: 'Business not found' })
      return
    }
    res.status(200).json({ message: 'Business deleted successfully', business })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting business' })
  }
}
