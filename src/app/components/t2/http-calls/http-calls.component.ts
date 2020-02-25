import { Component, OnInit } from '@angular/core';
import { HttpConfigService } from '../../../services/http-config.service';
import { Person } from '../../../interfaces/person';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-http-calls',
  templateUrl: './http-calls.component.html',
  styleUrls: ['./http-calls.component.scss']
})
export class HttpCallsComponent implements OnInit {

  people: Person[];
  people$: Observable<Person[]>;

  constructor(private httpConfigService: HttpConfigService) {
    this.people = [];
  }

  ngOnInit(): void {
  }

  getPeople() {
    this.people = [];
    this.people$ = this.httpConfigService.getPeople();
    this.people$.subscribe(
      res => {
        for ( const i of res ) {
          this.people.push(
            new Person(i.name, i.age)
          );
        }
      }
    );
    console.log('Retrieved Person[] array from static .json file.');
  }

}
