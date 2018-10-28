import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact, createInitialContact } from '../models/model-interfaces';
import { emailValidator, urlValidator } from '../validators/app-validators';
import { ContactService } from '../services/contact.service';
import { DataService } from '../services/data.service';
import { ContactStore, ADD, EDIT } from '../store/contact-store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ch-contact-entry',
  templateUrl: './contact-entry.component.html',
  styleUrls: ['./contact-entry.component.scss']
})
export class ContactEntryComponent implements OnInit {
  contact: Contact = createInitialContact();
  contactForm: FormGroup;
  addressesArray: FormArray;
  dataServiceSubscription: Subscription;
  paramsSubscription: Subscription;
  showAddressNumber: boolean = false;
  constructor(private contactService: ContactService, private contactStore: ContactStore,
    fb: FormBuilder, private route: ActivatedRoute, private router: Router, private data: DataService) {
    this.contactForm = fb.group({
      firstname: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, emailValidator]],
      phone: ['', []],
      addresses: fb.array([
        this.createAddressControls()
      ]),
      company: fb.group({
        name: ['', []],
        website: ['', [urlValidator]]
      })
    });
    this.addressesArray = <FormArray>this.contactForm.controls['addresses'];
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params
      .subscribe(params => {
        const flag = (params['flag']);
        if (!flag) {
          this.dataServiceSubscription = this.data.currentMessage.subscribe(message => { this.loadaddress(message); });
        }
      });
  }
 
  checkCount = 0;

  ngOnChanges(changes: SimpleChanges) {
   //e console.log('Contact changed', changes['contact'].currentValue);
    console.log('checkCount', this.checkCount++);
  }

  ngOnDestroy(): void {
    if (this.dataServiceSubscription) {
      this.dataServiceSubscription.unsubscribe();
    }
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  private createAddressControls(): FormGroup {
    return new FormGroup({
      street: new FormControl('', [Validators.required]),
      postcode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required])
    });
  }

  addAddress() {
    this.addressesArray.push(this.createAddressControls());
    return false;
  }

  removeAddress(i: number) {
    this.addressesArray.removeAt(i);
    return false;
  }

  savecontact(value: any) {
    Object.assign(this.contact, value);
    if (this.contact.id) {
      this.contactService.updateContact(this.contact).subscribe(contact => {
        this.contactStore.dispatch({ type: EDIT, data: contact });
        this.contactService.socket.emit('broadcast_contact', { type: EDIT, data: contact });
        const url = '/details/';
        this.newMessage(contact, url);
      });
    } else {
      this.contactService.createContact(this.contact).subscribe(contact => {
        this.contactStore.dispatch({ type: ADD, data: contact });
        this.contactService.socket.emit('broadcast_contact', { type: ADD, data: contact });
        const url = '/details/';
        this.newMessage(contact, url);
      });
    }
  }

  loadaddress(contact) {
    this.adjustAddressesArray(contact.addresses);
    this.contactForm.patchValue(contact);
    this.contact = contact;
    let addressesArr = this.contact.addresses;
    const indexLength = addressesArr.length;
    if (indexLength > 1) {
      this.showAddressNumber = true;
    }
  }

  private adjustAddressesArray(addresses: any[]) {
    const AddressCount = addresses ? addresses.length : 0;
    while (AddressCount > this.addressesArray.controls.length) {
      this.addAddress();
    }
    while (AddressCount < this.addressesArray.controls.length) {
      this.removeAddress(0);
    }
  }

  newMessage(contact, url) {
    this.data.changeMessage(contact);
    this.router.navigate([url]);
  }

  message() {
    alert("I am an alert box!");
  }

}

