import sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

let Connection=null;
export const getConnection= (url?:string)=> {
    if(!Connection){
        const dbUrl=(url)? url:process.env.DB_URI || 'sample.db';
        Connection= sqlite.open({
            filename: dbUrl,
            driver: sqlite3.Database
        }
        );
        return Connection;
    }
}