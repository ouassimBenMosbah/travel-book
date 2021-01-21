import * as moment from 'moment';
import { Opinion } from '../models/opinion.model';

export const initialTravels = [
  {
    id: '1',
    countryName: 'Paris',
    description: `Capitale du pays du romantisme, de l'amour et du luxe`,
    opinion: Opinion.wishToVisit,
    visited: false,
  },
  {
    id: '2',
    countryName: 'Bruxelles',
    description: 'Capitale du plat pays',
    opinion: Opinion.visitedAndLiked,
    visited: true,
    startingTripDate: moment('10-01-2021', 'DD/MM/YYYY'),
    endingTripDate: moment('15-01-2021', 'DD/MM/YYYY'),
    favoritePlate: 'Frites',
  },
  {
    id: '3',
    countryName: 'Madrid',
    description: `Capitale de l'Espagne`,
    opinion: Opinion.visitedAndDisliked,
    visited: true,
    favoritePlate: 'Paella',
    startingTripDate: moment('20-08-2018', 'DD/MM/YYYY'),
    endingTripDate: moment('25-11-2018', 'DD/MM/YYYY'),
  },
  {
    id: '4',
    countryName: 'Prague',
    description: 'Capitale de la Tchéquie',
    opinion: Opinion.wishToVisit,
    visited: false,
  },
  {
    id: '5',
    countryName: 'Londres',
    description: `Capitale de l'Angleterre`,
    opinion: Opinion.wishToVisit,
    visited: false,
  },
];
