import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MessageComponent } from './messages/message.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessageService } from './messages/message.service';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { LogoutComponent } from './auth/logout.component';
import { routing } from './app.routing';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';

@NgModule({
    declarations: [
        AppComponent,

        MessageListComponent,
        MessageComponent,
        MessagesComponent,
        MessageInputComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,

        SignupComponent,
        SigninComponent,
        LogoutComponent

    ],
    providers: [MessageService],
    imports:  [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}