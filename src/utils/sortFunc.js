exports.sortTrips = (trips, order) => {
  trips.sort((a, b) => {
    if (order === 'asc') {
      return Date.parse(a.startDate) - Date.parse(b.startDate);
    }
    return Date.parse(b.startDate) - Date.parse(a.startDate);
  });
  return trips;
};
