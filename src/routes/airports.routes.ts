import { Router } from 'express';
import { airportsData } from '../controller/airports.controller';

const router = Router();

router.route('/all').get(airportsData);

export default router;
