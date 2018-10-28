import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/model-interfaces';
import { DataService } from '../services/data.service';
import { Router } from "@angular/router";

@Component({
  selector: 'ch-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: any = [];
  constructor(private contactService: ContactService,
    private data: DataService, private router: Router) { }

  ngOnInit() {
    this.loadAllAddress();
  }

  loadAllAddress() {
    this.contactService.contacts$.subscribe((contacts) => {
      this.contacts = contacts;
    });

  }

  newMessage(address: any) {
    this.data.changeMessage(address);
    this.router.navigate(['/details']);
  }
}

