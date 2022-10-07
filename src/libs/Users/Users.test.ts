import {IUsers, Users} from './index';

describe('User Lib Unit Tests', () => {
    it('should Create an Instance of User', () => {
        const UserInstance = new Users();
        expect(UserInstance).toBeDefined();
    });
    it('should Add a new User item', () => {
        const UserInstance = new Users();
        const UserItem: IUsers={
            name: 'Carlos',
            lastName: 'Hernandez',
            birth: new Date(),
            gender: 'Male',
            direction: 'Res La Trinidad',
            _id:1
        };
        const index= UserInstance.addUser(UserItem);
        expect(index).toBe(0);
    })
});