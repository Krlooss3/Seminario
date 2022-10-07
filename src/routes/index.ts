import {Router} from 'express';
import CashFlowRouter from './CashFlows';
import UserRouter from './Users';
const router  = Router();

router.use('/cashFlow', CashFlowRouter);
router.use('/Users', UserRouter);

export default router;