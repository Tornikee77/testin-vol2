import { Request, Response } from 'express'
import Comment from '../models/Comments'

export const createComment = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.blogId
    const { parentId, name, email, content } = req.body
    const comment = await Comment.create({
      blogId,
      name,
      content,
      parentId: parentId || null,
      email: email || null,
    })

    res.status(201).json({ message: 'Comment created successfully', comment })
  } catch (error) {
    console.error('CREATE COMMENT ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getCommentByBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.blogId
    const comments = await Comment.find({ blogId }).sort({ createdAt: -1 }).lean()
    const groupedComments: Record<string, any> = {}
    const topLevelComments = comments.filter((comment) => !comment.parentId)
    const replies = comments.filter((comment) => comment.parentId)
    for (const reply of replies) {
      const parent = reply.parentId.toString()
      if (!groupedComments[parent]) groupedComments[parent] = []
      groupedComments[parent].push(reply)
    }
    const result = topLevelComments.map((comment) => ({
      ...comment,
      replies: groupedComments[comment._id.toString()] || [],
    }))
    res.status(200).json(result)
  } catch (error) {
    console.error('GET COMMENTS BY BLOG ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.commentId)
    if (!deleted) {
      res.status(404).json({ message: 'Comment not found' })
      return
    }
    await Comment.deleteMany({ parentId: req.params.commentId })
    res.status(200).json({ message: 'Comment deleted successfully' })
  } catch (error) {
    console.error('DELETE COMMENT ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
