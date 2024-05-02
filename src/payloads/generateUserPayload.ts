import { faker } from '@faker-js/faker';

export class UserObject{
    userId: number;
    title: string;
    body: string;

    constructor(){
        this.userId = faker.number.int(10);
        this.title = faker.lorem.paragraph();
        this.body = faker.lorem.lines();
    }

}
