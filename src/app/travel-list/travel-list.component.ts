import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import { Opinion } from '../core/models/opinion.model';
import { Travel } from '../core/models/travel.model';
import { TravelDataService } from '../core/services/travel-data.service';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit {

  public travels: Travel[] = [];

  constructor(
   private travelService: TravelDataService,
   private router: Router
  ) { }

  ngOnInit(): void {
    this.travelService.getTravels().subscribe(data => {
      this.travels = data;
    })
  }

  public goodOpinion(opinion: Opinion){
    return opinion === Opinion.visitedAndLiked;
  }

  public duration(start: Moment, end: Moment): string {
    let diff = end.diff(start, 'days');
    if (diff >= 30) {
      return `${end.diff(start, 'months')} mois`
    }
    else return `${diff} jours`
  }

  public deleteTravel(id: string): void {
    this.travelService.deleteTravel(id);
  }

  public viewTravel(id: string): void {
    this.router.navigate([`details/${id}`]);
  }

  public onAdd(){
    this.router.navigate(['add'])
  }

  public editTravel(id: string): void{
    this.router.navigate([`edit/${id}`]);
  }
}
