import { sortTrips } from './sortFunc';

const trips = [
  {
    endDate: 'Fri Sep 04 2020 12:00:00 GMT+0100',
    id: 'Bn8aU6cUymMasHtN67RK',
    name: 'Italy, sun and friends ',
    startDate: 'Sat Aug 29 2020 12:00:00 GMT+0100',
    summary:
      'A road trip in Liguria and Tuscany along the sea finishing in lovely Bologna ',
    user: 'ykeRVyZntGQudfpzKP9zPTfiPK83',
    userName: 'Elena Cavallero',
  },
  {
    endDate: 'Sun Oct 14 2018 12:00:00 GMT+0100',
    id: 'DLhAuG9aB361JYvt7SqK',
    name: 'Indonesia ',
    startDate: 'Mon Oct 01 2018 12:00:00 GMT+0100',
    summary:
      'Hiking on volcanoes in Java and the beautiful beaches of Karimunjawa ',
    user: 'ykeRVyZntGQudfpzKP9zPTfiPK83',
    userName: 'Elena Cavallero',
  },
  {
    endDate: 'Mon Apr 08 2019 12:00:00 GMT+0100',
    id: 'cINmvfDp1gTAT1XQg1pS',
    name: 'Malta ',
    startDate: 'Thu Apr 04 2019 12:00:00 GMT+0100',
    summary: 'A lovely spring break in sunny Malta ',
    user: 'ykeRVyZntGQudfpzKP9zPTfiPK83',
    userName: 'Elena Cavallero',
  },
  {
    endDate: 'Fri Jan 31 2020 12:00:00 GMT+0000',
    id: 'jaUY5WAl3BP7gB6OyhGv',
    name: 'Mexico ',
    startDate: 'Fri Jan 17 2020 12:00:00 GMT+0000',
    summary: 'Mexico City, Oaxaca, Merida, Valladolid and Holbox ',
    user: 'ykeRVyZntGQudfpzKP9zPTfiPK83',
    userName: 'Elena Cavallero',
  },
  {
    endDate: 'Sun Aug 18 2019 12:00:00 GMT+0100',
    id: 'yXfl8U1yse0tOzfzQQzh',
    name: 'Montenegro ',
    startDate: 'Mon Aug 05 2019 12:00:00 GMT+0100',
    summary: 'Hiking, lakes, rafting and lots of sun ',
    user: 'ykeRVyZntGQudfpzKP9zPTfiPK83',
    userName: 'Elena Cavallero',
  },
];
const ascending = [
  {
    endDate: 'Sun Oct 14 2018 12:00:00 GMT+0100',
    id: 'DLhAuG9aB361JYvt7SqK',
    name: 'Indonesia ',
    startDate: 'Mon Oct 01 2018 12:00:00 GMT+0100',
    summary:
      'Hiking on volcanoes in Java and the beautiful beaches of Karimunjawa ',
    user: 'ykeRVyZntGQudfpzKP9zPTfiPK83',
    userName: 'Elena Cavallero',
  },
  {
    endDate: 'Mon Apr 08 2019 12:00:00 GMT+0100',
    id: 'cINmvfDp1gTAT1XQg1pS',
    name: 'Malta ',
    startDate: 'Thu Apr 04 2019 12:00:00 GMT+0100',
    summary: 'A lovely spring break in sunny Malta ',
    user: 'ykeRVyZntGQudfpzKP9zPTfiPK83',
    userName: 'Elena Cavallero',
  },
  {
    endDate: 'Sun Aug 18 2019 12:00:00 GMT+0100',
    id: 'yXfl8U1yse0tOzfzQQzh',
    name: 'Montenegro ',
    startDate: 'Mon Aug 05 2019 12:00:00 GMT+0100',
    summary: 'Hiking, lakes, rafting and lots of sun ',
    user: 'ykeRVyZntGQudfpzKP9zPTfiPK83',
    userName: 'Elena Cavallero',
  },
  {
    endDate: 'Fri Jan 31 2020 12:00:00 GMT+0000',
    id: 'jaUY5WAl3BP7gB6OyhGv',
    name: 'Mexico ',
    startDate: 'Fri Jan 17 2020 12:00:00 GMT+0000',
    summary: 'Mexico City, Oaxaca, Merida, Valladolid and Holbox ',
    user: 'ykeRVyZntGQudfpzKP9zPTfiPK83',
    userName: 'Elena Cavallero',
  },
  {
    endDate: 'Fri Sep 04 2020 12:00:00 GMT+0100',
    id: 'Bn8aU6cUymMasHtN67RK',
    name: 'Italy, sun and friends ',
    startDate: 'Sat Aug 29 2020 12:00:00 GMT+0100',
    summary:
      'A road trip in Liguria and Tuscany along the sea finishing in lovely Bologna ',
    user: 'ykeRVyZntGQudfpzKP9zPTfiPK83',
    userName: 'Elena Cavallero',
  },
];
const descending = [
  {
    endDate: 'Fri Sep 04 2020 12:00:00 GMT+0100',
    id: 'Bn8aU6cUymMasHtN67RK',
    name: 'Italy, sun and friends ',
    startDate: 'Sat Aug 29 2020 12:00:00 GMT+0100',
    summary:
      'A road trip in Liguria and Tuscany along the sea finishing in lovely Bologna ',
    user: 'ykeRVyZntGQudfpzKP9zPTfiPK83',
    userName: 'Elena Cavallero',
  },
  {
    endDate: 'Fri Jan 31 2020 12:00:00 GMT+0000',
    id: 'jaUY5WAl3BP7gB6OyhGv',
    name: 'Mexico ',
    startDate: 'Fri Jan 17 2020 12:00:00 GMT+0000',
    summary: 'Mexico City, Oaxaca, Merida, Valladolid and Holbox ',
    user: 'ykeRVyZntGQudfpzKP9zPTfiPK83',
    userName: 'Elena Cavallero',
  },
  {
    endDate: 'Sun Aug 18 2019 12:00:00 GMT+0100',
    id: 'yXfl8U1yse0tOzfzQQzh',
    name: 'Montenegro ',
    startDate: 'Mon Aug 05 2019 12:00:00 GMT+0100',
    summary: 'Hiking, lakes, rafting and lots of sun ',
    user: 'ykeRVyZntGQudfpzKP9zPTfiPK83',
    userName: 'Elena Cavallero',
  },
  {
    endDate: 'Mon Apr 08 2019 12:00:00 GMT+0100',
    id: 'cINmvfDp1gTAT1XQg1pS',
    name: 'Malta ',
    startDate: 'Thu Apr 04 2019 12:00:00 GMT+0100',
    summary: 'A lovely spring break in sunny Malta ',
    user: 'ykeRVyZntGQudfpzKP9zPTfiPK83',
    userName: 'Elena Cavallero',
  },
  {
    endDate: 'Sun Oct 14 2018 12:00:00 GMT+0100',
    id: 'DLhAuG9aB361JYvt7SqK',
    name: 'Indonesia ',
    startDate: 'Mon Oct 01 2018 12:00:00 GMT+0100',
    summary:
      'Hiking on volcanoes in Java and the beautiful beaches of Karimunjawa ',
    user: 'ykeRVyZntGQudfpzKP9zPTfiPK83',
    userName: 'Elena Cavallero',
  },
];
describe('Sort trips', () => {
  test('should order the trips array by startDate ', () => {
    expect(sortTrips(trips, 'asc')).toEqual(ascending);
  });
  test('should order the trips array by startDate ', () => {
    expect(sortTrips(trips, 'desc')).toEqual(descending);
  });
});
