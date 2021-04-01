// 章节直播状态
const filter = {
  // 格式化人才管理列表状态
  filterState(val) {
    if (val == 0) {
      return '待确认'
    } else if (val == 1) {
      return '待面试'
    } else if (val == 2) {
      return '面试中'
    } else if (val == 3) {
      return '待签约'
    } else if (val == 4) {
      return '已录用'
    } else if (val == 5) {
      return '未通过'
    } else if (val == 6) {
      return '已候选'
    } else if (val == 7) {
      return '已取消'
    } else if (val == 8) {
      return '已过期'
    }

  },
  // 格式化面试管理列表状态
  interViewState(val) {
    if (val == 0) {
      return '已约面'
    } else if (val == 1) {
      return '待面试'
    } else if (val == 2) {
      return '面试中'
    } else if (val == 3) {
      return '待签约'
    } else if (val == 4) {
      return '已录用'
    } else if (val == 5) {
      return '未通过'
    } else if (val == 6) {
      return '已候选'
    } else if (val == 7) {
      return '已取消'
    } else if (val == 8) {
      return '已过期'
    } else if (val == 9) {
      return '已拒绝'
    }
  },
  // 格式化会员管理列表状态
  memberStatus(val) {
    if (val == 1) {
      return '未生效'
    } else if (val == 2) {
      return '正常'
    } else if (val == 3) {
      return '已关闭'
    } else if (val == 4) {
      return '已过期'
    }
  },
};

export default filter;
