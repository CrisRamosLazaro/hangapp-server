import express from 'express'
const router = express.Router()
import { isAuthenticated } from "@/middlewares/verifyToken.middleware"
import { createGroup, getAllGroups, getOneGroup, joinGroup, leaveGroup, deleteGroup } from '@/controllers/group.controllers'

router.post('/create-group', isAuthenticated, createGroup)
router.get('/all-groups', isAuthenticated, getAllGroups)
router.get('/:group_id', isAuthenticated, getOneGroup)
router.put('/:group_id/join', isAuthenticated, joinGroup)
router.put('/:group_id/leave', isAuthenticated, leaveGroup)
router.delete('/:group_id/delete', isAuthenticated, deleteGroup)

export default router