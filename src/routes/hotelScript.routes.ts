import { Router } from 'express';

import validate from '../middleware/validateResource';
import requireUser from '../middleware/requireUser';
import {
  createHotelScriptHandler,
  deleteHotelScriptsHandler,
  updateHotelScriptsHandler,
  getAllHotelScriptsHandler,
  getHotelScriptHandler,
} from '../controller/hotelScript.controller';
import {
  createPopularLocationSchema,
  deletePopularLocationSchema,
  updatePopularLocationSchema,
  getPopularLocationSchema,
} from '../schemas/popularLocation.schema';

const router = Router();

router.route('/all').get(getAllHotelScriptsHandler);
router.route('/view/:hotelScriptId').get(validate(getPopularLocationSchema), getHotelScriptHandler);
router.route('/create').post([requireUser, validate(createPopularLocationSchema)], createHotelScriptHandler);
router.route('/update/:hotelScriptId').put([requireUser, validate(updatePopularLocationSchema)], updateHotelScriptsHandler);
router.route('/delete/:hotelScriptId').delete([requireUser, validate(deletePopularLocationSchema)], deleteHotelScriptsHandler);

export default router;
