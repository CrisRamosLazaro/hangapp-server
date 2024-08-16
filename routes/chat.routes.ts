import express from 'express'
const router = express.Router()
import { isAuthenticated } from "@/middlewares/verifyToken.middleware"
import { createChatMsg, getAllChatMsgs } from '@/controllers/chat.controllers'

router.post('/:group_id/new-msg', isAuthenticated, createChatMsg)
router.get('/:group_id', isAuthenticated, getAllChatMsgs)

export default router