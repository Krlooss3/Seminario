import {getConnection} from "@models/sqlite/SqliteConn";
import { UsersDao } from "@models/sqlite/UsersDao";
export interface IUsers{
    name: string;
    lastName: string;
    birth: Date;
    gender: string;
    direction: string;
    _id?:unknown;
};

export class Users{
    private dao: UsersDao;
    public constructor(){
        getConnection()
            .then(conn=>{this.dao = new UsersDao (conn);})
            .catch(ex=>console.error(ex));
    }
    private UsersItems: IUsers[]=[];

    //Consultas
   public getAllUsers(){
        return this.dao.getUsers();
    }

    public getUserByIndex(index: number){
       return this.dao.getUserById({_id: index});
    }

    public addUser(user: IUsers) {
        return this.dao.insertUser(user);
    }
    public updateUser(index: number, user:IUsers):boolean{
        if(index>=0 && index < this.UsersItems.length){
            this.UsersItems[index]= user;
            return true;
        }
        return false;
    }

    public deleteUser(index: number):boolean{
        if(index>=0 && index < this.UsersItems.length){
            this.UsersItems=this.UsersItems.filter(
                (_obj:IUsers, i:number)=>i !==index
            );
            return true;
        }
        return false;
    }
}

