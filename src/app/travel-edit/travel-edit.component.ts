import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Opinion } from '../core/models/opinion.model';
import { Travel } from '../core/models/travel.model';
import { TravelDataService } from '../core/services/travel-data.service';

@Component({
  selector: 'app-travel-edit',
  templateUrl: './travel-edit.component.html',
  styleUrls: ['./travel-edit.component.scss']
})
export class TravelEditComponent implements OnInit {
  Opinion = Opinion;
  travel!: Travel;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private travelService: TravelDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const travelId = this.route.snapshot.params.id;
    if (travelId) {
      this.travelService.getDetails(travelId).subscribe(data => {
        this.travel = data;
        this.loading = false;
        this.initForm();
      });
    }
  }

  private initForm() {
    this.travelForm.controls['name'].setValue(this.travel.countryName);
    this.travelForm.controls['description'].setValue(this.travel.description);
    this.travelForm.controls['opinion'].setValue(this.travel.opinion);
    if (
      this.travel.endingTripDate &&
      this.travel.favoritePlate &&
      this.travel.startingTripDate
    ) {
      this.travelForm.controls['startingDate'].setValue(
        this.travel.startingTripDate
      );
      this.travelForm.controls['endingDate'].setValue(
        this.travel.endingTripDate
      );
      this.travelForm.controls['favoritePlate'].setValue(
        this.travel.favoritePlate
      );
    } else {
      this.travelForm.controls['favoritePlate'].disable();
      this.travelForm.controls['endingDate'].disable();
      this.travelForm.controls['startingDate'].disable();
    }
  }

  travelForm = this.fb.group(
    {
      name: ['', Validators.required],
      description: ['', Validators.required],
      opinion: [null, Validators.required],
      startingDate: [''],
      endingDate: [''],
      favoritePlate: ['']
    },
    {
      validators: [
        this.endingDateConditionallyRequired,
        this.startingDateConditionallyRequired,
        this.favoritePlateConditionallyRequired
      ]
    }
  );

  endingDateConditionallyRequired(formGroup: FormGroup) {
    if (formGroup.value.opinion !== Opinion.wishToVisit) {
      return Validators.required(formGroup.controls.endingDate)
        ? {
            endingDateConditionallyRequired: true
          }
        : null;
    }
    return null;
  }

  startingDateConditionallyRequired(formGroup: FormGroup) {
    if (formGroup.value.opinion !== Opinion.wishToVisit) {
      return Validators.required(formGroup.controls.startingDate)
        ? {
            startingDateConditionallyRequired: true
          }
        : null;
    }
    return null;
  }

  favoritePlateConditionallyRequired(formGroup: FormGroup) {
    if (formGroup.value.opinion !== Opinion.wishToVisit) {
      return Validators.required(formGroup.controls.favoritePlate)
        ? {
            favoritePlateConditionallyRequired: true
          }
        : null;
    }
    return null;
  }

  onSubmit() {
    const data = this.travelForm.value;
    console.log(data);
    this.travelService.updateTravel(this.travel.id, data);
    this.router.navigate(['list']);
  }

  onOpinionChange(event: MatSelectChange) {
    let selectedOpinion = event.value;
    if (selectedOpinion === Opinion.wishToVisit) {
      this.travelForm.controls['favoritePlate'].disable();
      this.travelForm.controls['endingDate'].disable();
      this.travelForm.controls['startingDate'].disable();
    } else {
      this.travelForm.controls['favoritePlate'].enable();
      this.travelForm.controls['endingDate'].enable();
      this.travelForm.controls['startingDate'].enable();
    }
  }

  returnToList() {
    this.router.navigate(['list']);
  }
}
