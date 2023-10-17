export const getCorrectDate = (date) => {
  const days = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];

  
  date = new Date(date);
  return `${date.getDay()} ${days[date.getMonth()]} ${date.getFullYear()} року.`;
};
