import { Request, Response } from 'express'
import Address from '../models/Address'

export const getAddress = async (req: Request, res: Response) => {
  try {
    const address = await Address.find().sort({ createdAt: -1 })
    res.status(200).json(address)
  } catch (error) {
    console.error('GET ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const createAddress = async (req: Request, res: Response) => {
  try {
    const address = await Address.create(req.body)
    res.status(201).json({ message: 'Address created successfully', address })
  } catch (error) {
    console.error('CREATE ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedAddress) {
      res.status(404).json({ message: 'Address not found' })
      return
    }
    res.status(200).json({ message: 'Address updated successfully', updatedAddress })
  } catch (error) {
    console.error('UPDATE ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id)
    if (!deletedAddress) {
      res.status(404).json({ message: 'Address not found' })
      return
    }
    res.status(200).json({ message: 'Address deleted successfully', deletedAddress })
  } catch (error) {
    console.error('DELETE ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
