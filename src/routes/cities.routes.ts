import { Router } from 'express';
import { citiesData } from '../controller/cities.controller';

const router = Router();

router.route('/all').get(citiesData);

export default router;
