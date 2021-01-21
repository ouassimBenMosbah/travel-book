import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { Travel } from '../models/travel.model';
import { initialTravels } from './initial-travels';

@Injectable({
  providedIn: 'root',
})
export class TravelDataService {
  private travels: Travel[] = initialTravels;

  nextId = 6;

  constructor() {}

  public getTravels(): Observable<Travel[]> {
    return of(this.travels);
  }

  public deleteTravel(id: string): void {
    const index = this.travels.findIndex((elem) => elem.id === id);
    this.travels.splice(index, 1);
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
    this.travels = this.travels.concat(travel);
    this.nextId++;
  }

  public getDetails(id: string): Observable<Travel> {
    const index = this.travels.findIndex((elem) => elem.id === id);
    const travel = this.travels[index];
    if (travel != undefined) {
      return of(travel);
    }
    return EMPTY;
  }

  public updateTravel(id: string, data: any): void {
    const index = this.travels.findIndex((elem) => elem.id === id);
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
