export const getFormatDate = (dateObj) => {
    //날짜를 '0000-00-00' 으로 포맷해주는 함수
    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() +1).padStart(2,'0');
    const date = String(dateObj.getDate()).padStart(2,'0');

/*
  if (month < 10) {
    month = `0${month}`
  }
  */
    return `${year}-${month}-${date}`;

    
}
