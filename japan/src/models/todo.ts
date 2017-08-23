export class Todo {
    name: string;
    day: number;
    time?: string;
    details?: TodoDetails;

    constructor(private fields: any) {
        for (let f in fields) {
            this[f] = fields[f];
        }
    }
}

export class TodoDetails {
    description: string;
    address?: string;
    phone?: string;
    email?: string;
    location?: string;

    constructor(description: string) {
        this.description = description;
    }
}