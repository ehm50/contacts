import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactEntryComponent } from './contact-entry/contact-entry.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ShowValidationErrorComponent } from './show-validation-error/show-validation-error.component';
import { ContactService } from './services/contact.service';
import { DataService } from './services/data.service';
import { ContactStore } from './store/contact-store';
import * as io from 'socket.io-client';
import { SOCKET_IO } from './tokens/app-tokens';

export function socketIoFactory() {
  return io;
}

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactEntryComponent,
    ContactDetailsComponent,
    HomeComponent,
    AboutComponent,
    ShowValidationErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ContactService, DataService, ContactStore, { provide: SOCKET_IO, useFactory: socketIoFactory }],
  bootstrap: [AppComponent]
})
export class AppModule { }
