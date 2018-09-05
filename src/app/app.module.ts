import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { NewMailComponent } from './components/new-mail/new-mail.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PopoverModule } from 'ngx-bootstrap/popover';


@NgModule({
  declarations: [
    AppComponent,
    NewMailComponent
  ],
  imports: [
    BrowserModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
