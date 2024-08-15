export const calcAge = (birthDate: string) => {
  if (!birthDate) {
    return '없음';
  }

  birthDate = birthDate.replace(/-/g, '');

  const year = parseInt(birthDate.substring(0, 4));
  const month = parseInt(birthDate.substring(4, 6)) - 1; // Month is 0-indexed in Date object
  const day = parseInt(birthDate.substring(6, 8));

  let adjustedYear = year;
  if (new Date(year, month, day) > new Date()) {
    adjustedYear -= 100;
  }

  const birthDateTime = new Date(adjustedYear, month, day);
  const today = new Date();

  let age = today.getFullYear() - birthDateTime.getFullYear();
  const m = today.getMonth() - birthDateTime.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDateTime.getDate())) {
    age--;
  }

  return `만${age}`;
};