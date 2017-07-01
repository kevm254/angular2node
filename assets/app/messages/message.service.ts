import { Injectable } from '@angular/core';
import { Message } from './message.model';

@Injectable()
export class MessageService {
    private messages: Message[];

    constructor() {
        this.messages = [];
    }

    addMessage(message: Message) {
        this.messages.push(message);
        console.log(this.messages);
    }

    getMessages(): Message[] {
        return this.messages;
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}