import { Router } from 'express';
import { getCumulativeDeltaController } from './trades.controller';

const router = Router();

router.get('/:exchange/cumulative-delta', getCumulativeDeltaController);

export default router;
