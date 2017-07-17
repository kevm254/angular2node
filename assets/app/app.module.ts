// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// Declarations
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { routing } from './app.routing';
import { ErrorComponent } from './errors/error.component';

// Providers
import { AuthService } from './auth/auth.service';
import { MessageService } from './messages/message.service';
import { ErrorService } from './errors/error.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from './messages/message.module';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        AppComponent,

        AuthenticationComponent,
        HeaderComponent,
        HomeComponent,
        BlogComponent,


        ErrorComponent
    ],
    providers: [
        MessageService,
        AuthService,
        ErrorService
    ],
    imports:  [
        BrowserModule,
        HttpModule,
        routing,
        MessageModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}