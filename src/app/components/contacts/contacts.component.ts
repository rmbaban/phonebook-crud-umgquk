import {Component, OnInit} from '@angular/core';
import {ContactService} from '../../services/contact.service';
import {Contact} from '../../models/contact';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];

  columns = ['name', 'email', 'number', 'tags', 'actions'];

  constructor(private contactService: ContactService, private router: Router) {
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactService.retrieveContacts()
      .subscribe(result => {
        this.contacts = result;
        console.log(this.contacts);
      }, error => {
        console.log('Http error => ', error);
      });
  }

  onViewContactClick(contact: Contact) {
    console.log(contact);
    this.router.navigate(['/contacts', contact.id]);
  }

  onEditContactClick(contact: Contact) {
    console.log(contact);
    this.router.navigate(['/contacts', contact.id, 'edit']);
  }

  onDeleteContactClick(contact: Contact) {
    console.log(contact);
    this.contactService.deleteContact(contact.id)
      .subscribe(result => {
        console.log(result);
        this.contacts.splice(this.contacts.indexOf(contact), 1);
      }, error => {
        console.log('http error => ', error);
      });
  }

}
