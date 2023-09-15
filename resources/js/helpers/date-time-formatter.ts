export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZone: 'Europe/Amsterdam'
  };
  const formattedDate = date.toLocaleString('nl', options as Intl.DateTimeFormatOptions);
  
  return formattedDate;
};