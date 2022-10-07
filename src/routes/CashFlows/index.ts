import Router from 'express';
import {ICashFlow, CashFlow} from '@libs/CashFlow';
const router  = Router();
const cashFlowInstance = new CashFlow();

/*router.get('/', async (_req, res)=>{
    res.json( await cashFlowInstance.getAllCashFlowItems());
});*/

router.get('/byIndex/:index', (req, res) => 
{
    try {
        const{index} = req.params as unknown as {index: number};
        res.json(cashFlowInstance.getCashFlowByIndex(index));
    }catch(error){
        console.log(error);
        res.status(500).json({'msg':'Error'});
    }
});
router.get('/', async (_req, res) => {
  res.json({msg:'Hello World!'});
 });

 router.post('/new', (req, res) => {
   try {
    const newCashFlow=req.body as unknown as ICashFlow;
    const newCashFlowIndex= cashFlowInstance.addCashFlow(newCashFlow);
    res.json({newIndex:newCashFlowIndex});
   }catch (error) {
    res.status(500).json({error: (error as Error).message});
   }
 });

 router.put('/update/:index', (req, res) => {
    try{
        const { index = -1}= req.params as unknown as {index?:number};
        const CashFlowForm= req.body as unknown as ICashFlow;
        const cashFlowUpdate = Object.assign(cashFlowInstance.getCashFlowByIndex(index), CashFlowForm);
        if(cashFlowInstance.updateCashFlow(index, cashFlowUpdate)){
            res.json(cashFlowUpdate);
        }else{
            res.status(500).json({"msg":"Update not possible"})
        }
    }catch (error) {
        res.status(500).json({error: (error as Error).message});
    }
 });

 router.delete('/delete:index', (req, res) =>{
    try {
        const{index} = req.params as unknown as {index: number};
        if(cashFlowInstance.deleteCashFlow(index)){
            res.status(200).json({"msg":"Success"});
        }else{
            res.status(500).json({});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({'msg':'Error'});
    }
 })


export default router;
