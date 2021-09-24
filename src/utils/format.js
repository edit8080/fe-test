const decimalFormat = (time) => {
  return time < 10 ? "0" + String(time) : time;
};

// 날짜 Formatting (yyyy-mm-dd)
export const dateFormat = (input) => {
  const date = new Date(input);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${decimalFormat(month)}-${decimalFormat(day)}`;
};
