import { Router } from 'express';

import validate from '../middleware/validateResource';
import requireUser from '../middleware/requireUser';
import {
  createHomeLocationHandler,
  updateHomeLocationHandler,
  getHomeLocationHandler,
  getAllHomeLocationsHandler,
} from '../controller/homepageName.controller';
import { createHomePageLocationSchema, updateHomePageLocationSchema, getHomePageLocationSchema } from '../schemas/homepageLocation.schema';

const router = Router();

router.route('/all').get([requireUser, getAllHomeLocationsHandler]);
router.route('/view/:locationNameId').get(validate(getHomePageLocationSchema), getHomeLocationHandler);
router.route('/create').post([requireUser, validate(createHomePageLocationSchema)], createHomeLocationHandler);
router.route('/update/:locationNameId').put([requireUser, validate(updateHomePageLocationSchema)], updateHomeLocationHandler);

export default router;
