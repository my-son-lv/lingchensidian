// 章节直播状态
const filter = {
  // 格式化面试币种
  filterJobYear(val) {
    if (val == 1) {
      return "Less than 1 year";
    } else if (val == 2) {
      return "1-3years";
    } else if (val == 3) {
      return "3-5years";
    } else if (val == 4) {
      return "5-10years";
    } else if (val == 5) {
      return "more than 10 years";
    }
  },
  // 工作类型
  filterJobWorkType(val) {
    if (val == 1) {
      return "Any";
    } else if (val == 2) {
      return "Full-time";
    } else if (val == 3) {
      return "Part-time";
    }
  },
  // 工作性质
  filterWorkType(val) {
    if (val == 1) {
      return "Any";
    } else if (val == 2) {
      return "Offline";
    } else if (val == 3) {
      return "Online";
    }

  },
  // 性别
  filterSex(val) {
    if (val == 0) {
      return "Any";
    } else if (val == 1) {
      return "Male";
    } else if (val == 2) {
      return "Female";
    }
  },
  // 学历
  filterTeachDegree(val) {
    if (val == 1) {
      return "High School Diploma";
    } else if (val == 2) {
      return "Associate's Degree";
    } else if (val == 3) {
      return "Bachelor's Degree";
    } else if (val == 4) {
      return "Master's Degree";
    } else if (val == 5) {
      return "MBA";
    } else if (val == 6) {
      return "PHD";
    }
  },
  // 学历
  filterDegree(val) {
    if (val == 1) {
      return "Bachelor and above";
    } else if (val == 2) {
      return "Master and above";
    } else if (val == 3) {
      return "PHD and above";
    } else if (val == 4) {
      return "Any";
    }
    // ["Bachelor and above", "Master and above", "PHD and above", "Any"]
  },
  // 外教工作年限
  workingSeniority(val) {
    if (val == 1) {
      return "Less than 1 year";
    } else if (val == 2) {
      return "1 year experience";
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
  },
  //   薪资范围
  filterPay(val) {
    if (val == 1) {
      return "10k-13k";
    } else if (val == 2) {
      return "13k-16k";
    } else if (val == 3) {
      return "16k-20k";
    } else if (val == 4) {
      return "20k-25k";
    } else if (val == 5) {
      return ">25k";
    }
  },
  // 签证类型
  filterVisa(val) {
    if (val == 1) {
      return "Z";
    } else if (val == 2) {
      return "M";
    } else if (val == 3) {
      return "F";
    } else if (val == 4) {
      return "X";
    } else if (val == 5) {
      return "others";
    }
  },
  filterJobPayUnit(val) {
    if (val) {
      switch (parseInt(val)) {
        case 1:
          return "Per Hour";
          break;
        case 2:
          return "Per Day";
          break;
        case 3:
          return "Per Week";
          break;
        case 4:
          return "Per Month";
          break;
        case 5:
          return "Per Year";
          break;
      }
    }else{
      return '';
    }
  },
  // 企业工作年限
  filterJobWorkYear(val) {
    if (val == 1) {
      return "Less than 1 year";
    } else if (val == 2) {
      return "1-3years";
    } else if (val == 3) {
      return "3-5years";
    } else if (val == 4) {
      return "5-10years";
    } else if (val == 5) {
      return "more than 10 years";
    }
  }
};
export default filter;
