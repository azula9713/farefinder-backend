import { Router } from 'express';
import { createUserHandler } from '../controller/user.controller';

import validate from '../middleware/validateResource';
import createUserSchema from '../schemas/user.schema';

const router = Router();

router.route('/register').post(validate(createUserSchema), createUserHandler);

export default router;
