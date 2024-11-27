export abstract class BaseDynamoEntity {
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}