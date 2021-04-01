import page from "../../public/pagination/pagination";
export default {
  components: { page },
  data() {
    return {
      status_select: 0,
      title: "",
      date: null,
      check_info: {
        page: 1,
        pageSize: 20,
        name: "",
        company_name: ""
      },
      list: [],
      count: 0,
      progressCheckMask: false,
      reverse: false,
      activities: []
    };
  },
  methods: {
    status_click(index) {
      console.log(index);
      this.status_select = index;
    },
    async search() {
      console.log(this.title);
      if (this.date) {
        this.check_info.start_time = this.date[0];
        this.check_info.end_time = this.date[1];
      } else {
        this.check_info.start_time = null;
        this.check_info.end_time = null;
      }

      let res = await this.$fetch("interview/signList", this.check_info);
      if (res.code === 200) {
        this.list = res.data.list;
        this.check_info.page = res.data.page;
        this.count = res.data.count;
      }
    },
    // 接收分页
    async activePage(page) {
      this.check_info.page = page;
      this.$router.push({
        url: window.location.href,
        query: {
          page: this.check_info.page
        }
      });
      let res = await this.$fetch("interview/signList", this.check_info);
      if (res.code === 200) {
        this.list = res.data.list;
        if (this.list.length > 0) {
          this.check_info.page = res.data.page;
          this.count = res.data.count;
        }
      }
    },
    reset() {
      this.check_info.page = 1;
      this.check_info.name = "";
      this.check_info.company_name = "";
    },
    download() {
      console.log("下载");
    },
    gw_flgFormat(row, column) {
      return row.name;
    },
    teach_name_format(row, column) {
      return row.name + "  " + row.last_name;
    },
    sign_click(row) {
      console.log("sign_click");
      this.$router.push({
        path: "/home/signstart",
        query: { interview_id: row.id }
      });
    },
    async handleClickLook(id) {
      this.progressCheckMask = true;
      let res = await this.$post("/interview/interviewSpeed", {
        id: id
      });
      if (res.code == 200) {
        this.activities = res.data;
        if (this.activities.length > 0) {
          this.activities[0].color = "#078CA9";
        }
      }
    }
  },
  created() {
    if (this.$route.query.page) {
      this.check_info.page = this.$route.query.page;
    }
  },
  mounted: async function() {
    this.search();
  },
  activated: async function() {}
};
