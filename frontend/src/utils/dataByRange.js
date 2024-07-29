// src/utils/dataUtils.js

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
        startDate.setMonth(latestDate.getMonth() - 1);
        break;
      case '3m':
        startDate = new Date();
        startDate.setMonth(latestDate.getMonth() - 3);
        break;
      case '6m':
        startDate = new Date();
        startDate.setMonth(latestDate.getMonth() - 6);
        break;
      case '1y':
        startDate = new Date();
        startDate.setFullYear(latestDate.getFullYear() - 1);
        break;
      case 'all':
      default:
        return data;
    }
  
    return data.filter(item => new Date(item.Date) >= startDate);
  };
  