import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { Opinion } from '../core/models/opinion.model';
import { TravelDataService } from '../core/services/travel-data.service';

@Component({
  selector: 'app-travel-add',
  templateUrl: './travel-add.component.html',
  styleUrls: ['./travel-add.component.scss']
})
export class TravelAddComponent implements OnInit {

  Opinion = Opinion;

  constructor(
    private fb: FormBuilder,
    private travelService: TravelDataService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  travelForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    opinion: [null, Validators.required],
    startingDate: [''],
    endingDate: [''],
    favoritePlate: [''],
  },{
    validators: [this.endingDateConditionallyRequired,this.startingDateConditionallyRequired, this.favoritePlateConditionallyRequired]
  })

  endingDateConditionallyRequired(formGroup: FormGroup) {
    if (formGroup.value.opinion !== Opinion.wishToVisit) {
      return Validators.required(formGroup.controls.endingDate) ? {
        endingDateConditionallyRequired: true,
      } : null;
    }
    return null;
  }

  startingDateConditionallyRequired(formGroup: FormGroup) {
    if (formGroup.value.opinion !== Opinion.wishToVisit) {
      return Validators.required(formGroup.controls.startingDate) ? {
        startingDateConditionallyRequired: true,
      } : null;
    }
    return null;
  }

  favoritePlateConditionallyRequired(formGroup: FormGroup) {
    if (formGroup.value.opinion !== Opinion.wishToVisit) {
      return Validators.required(formGroup.controls.favoritePlate) ? {
        favoritePlateConditionallyRequired: true,
      } : null;
    }
    return null;
  }

  onSubmit() {
    const data = this.travelForm.value;
    this.travelService.createTravel(data);
    this.router.navigate(['list'])
  }

  onOpinionChange(event: MatSelectChange){
    let selectedOpinion = event.value;
    if(selectedOpinion === Opinion.wishToVisit){
      this.travelForm.controls['favoritePlate'].disable();
      this.travelForm.controls['endingDate'].disable();
      this.travelForm.controls['startingDate'].disable();
    }
    else {
      this.travelForm.controls['favoritePlate'].enable();
      this.travelForm.controls['endingDate'].enable();
      this.travelForm.controls['startingDate'].enable();
    }
  }

  returnToList(){
    this.router.navigate(['list']);
  }
}
