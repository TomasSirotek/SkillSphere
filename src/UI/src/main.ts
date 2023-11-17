import { enableProdMode, importProvidersFrom } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { provideDialogConfig } from '@ngneat/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environments/environment';


if (environment.production) {
    enableProdMode()
    //show this warning only on prod mode
    if (window) {
        selfXSSWarning();
    }
}

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserModule, AppRoutingModule),
        provideDialogConfig(
        {
            enableClose: false,
            width:900,
        }
    ),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers    
    ],
    
})
    .catch((err) => console.error(err))

function selfXSSWarning() {
    setTimeout(() => {
        console.log('%c** STOP **', 'font-weight:bold; font: 2.5em Arial; color: white; background-color: #e11d48; padding-left: 15px; padding-right: 15px; border-radius: 25px; padding-top: 5px; padding-bottom: 5px;');
        console.log(
            `\n%cThis is a browser feature intended for developers. Using this console may allow attackers to impersonate you and steal your information sing an attack called Self-XSS. Do not enter or paste code that you do not understand.`, 'font-weight:bold; font: 2em Arial; color: #e11d48;'
        );
    });
}
