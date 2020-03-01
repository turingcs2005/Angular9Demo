import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../interfaces/person';
import { PeriodicElement } from '../interfaces/periodic-element';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigService {
  readonly rootUrlData = '../../../assets/json/people.json';
  readonly rootUrlElements = '../../../assets/json/elements.json';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.rootUrlData);
  }

  getPeriodicElements(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.rootUrlElements);
  }

}
