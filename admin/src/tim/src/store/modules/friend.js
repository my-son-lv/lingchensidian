const friendModules = {
  state: {
    friendList: [],
    companyList: [],
    createGroupModelVisible: false
  },
  mutations: {
    upadteFriendList(state, friendList) {
      state.friendList = friendList
    },
    upadteCompanyList(state, companyList) {
      state.companyList = companyList
    },
    reset(state) {
      Object.assign(state, {
        friendList: [],
        companyList: [],
        createGroupModelVisible: false
      })
    }
  }
}

export default friendModules
