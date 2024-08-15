export const formatDate = (date: string | Date, format: string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const map: Record<string, string> = {
    YYYY: dateObj.getFullYear().toString(),
    MM: (dateObj.getMonth() + 1).toString().padStart(2, '0'),
    DD: dateObj.getDate().toString().padStart(2, '0'),
    HH: dateObj.getHours().toString().padStart(2, '0'),
    mm: dateObj.getMinutes().toString().padStart(2, '0'),
    dd: dayNames[dateObj.getDay()] // 요일 추가
  };

  return format.replace(/YYYY|MM|DD|HH|mm|dd/g, match => {
    return map[match];
  });
};