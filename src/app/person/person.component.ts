import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PersonDto } from '../person-dto';
import { PersonRestServiceService } from '../person-rest-service.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit, OnDestroy {

  public datasource: Array<PersonDto> = [];
  public totalRecords = 0;
  public loading = false;
  public elementSelecteds: PersonDto[] = [];

  private sub: Subscription = new Subscription();

  constructor(private personRestService: PersonRestServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPersons();
  }

  getAllPersons() {
    this.loading = true;
    this.sub.add(this.personRestService.getAllPersons().subscribe(data => {
      this.datasource = data;
    }, error => console.error('Error: ' + error), () => {
      this.totalRecords = this.datasource.length;
      this.loading = false;
    }));
  }

  updatePersons() {
    this.loading = true;
    let result;
    this.sub.add(this.personRestService.updatePersons(this.elementSelecteds).subscribe(data => {
      result = data;
    }, error => console.error('Error: ' + error), () => {
      this.loading = false;
      this.router.navigate(['/person']);
      this.elementSelecteds = [];
    }));
  }

  process() {
    if (this.elementSelecteds && this.elementSelecteds.length > 0) {
      this.elementSelecteds.forEach(person => {
        person.processed = true;
      });
      this.updatePersons();
    } else {
      alert('Debe seleccionar registros para procesar');
    }
  }

  addPerson() {
    this.router.navigate(['/person-detail']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
