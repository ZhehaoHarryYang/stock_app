export const filterDataByRange = (data, range) => {
  if (!data || data.length === 0) return [];

  const latestDate = new Date(data[0].Date);
  let startDate;

  switch (range) {
      case '5d':
          startDate = new Date();
          startDate.setDate(latestDate.getDate() - 5);
          break;
      case '1m':
          startDate = new Date();
          startDate.setDate(latestDate.getDate() - 30); // 30 days for 1 month
          break;
      case '3m':
          startDate = new Date();
          startDate.setDate(latestDate.getDate() - 90); // 90 days for 3 months
          break;
      case '6m':
          startDate = new Date();
          startDate.setDate(latestDate.getDate() - 180); // 180 days for 6 months
          break;
      case '1y':
          startDate = new Date();
          startDate.setDate(latestDate.getDate() - 365); // 365 days for 1 year
          break;
      case 'all':
      default:
          return data;
  }

  return data.filter(item => new Date(item.Date) >= startDate);
};
