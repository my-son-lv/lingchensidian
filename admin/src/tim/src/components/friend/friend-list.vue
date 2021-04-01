<template>
  <div class="friend-list-container" :class="{'default': !hasFriend}">
    <el-input placeholder="按照昵称搜索" v-model="search_text" class="input-with-select" @input="input_text_change"></el-input>

    <div>
      <div class="teach_list">
        <el-button class="el-icon-arrow-down arrow_btn" type="text" @click="show_company_list = true" v-show="!show_company_list"></el-button>
        <el-button class="el-icon-arrow-up arrow_btn" type="text" @click="show_company_list = false" v-show="show_company_list"></el-button>
        <span class="list_text">我的企业 ({{this.companyList.length}})</span>
      </div>
      <friend-item v-show="show_company_list" v-for="friend in companyList" :key="friend.userID" :friend="friend" />
    </div>

    <div v-if="hasFriend && !isSearching">
      <div class="teach_list">
        <el-button class="el-icon-arrow-down arrow_btn" type="text" @click="show_teach_list = true" v-show="!show_teach_list"></el-button>
        <el-button class="el-icon-arrow-up arrow_btn" type="text" @click="show_teach_list = false" v-show="show_teach_list"></el-button>
        <span class="list_text">其他企业 ({{this.friendList.length}})</span>
      </div>
      <friend-item v-show="show_teach_list" v-for="friend in friendList" :key="friend.userID" :friend="friend" />
    </div>

    <div v-if="hasSearch && isSearching">
      <friend-item v-for="friend in searchList" :key="friend.userID" :friend="friend" />
    </div>
    <!-- <div style="color:gray;" v-else>暂无好友</div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import FriendItem from "./friend-item.vue";
export default {
  data() {
    return {
      show_teach_list: false,
      show_company_list: false,
      search_text: "",
      searchList: [],
    };
  },
  methods: {
    input_text_change(e) {
      this.searchList = [];
      if (!e) {
        return
      }

      var reg = eval("/" + e + "/ig");
      this.friendList.forEach((element) => {
        if (reg.test(element.nick_name)) {
          this.searchList.push(element);
        }
      });

      this.companyList.forEach((element) => {
        if (reg.test(element.nick_name)) {
          this.searchList.push(element);
        }
      });
    },
  },
  components: {
    FriendItem,
  },
  computed: {
    ...mapState({
      friendList: (state) => state.friend.friendList,
      companyList: (state) => state.friend.companyList,
    }),
    hasFriend() {
      return this.friendList.length > 0;
    },
    hasCompany() {
      return this.companyList.length > 0;
    },
    hasSearch() {
      return this.searchList.length > 0;
    },
    isSearching() {
      return this.search_text.length > 0;
    },
  },
};
</script>

<style lang="stylus" scpoed>
.default {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-y: scroll;
}

.friend-list-container {
  height: 100%;
}

.arrow_btn {
  margin-left: 10px;
  font-size: 20px;
  color: rgba(51, 51, 51, 1);
}

.list_text {
  margin-left: 10px;
  color: rgba(51, 51, 51, 1);
}
</style>
