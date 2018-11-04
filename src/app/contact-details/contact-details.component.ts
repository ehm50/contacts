import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { ContactStore, REMOVE } from '../store/contact-store';
import { DataService } from '../services/data.service';
import { Contact } from '../models/model-interfaces';
import { Subscription } from 'rxjs';


@Component({
  selector: 'ch-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact;
  dataServiceSubscription: Subscription;
  deleteConfirmation: string;
  showContactNumber: boolean = false;

  constructor(private contactService: ContactService, private contactStore: ContactStore, private route: ActivatedRoute, private router: Router,
    private data: DataService) { }

  ngOnInit() {
    this.dataServiceSubscription = this.data.currentMessage.subscribe(message => { this.loadaddress(message); });
  }

  ngOnDestroy(): void {
    if (this.dataServiceSubscription) {
      this.dataServiceSubscription.unsubscribe();
    }
  }

  loadaddress(contact) {
    this.contact = contact;
    let contactArray = this.contact.addresses;
    const indexLength = contactArray.length;
    if (indexLength > 1) {
      this.showContactNumber = true;
    }
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(contact => {
      this.contactStore.dispatch({ type: REMOVE, data: { id: id } });
      this.contactService.socket.emit('broadcast_contact', { type: REMOVE, data: { id: id } });
      const relativeUrl = '..';
      this.router.navigate([relativeUrl], { relativeTo: this.route });
    });
  }

}
