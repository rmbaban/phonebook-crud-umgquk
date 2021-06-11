import {Component, OnInit} from '@angular/core';
import {Contact} from '../../../models/contact';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', {validators: [Validators.required]}),
      number: new FormControl('', {validators: [Validators.required]}),
      email: new FormControl(''),
      tags: new FormControl(''),
    });
  }

  ngOnInit() {
  }

  setFormData(contact: Contact) {
    this.form.setValue({
      name: contact.name,
      email: contact.email,
      number: contact.number,
      tags: contact.tags + '',
    });
  }

  isValid(): boolean {
    this.isSubmitted = true;
    return this.form.valid;
  }

  getValue(): Contact {
    return {
      ...this.form.value,
      tags: this.form.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      id: ''
    };
  }

}
