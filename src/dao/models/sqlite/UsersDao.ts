import { IUsers} from "../entities/Users";
import { AbstractDao } from "./AbstractDao";
import sqlite from 'sqlite';

export class UsersDao extends AbstractDao<IUsers>{

    public constructor(db:unknown){
        super('USERS', db as sqlite.Database );
        super.exec('CREATE TABLE IF NOT EXISTS CASHFLOW(_id INTEGER AUTOINCREMENT NOT NULL PRIMARY KEY,' + 'type TEXT' + 'date:Date,' + 'amount: NUMERIC,' + 'description TEXT');
    }
    public async getUsers(){
        super.findAll()
    }

    public async getUserById(identifier: Partial<IUsers>){
        try {
            const result = await super.findById(identifier);
            return result;
        }catch (ex: unknown){
            throw ex;
        }
    }

    public async insertUser( newUser: IUsers ){
        try{
            const result = await super.createOne(newUser);
            return result;
        }catch(ex: unknown){
            console.log("UsersDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }

    public async deleteUser(deleteUser:IUsers){
        try{
            const {_id }= deleteUser;
            const result = await super.delete({_id});
            return result;
        }catch(ex: unknown){
            console.log("UsersDao sqlite:", (ex as Error).message);
            throw ex;
        }
    }
}