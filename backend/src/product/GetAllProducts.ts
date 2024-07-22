import { faker } from '@faker-js/faker';

export class GetAllProducts {

    constructor() { }

    execute() {
        return [
            {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                isbn: faker.commerce.isbn(),
            },
            {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                isbn: faker.commerce.isbn(),
            },
            {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                isbn: faker.commerce.isbn(),
            }
        ]

    }
}