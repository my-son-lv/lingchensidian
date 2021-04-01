import Index from "../../tim/src/index.vue";
import { create } from "core-js/fn/object";

const menu_list = [
  {
    name: "外教管理",
    select: true,
    image: require("../../assets/image/menu_00.png"),
    children: [
      {
        name: "外教入驻审核",
        path: "/home/checklist",
        select: true
      },
      {
        name: "外教列表管理",
        path: "/home/teachlist",
        select: false
      }
    ]
  },
  {
    name: "企业管理",
    select: false,
    image: require("../../assets/image/menu_01.png"),
    children: [
      {
        name: "企业入驻审核",
        path: "/home/companychecklist",
        select: false
      },
      {
        name: "企业列表管理",
        path: "/home/companylist",
        select: false
      },
      {
        name: "招聘需求列表",
        path: "/home/companyPositionList",
        select: false
      }
    ]
  },
  {
    name: "面试管理",
    select: false,
    image: require("../../assets/image/menu_02.png"),
    children: [
      {
        name: "面试管理列表",
        path: "/home/interviewList",
        select: false
      }
    ]
  },
  {
    name: "签约管理",
    select: false,
    image: require("../../assets/image/menu_03.png"),
    children: [
      {
        name: "可签约列表",
        path: "/home/signawait",
        select: false
      },
      {
        name: "签约管理列表",
        path: "/home/sign",
        select: false
      }
      // {
      //   name: '合同库',
      //   path: '/home/contract',
      //   select: false,
      // }
    ]
  },
  {
    name: "活动管理",
    select: false,
    image: require("../../assets/image/menu_03.png"),
    children: [
      {
        name: "banner管理列表",
        path: "/home/activityList",
        select: false
      }
    ]
  },
  {
    name: "会员管理",
    select: false,
    image: require("../../assets/image/menu_03.png"),
    children: [
      {
        name: "会员管理列表",
        path: "/home/memberList",
        select: false
      },
      {
        name: "会员类型列表",
        path: "/home/memberTypeList",
        select: false
      }
    ]
  }
];

export default {
  components: {
    Index
  },
  inject: ["reload"],
  data() {
    return {
      menu_list: menu_list,
      current_menu: null,
      current_obj: null,
      nick_name: "",
      aside_index: 0, // 记录侧边栏选中状态
      list: [
        {
          name: "外教入驻审核",
          path: "/home/checklist"
        },
        {
          name: "外教列表管理",
          path: "/home/teachlist"
        },
        {
          name: "企业入驻审核",
          path: "/home/companychecklist"
        },
        {
          name: "企业列表管理",
          path: "/home/companylist"
        },
        {
          name: "面试管理列表",
          path: "/home/interviewList"
        }
      ],
      dialogVisible: false,
      timUserId: "",
      messageNavList: [
        {
          value: "全部",
          id: ""
        },
        {
          value: "入驻",
          id: 1
        },
        {
          value: "其他",
          id: 2
        },
        {
          value: "面试",
          id: 3
        }
      ],
      activeClass: 0,
      messageList: [],
      messageType: "",
      showMessage: false,
      showPlatform: false
    };
  },
  methods: {
    getItem(index, id) {
      this.activeClass = index;
      this.messageType = id;
      this.getPlatformNews();
    },
    async getPlatformNews() {
      let res = await this.$fetch("/history", {
        type: this.messageType,
        page: 1,
        pageSize: 2000
      });
      if (res.code == 200) {
        this.messageList = res.data.list;

        if (res.data.list.length > 0) {
          let boxList = res.data.list.filter(ele => ele.read_flg == 1);
          if (boxList.length > 0) {
            this.showMessage = true;
          } else {
            this.showMessage = false;
          }
        }
      }
    },
    handleClickjump(item) {
      if (item.code == 1001 || item.code == 1003 || item.code == 1007) {
        this.$router.push("/home/checklist");
      } else if (item.code == 1002 || item.code == 1004 || item.code == 1008) {
        this.$router.push("/home/companychecklist");
      } else if (
        item.code == 1005 ||
        item.code == 1009 ||
        item.code == 2003 ||
        item.code == 2007 ||
        item.code == 2008 ||
        item.code == 2009
      ) {
        this.$router.push("/home/teachlist");
      } else if (
        item.code == 1006 ||
        item.code == 2001 ||
        item.code == 2004 ||
        item.code == 2010 ||
        item.code == 2011 ||
        item.code == 2012
      ) {
        this.$router.push("/home/companylist");
      } else if (item.code == 2002 || item.code == 2005 || item.code == 2006) {
        this.$router.push("/home/companyPositionList");
      } else if (
        item.code == 3001 ||
        item.code == 3002 ||
        item.code == 3003 ||
        item.code == 3004 ||
        item.code == 3005 ||
        item.code == 3006 ||
        item.code == 3007 ||
        item.code == 3008 ||
        item.code == 3009 ||
        item.code == 3010 ||
        item.code == 3011
      ) {
        this.$router.push("/home/interviewList");
      }
      this.reload();
    },
    handleLClickMessages() {
      this.showPlatform = !this.showPlatform;
    },
    handleClickHistory() {
      this.$router.push("/home/historicalNews");
      this.showPlatform = false;
    },
    async handleClickSure() {
      let res = await this.$post("/read");
      if (res.code == 200) {
        console.log("成功");
        this.getPlatformNews();
      } else {
        this.$message.error(res.msg);
      }
    },
    async getAllTeacher() {
      let res = await this.$fetch("/public/memberAllList");
      if (res.code == 200) {
        sessionStorage.setItem("allTeacherList", JSON.stringify(res.data));
      }
    },
    async logout() {
      let res = await this.$post("logout");
      if (res.code === 200) {
        this.$message.success("登出成功");
        this.$router.replace("/login");
        this.$store.dispatch("logout");
      }
    },
    aside_click(item, obj) {
      this.current_menu = item;
      this.current_obj.select = false;
      obj.select = true;
      this.current_obj = obj;
      this.$router
        .push({
          path: obj.path
        })
        .catch(data => {});
    },
    get_nationality(e) {},
    create_account() {
      this.$router
        .push({
          path: "/home/createaccount"
        })
        .catch(data => {});
    },
    async getAllFriendList() {
      let res = await this.$post("getImUserList");
      if (res.code == 200) {
        this.$store.commit("upadteFriendList", res.data.teach);
        this.$store.commit("upadteCompanyList", res.data.company);
        this.dialogVisible = true;
      }
    },
    getUrl() {
      let currentUrl = window.location.href;
      let currentMenu = currentUrl.split("#")[1];
      this.menu_list.forEach(element => {
        element.children.forEach(children => {
          if (children.path === currentMenu) {
            element.select = true;
            children.select = true;
            this.current_menu.select = false;
            this.current_obj.select = false;
            this.current_menu = element;
            this.current_obj = children;
          }
        });
      });
    }
  },
  mounted: async function() {
    if (!this.$userManager().data) {
      let res = await this.$post("getInfoByToken");
      this.$userManager().data = res.data;
      if (res.code == 200) {
        let userSig = res.data.im_user_sig;
        let userId = res.data.im_user_id;
        sessionStorage.setItem("adminUserSig", userSig);
        sessionStorage.setItem("adminUserId", userId);
      }
    }

    this.nick_name = this.$userManager().data.name;

    this.getUrl();

    this.$router
      .push({
        path: this.current_obj.path
      })
      .catch(data => {});

    this.$bus.$on("closeMask", obj => {
      this.dialogVisible = obj;
      if (obj == false) {
        this.$store.dispatch("logout");
      }
    });
  },
  created() {
    this.current_menu = this.menu_list[0];
    this.current_obj = this.menu_list[0].children[0];
    this.getAllTeacher();
    this.getPlatformNews();
  }
};
