
import { Injectable, Inject } from '@angular/core';
import { Contact } from '../models/model-interfaces';
import { ContactStore, LOAD, ADD } from '../store/contact-store';
import { Http, RequestMethod, Response } from '@angular/http';
import { Observable, throwError, fromEvent} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SOCKET_IO } from '../tokens/app-tokens';
const WEB_SOCKET_URL = 'http://localhost:3001';
const BASE_URL = 'http://localhost:3000/api/contacts/';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts$: Observable<Contact[]>;
  socket: SocketIOClient.Socket;

  constructor(private http: Http, private ContactStore: ContactStore, @Inject(SOCKET_IO) socketIO) {
    this.http.get(BASE_URL).pipe(map(res => res.json()),catchError(error => {
      return throwError("Something went wrong!");
      }))
      .subscribe((tasks) => {
        this.ContactStore.dispatch({ type: LOAD, data: tasks });
      });
    this.contacts$ = ContactStore.items$;
    this.socket = socketIO(WEB_SOCKET_URL);
    fromEvent(this.socket, 'contact_saved')
      .subscribe((contact) => {
        this.ContactStore.dispatch(contact);
      });
  }

  getContact(id: number | string): Observable<Contact> {
    return this.http.get(BASE_URL + id)
      .pipe(map(res => res.json()),catchError(error => {
        return throwError("Something went wrong!");
        }));
  }

  createContact(Contact: Contact): Observable<Contact> {
    return this.http.post(BASE_URL, Contact)
      .pipe(map(res => res.json()),catchError(error => {
        return throwError("Something went wrong!");
        }));
  }

  updateContact(Contact: Contact): Observable<Contact> {
    return this.http.put(BASE_URL + Contact.id, Contact)
      .pipe(map(res => res.json()),catchError(error => {
        return throwError("Something went wrong!");
        }));
  }

  deleteContact(id: number): Observable<Response> {
    return this.http.delete(BASE_URL + id);
  }

  saveContact(Contact: Contact) {
    const options = {
      body: Contact,
      method: Contact.id ? RequestMethod.Put : RequestMethod.Post
    };

    return this.http.request(BASE_URL + (Contact.id || ''), options)
      .pipe(map(res => res.json()),catchError(error => {
        return throwError("Something went wrong!");
        }));
  }
}

