import express from 'express'
const router = express.Router()
import { isAuthenticated } from "@/middlewares/verifyToken.middleware"
import { createComment, getAllComments, editComment, deleteComment } from '@/controllers/comment.controllers'

router.post('/:spot_id/create-comment', isAuthenticated, createComment)
router.get('/:spot_id/comments', isAuthenticated, getAllComments)
router.put('/:spot_id/comments/:comment_id/edit', isAuthenticated, editComment)
router.delete('/:spot_id/comments/:comment_id/delete', isAuthenticated, deleteComment)

export default router