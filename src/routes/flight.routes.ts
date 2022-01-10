import { Router } from 'express';
import { searchId, searchResults } from '../controller/flight.controller';

const router = Router();

router.route('/').get((req, res) => {
  res.send('Hello World');
});

router.route('/getsearchid').post(searchId);

router.route('/search_results/:searchId').get(searchResults);

export default router;
