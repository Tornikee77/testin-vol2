import { Request, Response } from 'express'
import Team from '../models/Team'

export const getAllTeamMembers = async (req: Request, res: Response) => {
  try {
    const members = await Team.find().sort({ createdAt: -1 })
    res.status(200).json(members)
  } catch (error) {
    console.error('GET ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getTeamMembersById = async (req: Request, res: Response) => {
  try {
    const member = await Team.findById(req.params.id)
    if (!member) {
      res.status(404).json({ message: 'Member not found' })
      return
    }
    res.status(200).json(member)
  } catch (error) {
    console.error('GET ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const createTeamMember = async (req: Request, res: Response) => {
  try {
    const createdMember = await Team.create(req.body)
    res.status(201).json({ message: 'Member created successfully', createdMember })
  } catch (error) {
    console.error('CREATE ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateTeamMember = async (req: Request, res: Response) => {
  try {
    const updatedMember = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!updatedMember) {
      res.status(404).json({ message: 'Member not found' })
      return
    }
    res.status(200).json({ message: 'Member updated successfully', updatedMember })
  } catch (error) {
    console.error('UPDATE ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteTeamMember = async (req: Request, res: Response) => {
  try {
    const deletedMember = await Team.findByIdAndDelete(req.params.id)

    if (!deletedMember) {
      res.status(404).json({ message: 'Member not found' })
      return
    }
    res.status(200).json({ message: 'Member deleted successfully', deletedMember })
  } catch (error) {
    console.error('DELETE ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
