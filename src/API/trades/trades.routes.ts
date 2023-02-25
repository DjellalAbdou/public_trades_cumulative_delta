import { Router } from 'express';
import { getCumulativeDeltaController } from './trades.controller';
import { validateCumulativeDelta } from './trades.validator';

const router = Router();

router.get('/:exchange/cumulative-delta', validateCumulativeDelta, getCumulativeDeltaController);

export default router;
