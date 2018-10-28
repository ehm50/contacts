import {BehaviorSubject} from 'rxjs';
import { Contact } from '../models/model-interfaces';

export const LOAD = 'LOAD';
export const ADD = 'ADD';
export const EDIT = 'EDIT';
export const REMOVE = 'REMOVE';

export class ContactStore {
  private contacts: Contact[] = [];
  items$ = new BehaviorSubject<Contact[]>([]);

  dispatch(action) {
    console.log("dispatched")
    this.contacts = this._reduce(this.contacts, action);
    this.items$.next(this.contacts);
  }

  _reduce(contacts: Contact[], action) {
    switch (action.type) {
      case LOAD:
        return [...action.data];
      case ADD:
        return [...contacts, action.data];
      case EDIT:
        return contacts.map(contact => {
          const editedContact = action.data;
          if (contact.id !== editedContact.id){
            return contact;
          }
          return editedContact });
      case REMOVE:
        return contacts.filter(contact => contact.id !== action.data.id);
      default:
        return contacts;
    }
  }
}