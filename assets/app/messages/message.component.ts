import { Component, Input } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
    moduleId: module.id + '',
    selector: 'app-message',
    styleUrls: ['./message.component.css'],
    templateUrl: './message.component.html'

})
export class MessageComponent {
    @Input() message: Message;

    constructor(private messageService: MessageService) {

    }

    onEdit() {
        this.messageService.editMessage(this.message);
    }

    onDelete() {
        this.messageService.deleteMessage(this.message)
            .subscribe(
                result => console.log(result)
            );
    }

    get belongsToUser() {
        return localStorage.getItem('userId') == this.message.userId;
    }
}