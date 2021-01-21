import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { EMPTY, Observable, of } from 'rxjs';
import { Opinion } from '../models/opinion.model';
import { Travel } from '../models/travel.model';

@Injectable({
  providedIn: 'root'
})
export class TravelDataService {
  private travels: Travel[] = [
    {
      id: '1',
      countryName: 'Paris',
      description: "Capitale du pays du romantisme, de l'amour et du luxe",
      opinion: Opinion.wishToVisit,
      visited: false
    },
    {
      id: '2',
      countryName: 'Bruxelles',
      description: 'Capitale du plat pays',
      opinion: Opinion.visitedAndLiked,
      visited: true,
      startingTripDate: moment('10-01-2021', 'DD/MM/YYYY'),
      endingTripDate: moment('15-01-2021', 'DD/MM/YYYY'),
      favoritePlate: 'Frites'
    },
    {
      id: '3',
      countryName: 'Madrid',
      description: "Capitale de l'Espagne",
      opinion: Opinion.visitedAndDisliked,
      visited: true,
      favoritePlate: 'Paella',
      startingTripDate: moment('20-08-2018', 'DD/MM/YYYY'),
      endingTripDate: moment('25-11-2018', 'DD/MM/YYYY')
    },
    {
      id: '4',
      countryName: 'Prague',
      description: 'Capitale de la Tchéquie',
      opinion: Opinion.wishToVisit,
      visited: false
    },
    {
      id: '5',
      countryName: 'Londres',
      description: "Capitale de l'Angleterre",
      opinion: Opinion.wishToVisit,
      visited: false
    }
  ];

  nextId = 6;

  constructor() {}

  public getTravels(): Observable<Travel[]> {
    return of(this.travels);
  }

  public deleteTravel(id: string): void {
    const index = this.travels.findIndex(elem => elem.id === id);
    this.travels = this.travels.splice(index, 1);
  }

  public createTravel(data: any): void {
    const travel = new Travel(
      this.nextId.toString(),
      data.name,
      data.description,
      data.opinion,
      data.startingDate,
      data.endingDate,
      data.favoritePlate
    );
    this.travels = this.travels.concat(this.travels, [travel]);
    this.nextId++;
  }

  public getDetails(id: string): Observable<Travel> {
    const index = this.travels.findIndex(elem => elem.id === id);
    const travel = this.travels[index];
    if (travel != undefined) {
      return of(travel);
    }
    return EMPTY;
  }

  public updateTravel(id: string, data: any): void {
    const index = this.travels.findIndex(elem => elem.id === id);
    const travel = new Travel(
      id,
      data.name,
      data.description,
      data.opinion,
      data.startingDate,
      data.endingDate,
      data.favoritePlate
    );
    this.travels.splice(index, 1, travel);
  }
}
