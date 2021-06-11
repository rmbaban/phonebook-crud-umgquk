import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '../../../services/contact.service';
import {Contact} from '../../../models/contact';
import {ContactFormComponent} from '../contact-form/contact-form.component';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  contactId = '';
  contact: Contact;
  @ViewChild(ContactFormComponent) contactForm: ContactFormComponent;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private contactService: ContactService) {

  }

  ngOnInit() {
    this.contactId = this.activatedRoute.snapshot.params['id'];
    console.log(this.contactId);
    this.getContactById(this.contactId);
  }

  getContactById(id: string) {
    this.contactService.retrieveContactById(id)
      .subscribe(result => {
        this.contact = result && result.length ? result[0] : null;
        if (this.contact) {
          this.contactForm.setFormData(this.contact);
        }
      }, error => {
        console.log('http error => ', error);
      });
  }

  onBtnEditClick() {
    if (this.contactForm.isValid()) {
      this.contactService.editContact({...this.contactForm.getValue(), id: this.contactId})
        .subscribe(result => {
          this.router.navigate(['/']);
        }, error => {
          console.log('http error => ', error);
        });
    }
  }

  onBtnCancelClick() {
    this.router.navigate(['/']);
  }
}
