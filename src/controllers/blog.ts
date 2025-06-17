import { Request, Response } from 'express'
import Blog from '../models/Blog'
import slugify from 'slugify'

interface BlogFilter {
  category?: string
  tags?: {
    $in?: string[]
  }
  search?: {
    $search: string
  }
  page?: number
  limit?: number
}

export const createBlog = async (req: Request, res: Response) => {
  try {
    const slug = slugify(req.body.title, { lower: true, strict: true })
    const exists = await Blog.findOne({ slug })
    if (exists) {
      res.status(400).json({ message: 'Blog with the same title already exists' })
      return
    }
    const blog = await Blog.create({
      ...req.body,
      slug,
    })
    res.status(201).json({ message: 'Blog created successfully', blog })
  } catch (error) {
    console.error('CREATE BLOG ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const { category, tags, search, page = 1, limit = 6 } = req.query
    const filter: BlogFilter = {}
    if (category) filter.category = category as string
    if (tags) filter.tags = { $in: (tags as string).split(',') }
    if (search) filter.search = { $search: search as string }

    const skip = (Number(page) - 1) * Number(limit)
    const [blogs, total] = await Promise.all([
      Blog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Blog.countDocuments(filter),
    ])

    res.status(200).json({
      page: Number(page),
      total,
      totalPages: Math.ceil(total / Number(limit)),
      data: blogs,
    })
  } catch (error) {
    console.error('GET ALL BLOGS ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
    })
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' })
      return
    }
    res.status(200).json({ blog })
  } catch (error) {
    console.error('GET BLOG BY SLUG ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedBlog) {
      res.status(404).json({ message: 'Blog not found' })
      return
    }
    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog })
  } catch (error) {
    console.error('UPDATE BLOG ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
    if (!deletedBlog) {
      res.status(404).json({ message: 'Blog not found' })
      return
    }
    res.status(200).json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.error('DELETE BLOG ERROR:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
