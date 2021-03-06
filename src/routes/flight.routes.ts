import { Router } from 'express';
import { agencyData, getSearchId, searchResults } from '../controller/flight.controller';

const router = Router();

router.route('/').get((_req, res) => {
  res.send('Hello World');
});

router.route('/getsearchid').post(getSearchId);

router.route('/search_results/:searchId').get(searchResults);

router.route('/agencydata').get(agencyData);

export default router;
