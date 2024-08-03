import express from 'express'
const router = express.Router()
import { isAuthenticated } from "@/middlewares/verifyToken.middleware"
import { createGroup, getAllGroups, deleteGroup } from '@/controllers/group.controllers'

router.post('/create-group', isAuthenticated, createGroup)
router.get('/all-groups', isAuthenticated, getAllGroups)
router.delete('/:group_id/delete', isAuthenticated, deleteGroup)

export default router