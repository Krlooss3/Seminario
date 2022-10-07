import {Router} from 'express';
import CashFlowRouter from './CashFlows';
const router  = Router();

router.use('/cashFlow', CashFlowRouter);

export default router;