import Router from 'express';
import {IUsers, Users} from '@libs/Users';
const router  = Router();
const UserInstance = new Users();

/*router.get('/', async (_req, res)=>{
    res.json( await UserInstance.getAllCashFlowItems());
});*/

router.get('/UserbyIndex/:index', (req, res) => 
{
    try {
        const{index} = req.params as unknown as {index: number};
        res.json(UserInstance.getUserByIndex(index));
    }catch(error){
        console.log(error);
        res.status(500).json({'msg':'Error'});
    }
});
router.get('/', async (_req, res) => {
  res.json({msg:'Hello World!'});
 });

 router.post('/newUser', (req, res) => {
   try {
    const newUser=req.body as unknown as IUsers;
    const newUserIndex= UserInstance.addUser(newUser);
    res.json({newIndex:newUserIndex});
   }catch (error) {
    res.status(500).json({error: (error as Error).message});
   }
 });

 router.put('/updateUser/:index', (req, res) => {
    try{
        const { index = -1}= req.params as unknown as {index?:number};
        const UserForm= req.body as unknown as IUsers;
        const UserUpdate = Object.assign(UserInstance.getUserByIndex(index), UserForm);
        if(UserInstance.updateUser(index, UserUpdate)){
            res.json(UserUpdate);
        }else{
            res.status(500).json({"msg":"Update not possible"})
        }
    }catch (error) {
        res.status(500).json({error: (error as Error).message});
    }
 });

 router.delete('/deleteUser:index', (req, res) =>{
    try {
        const{index} = req.params as unknown as {index: number};
        if(UserInstance.deleteUser(index)){
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
