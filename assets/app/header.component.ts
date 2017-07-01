import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-pills">
                    <li [routerLink]="['/messages']"
                        routerLinkActive="active"><a>Messenger</a></li>
                    <li [routerLink]="['/auth']"
                        routerLinkActive="active"><a>Authentication</a></li>
                </ul>
            </nav>
        </header>
    `
})
export class HeaderComponent{}