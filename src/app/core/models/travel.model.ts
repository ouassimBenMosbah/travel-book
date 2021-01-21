import { Moment } from 'moment';
import { Opinion } from './opinion.model';

export class Travel {
  public id: string;
  public countryName: string;
  public description: string;
  public visited: boolean;
  public opinion: Opinion;
  public startingTripDate?: Moment;
  public endingTripDate?: Moment;
  public favoritePlate?: string;

  public constructor(id: string, countryName: string, description: string, opinion: Opinion, startingTripDate: Moment, endingTripDate: Moment, favoritePlate: string) {
    this.countryName = countryName;
    this.description = description;
    this.opinion = opinion;
    this.id = id;
    if(!startingTripDate && !endingTripDate) {
      this.endingTripDate = undefined;
      this.startingTripDate = undefined;
      this.visited = false;
      this.favoritePlate = undefined;
    }
    else {
      this.startingTripDate = startingTripDate;
      this.endingTripDate = endingTripDate;
      this.favoritePlate = favoritePlate;
      this.visited = true;
    }
  }

}
