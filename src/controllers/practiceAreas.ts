import { Request, Response } from 'express'
import { PracticeAreas } from '../models/PracticeAreas'

export const getallAreas = async (req: Request, res: Response) => {
  try {
    const areas = await PracticeAreas.find().sort({ createdAt: -1 }).limit(4)
    res.status(200).json(areas)
  } catch (error) {
    console.error('GET ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const createAreas = async (req: Request, res: Response) => {
  try {
    const createdAreas = await PracticeAreas.create(req.body)
    res.status(201).json(createdAreas)
  } catch (error) {
    console.error('CREATE ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateAreas = async (req: Request, res: Response) => {
  try {
    const updatedAreas = await PracticeAreas.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    if (!updatedAreas) {
      res.status(400).json({ message: 'Area item not found' })
      return
    }

    res.status(200).json({
      message: 'Area items updated successfully',
      updatedArea: updatedAreas,
    })
  } catch (error) {
    console.error('UPDATE ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteAreas = async (req: Request, res: Response) => {
  try {
    const deleteArea = await PracticeAreas.findByIdAndDelete(req.params.id)
    if (!deleteArea) {
      res.status(400).json({ message: 'Area  not found' })
      return
    }

    res.status(200).json({
      message: 'Area deleted successfully',
      deletedArea: deleteArea,
    })
  } catch (error) {
    console.error('DELETE ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
