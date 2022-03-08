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
  createHotelScriptSchema,
  deleteHotelScriptSchema,
  updateHotelScriptSchema,
  getHotelScriptSchema,
} from '../schemas/hotelScript.schema';

const router = Router();

router.route('/all').get(getAllHotelScriptsHandler);
router.route('/view/:hotelScriptId').get(validate(getHotelScriptSchema), getHotelScriptHandler);
router.route('/create').post([requireUser, validate(createHotelScriptSchema)], createHotelScriptHandler);
router.route('/update/:hotelScriptId').put([requireUser, validate(updateHotelScriptSchema)], updateHotelScriptsHandler);
router.route('/delete/:hotelScriptId').delete([requireUser, validate(deleteHotelScriptSchema)], deleteHotelScriptsHandler);

export default router;
