import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PersonDto } from '../person-dto';
import { PersonRestServiceService } from '../person-rest-service.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit, OnDestroy {

  public name: string;
  public lastName: string;
  public errorName: string;
  public errorLastName: string;
  public isFormValid = true;
  public response: number;
  public isSuccessData = false;
  public isErrorData = false;
  public successDataMessage: string;
  public errorDataMessage: string;
  public errors: Array<string> = [];
  private person: PersonDto = new PersonDto();
  private sub: Subscription = new Subscription();

  constructor(private personRestService: PersonRestServiceService, private router: Router) { }

  ngOnInit(): void {
    this.errorName = 'El campo Nombre es requerido';
    this.errorLastName = 'El campo Apellido es requerido';
    this.successDataMessage = 'Los datos fueron agregados exitosamente';
    this.errorDataMessage = 'Ocurrió un error al guardar los datos';
  }

  validateFields() {
    if (this.name && this.name !== '') {
      this.person.name = this.name.toUpperCase();
      this.isFormValid = true;
      this.errors = [];
    } else {
      this.isFormValid = false;
      this.errors.push(this.errorName);
      return;
    }

    if (this.lastName && this.lastName !== '') {
      this.person.lastName = this.lastName.toUpperCase();
      this.isFormValid = true;
      this.errors = [];
    } else {
      this.isFormValid = false;
      this.errors.push(this.errorLastName);
      return;
    }
    this.savePerson();
  }

  savePerson() {
    this.sub.add(this.personRestService.savePerson(this.person).subscribe(data => {
      this.response = data;
    }, error => console.error('Error: ' + error), () => {
      if (this.response === 1) {
        this.isSuccessData = true;
        this.isErrorData = false;
      } else {
        this.isSuccessData = false;
        this.isErrorData = true;
      }
      this.clearFields();
    }));
  }

  clearFields() {
    this.name = null;
    this.lastName = null;
    this.isFormValid = false;
    this.errors = [];
  }

  queryData() {
    this.router.navigate(['/person']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
