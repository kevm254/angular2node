import { Injectable, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Message } from './message.model';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

@Injectable()
export class MessageService {
    private messages: Message[];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http) {
        this.messages = [];
    }

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        return this.http.post('http://localhost:3000/message', body, options)
            .map((response: Response) => {
                const result= response.json();
                const message =  new Message(result.obj.content, 'Dummy', result.obj._id, null);
                this.messages.push(message);
                return message;

            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }

    getMessages(): Observable<Response> {
        return this.http.get('http://localhost:3000/message')
            .map((response: Response) => {
                let messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(message.content, 'Test', message._id, null))
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        return this.http.delete('http://localhost:3000/message/' + message.messageId)
            .map((response: Response) => response.json())
            .catch((err: Response) => Observable.throw(err.json()));
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({ 'Content-Type': 'application/json'} );
        const options = new RequestOptions({ headers: headers });

        return this.http.patch('http://localhost:3000/message/' + message.messageId, body, options);
    }
}