import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
})
export class MessageInputComponent implements OnInit {
    message: Message;

    constructor(private messageService: MessageService) {

    }

    onSubmit(form: NgForm) {
        if (this.message) {
            alert(form.value.content);
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(
                    result => console.log(result),
                    err => console.log(err)
                );
            this.message = null;
        } else {
            const message = new Message(form.value.content, 'Max');
            this.messageService.addMessage(message)
                .subscribe(
                    (response) => { console.log(response); },
                    (err) => { console.error(err); }
                );
        }


        form.resetForm();
    }

    ngOnInit() {
        this.messageService.messageIsEdit.subscribe(
            (message) => this.message = message
        )
    }

    onClear(f) {
        this.message = null;
        f.reset();
    }
}