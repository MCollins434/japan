export class Todo {
    name: string;
    day: number;
    time?: string;
    details?: TodoDetails;
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