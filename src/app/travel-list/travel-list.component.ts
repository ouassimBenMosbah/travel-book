import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { Opinion } from '../core/models/opinion.model';
import { Travel } from '../core/models/travel.model';
import { TravelDataService } from '../core/services/travel-data.service';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss'],
})
export class TravelListComponent implements OnInit {
  public travels$!: Observable<Travel[]>;

  constructor(
    private travelService: TravelDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.travels$ = this.travelService.getTravels();
  }

  public goodOpinion(opinion: Opinion): boolean {
    return opinion === Opinion.visitedAndLiked;
  }

  public duration(start: Moment, end: Moment): string {
    const diff: number = end.diff(start, 'days');
    if (diff >= 30) {
      return `${end.diff(start, 'months')} mois`;
    } else {
      return `${diff} jours`;
    }
  }

  public deleteTravel(id: string): void {
    this.travelService.deleteTravel(id);
  }

  public viewTravel(id: string): void {
    this.router.navigate([`details/${id}`]);
  }

  public onAdd(): void {
    this.router.navigate(['add']);
  }

  public editTravel(id: string): void {
    this.router.navigate([`edit/${id}`]);
  }
}
