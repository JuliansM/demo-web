import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PersonDto } from './person-dto';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<PersonDto[]>;

const urlBase = environment.SERVER_API_URL;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,HEAD,DELETE,OPTIONS'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PersonRestServiceService {

  constructor(private http: HttpClient) { }

  savePerson(person: PersonDto): Observable<any> {
    return this.http.post(urlBase.concat('persons'), person, httpOptions);
  }

  getAllPersons(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(urlBase.concat('persons'), {headers: headers});
  }

  updatePersons(persons: Array<PersonDto>): Observable<any> {
    return this.http.put(urlBase.concat('persons'), persons, httpOptions);
  }
}
