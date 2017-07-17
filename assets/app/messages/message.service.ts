import { Injectable, EventEmitter } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Message } from './message.model';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ErrorService } from '../errors/error.service';
import { api_url } from './../../config/config';

@Injectable()
export class MessageService {
    private messages: Message[];
    messageIsEdit = new EventEmitter<Message>();

    hostUrl: string = api_url;

    constructor(private http: Http, private errorService: ErrorService) {
        this.messages = [];
    }

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

        return this.http.post(this.hostUrl + '/message/' + token, body, options)
            .map((response: Response) => {
                const result= response.json();
                const message =  new Message(result.obj.content, result.obj.user.firstName, result.obj._id, result.obj.user._id);
                this.messages.push(message);
                return message;

            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getMessages(): Observable<Response> {
        return this.http.get(this.hostUrl + '/message')
            .map((response: Response) => {
                let messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(
                        message.content,
                        message.user.firstName,
                        message._id,
                        message.user._id))
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete(this.hostUrl + '/message/' + message.messageId + token)
            .map((response: Response) => response.json())
           .catch((error: Response) => {
               this.errorService.handleError(error.json());
               return Observable.throw(error.json());
           });
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({ 'Content-Type': 'application/json'} );
        const options = new RequestOptions({ headers: headers });
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

        return this.http.patch(this.hostUrl + '/message/' + message.messageId + token, body, options);
    }
}