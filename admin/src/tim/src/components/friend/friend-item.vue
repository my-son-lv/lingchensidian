<template>
  <div @click="handleFriendClick" :class="{ 'choose': ('C2C' + friend.im_user_id) === currentConversation.conversationID}">
    <el-row class="friend-item-container">
      <div>
        <!-- <el-col :span="6">
        <avatar :src="friend.profile.avatar" />
        </el-col>-->
        <el-col :span="18">
          <div>
            <el-image class="friend-img" v-if="friend.photos != null" :src="friend.photos[0].path"></el-image>
            <el-image class="friend-img" v-else :src="friend.sex == 0 ? '/static/images/man.png' : '/static/images/woman.png'"></el-image>
            <div class="friend-name">{{friend.nick_name||friend.id}}</div>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  props: {
    friend: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleFriendClick() {
      // alert(this.friend.im_user_id)
      this.tim
        .getConversationProfile(`C2C${this.friend.im_user_id}`)
        .then(({ data }) => {
          this.$store.commit("updateCurrentConversation", data.conversation);
        })
        .catch((error) => {
          this.$store.commit("showMessage", {
            type: "error",
            message: error.message,
          });
        });
    },
  },
  computed: {
    ...mapState({
      currentConversation: (state) => state.conversation.currentConversation,
    }),
  },
};
</script>

<style lang="stylus" scoped>
.choose {
  background-color: #eee;
}

.friend-item-container {
  padding: 15px 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.2s;
  border-bottom: 1px solid #EEEEEE;

  // &:first-child
  // padding-top 30px
  &:hover {
    background-color: #EEEEEE;

    .close-btn {
      right: 3px;
    }
  }
}

.friend-name {
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
  float: left;
  width: 60%;
}

.friend-img {
  float: left;
  height: 40px;
  width: 40px;
  border-radius: 40px;
  margin-top: 10px;
  margin-left: 10px;
}

.click_div {
  background: red;
}
</style>
