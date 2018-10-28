import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact, createInitialContact } from '../models/model-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  contact: Contact = createInitialContact();
  private messageSource = new BehaviorSubject<Contact>(this.contact);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(contact: Contact, url?: String) {
    this.messageSource.next(contact)
  }
}
