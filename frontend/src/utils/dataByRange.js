export const filterDataByRange = (data, range) => {
    if (!data || data.length === 0) return [];
  
    // Get the latest date from the data
    const latestDate = new Date(data[0].Date);
    let startDate;
  
    // Create a new Date object to avoid mutating latestDate
    switch (range) {
      case '5d':
        startDate = new Date(latestDate);
        startDate.setDate(latestDate.getDate() - 7);
        break;
      case '1m':
        startDate = new Date(latestDate);
        startDate.setMonth(latestDate.getMonth() - 1);
        break;
      case '3m':
        startDate = new Date(latestDate);
        startDate.setMonth(latestDate.getMonth() - 3);
        break;
      case '6m':
        startDate = new Date(latestDate);
        startDate.setMonth(latestDate.getMonth() - 6);
        break;
      case '1y':
        startDate = new Date(latestDate);
        startDate.setFullYear(latestDate.getFullYear() - 1);
        break;
      case 'all':
      default:
        return data;
    }

    // Filter the data based on the calculated startDate
    return data.filter(item => {
      const itemDate = new Date(item.Date);
      // Check if the item date is within the range
      return itemDate > startDate && itemDate <= latestDate;
    });
  };
  