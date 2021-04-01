// 章节直播状态
const filter = {
  // 格式化面试状态
  filterWorkingYear(val) {
    if (val == 1) {
      return "Less than 1 year";
    } else if (val == 2) {
      return "1 years experience";
    } else if (val == 3) {
      return "2 years experience";
    } else if (val == 4) {
      return "3 years experience";
    } else if (val == 5) {
      return "4 years experience";
    } else if (val == 6) {
      return "5 years experience";
    } else if (val == 7) {
      return "6 years experience";
    } else if (val == 8) {
      return "7 years experience";
    } else if (val == 9) {
      return "8 years experience";
    } else if (val == 10) {
      return "9 years experience";
    } else if (val == 11) {
      return "More than 10years";
    }
  }
};

export default filter;
