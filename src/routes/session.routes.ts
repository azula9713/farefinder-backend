import { Router } from 'express';

import validate from '../middleware/validateResource';
import requireUser from '../middleware/requireUser';
import {
  createSessionHandler,
  getUserSessionsHandler,
  logoutSessionHandler,
  validateSessionHandler,
} from '../controller/session.controller';
import createSessionSchema from '../schemas/session.schema';

const router = Router();

router.route('/').get(requireUser, getUserSessionsHandler);
router.route('/validate').get(requireUser, validateSessionHandler);
router.route('/logout').patch(requireUser, logoutSessionHandler);
router.route('/login').post(validate(createSessionSchema), createSessionHandler);

export default router;
