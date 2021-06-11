import {Component, OnInit, ViewChild} from '@angular/core';
import {ContactFormComponent} from '../contact-form/contact-form.component';
import {Router} from '@angular/router';
import {ContactService} from '../../../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  @ViewChild(ContactFormComponent) contactForm: ContactFormComponent;

  constructor(private router: Router, private contactService: ContactService) {
  }

  ngOnInit() {
  }

  onBtnAddClick() {
    if (this.contactForm.isValid()) {
      console.log(this.contactForm.getValue());
      this.contactService.addContact(this.contactForm.getValue())
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
