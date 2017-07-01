import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    @Output() editClicked: EventEmitter<string> = new EventEmitter<string>();

    constructor(private messageService: MessageService) {

    }

    onEdit() {
        this.editClicked.emit('A brand new value');
    }

    onDelete() {
        this.messageService.deleteMessage(this.message);
    }
}