import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Travel } from '../core/models/travel.model';
import { TravelDataService } from '../core/services/travel-data.service';

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html',
  styleUrls: ['./travel-details.component.scss'],
})
export class TravelDetailsComponent implements OnInit {
  public travel!: Travel;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private travelService: TravelDataService
  ) {}

  ngOnInit(): void {
    const travelId = this.route.snapshot.params.id;
    if (travelId) {
      this.travelService.getDetails(travelId).subscribe((data) => {
        this.travel = data;
        this.loading = false;
      });
    }
  }

  public returnToList(): void {
    this.router.navigate(['list']);
  }
}
