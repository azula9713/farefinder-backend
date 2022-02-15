import { Router } from 'express';

import validate from '../middleware/validateResource';
import requireUser from '../middleware/requireUser';
import {
  createPopularLocationHandler,
  deletePopularLocationHandler,
  updatePopularLocationHandler,
  getAllPopularLocationsHandler,
  getPopularLocationHandler,
} from '../controller/popularLocation.controller';
import {
  createPopularLocationSchema,
  deletePopularLocationSchema,
  updatePopularLocationSchema,
  getPopularLocationSchema,
} from '../schemas/popularLocation.schema';

const router = Router();

router.route('/').get(getAllPopularLocationsHandler);
router.route('/:locationId').get(validate(getPopularLocationSchema), getPopularLocationHandler);
router.route('/create').post([requireUser, validate(createPopularLocationSchema)], createPopularLocationHandler);
router.route('/update/:locationId').put([requireUser, validate(updatePopularLocationSchema)], updatePopularLocationHandler);
router.route('/delete/:locationId').delete([requireUser, validate(deletePopularLocationSchema)], deletePopularLocationHandler);

export default router;
