import express from 'express';
import {UserController} from '../controllers/UserController';
import {UserRepository} from '../repositories/UserRepository';
import {UserManageService} from '../services/UserManageService';

const router = express.Router();

const repository = new UserRepository();
const userManageService = new UserManageService(repository);
const userController = new UserController(userManageService);

router.get('/', userController.actionIndex);
router.get('/:id', userController.actionView);
router.post('/', userController.actionCreate);
router.put('/:id', userController.actionUpdate);
router.delete('/:id', userController.actionDelete);

export default router;
