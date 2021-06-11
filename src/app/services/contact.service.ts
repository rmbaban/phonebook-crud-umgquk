import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Contact} from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
  }

  retrieveContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${environment.apiHome}/get`);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${environment.apiHome}/post`, contact, {headers: this.headers});
  }

  retrieveContactById(id: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${environment.apiHome}/get/${id}`, {headers: this.headers});
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete(`${environment.apiHome}/delete/${id}`, {headers: this.headers});
  }

  editContact(contact: Contact): Observable<any> {
    return this.http.put<Contact>(`${environment.apiHome}/put`, contact, {headers: this.headers});
  }
}
