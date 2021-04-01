<template>
  <div>
    <div class="activity_wrapper" v-if="this.activityList.length > 0" @click="jumpDetails">
      <img :src="this.activityList[0].img4_path.path" style="width: 100%; height: 100%" />
    </div>
    <div class="header">
      <el-button :class="[search.type == 1 ? 'header_btn_s' : 'header_btn_u']" @click="header_btn_click(1)">推荐</el-button>
      <el-button :class="[search.type == 3 ? 'header_btn_s' : 'header_btn_u']" @click="header_btn_click(3)">最新</el-button>

      <div class="pay chongzhibtn" @click="chongzhi">重置</div>

      <div class="pay">
        <div class="s1">学历</div>
        <el-select v-model="search.degree" placeholder="Any" size="small" class="select_pay" @change="degree_type_change">
          <el-option v-for="item in studyList" :key="item.id" :label="item.code" :value="item.id"></el-option>
        </el-select>
      </div>

      <div class="pay">
        <div class="s1">薪资</div>
        <el-select v-model="search.pay_type" placeholder="Any" size="small" class="select_pay" @change="pay_type_change">
          <el-option v-for="item in pay_type_list" :key="item.id" :label="item.code" :value="item.id"></el-option>
        </el-select>
      </div>

      <div class="pay">
        <div class="s1">经验</div>
        <el-select v-model="search.seniority" placeholder="Any" size="small" class="select_pay" @change="pay_type_change">
          <el-option v-for="item in seniorityList" :key="item.id" :label="item.code" :value="item.id"></el-option>
        </el-select>
      </div>

      <div class="nationality">
        <div class="s1">国籍</div>
        <el-select v-model="search.language_flg" placeholder="Any" @change="select1_change" size="small" style="width: 120px">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>

        <el-select style="width: 120px; float: right" v-model="search.nationality" placeholder="Any" size="small" no-data-text="Please select Country type first." @change="select2_change">
          <el-option v-for="item in options2" :key="item.id" :label="item.code" :value="item.id"></el-option>
        </el-select>
      </div>
    </div>

    <div class="details" style="overflow: auto" v-if="list.length > 0">
      <div class="list">
        <el-row class="list-item" :gutter="20">
          <el-col :span="8" v-for="(item, index) in list" :key="index">
            <div class="cell">
              <div class="clearfix">
                <img class="user_head fl" v-if="item.photos_path && item.photos_path.length > 0" :src="item.photos_path[0].path" />
                <img class="user_head fl" v-else :src="
                  item.sex == 0
                    ? '/static/images/man.png'
                    : '/static/images/woman.png'
                " />
                <!-- src="../../assets/logo.png" -->
                <div class="user_name">{{ item.name }}</div>
              </div>
              <div class="user_info">
                {{ item.nationality_val }} |
                {{ item.university ? degree[item.university - 1].code : 1 }}
              </div>
              <div class="user_info">
                {{ item.working_seniority | filterWorkingYear }} |
                {{ get_pay(item.pay_type) }}
              </div>

              <div class="user_bottom">
                <img src="../../assets/image/youxuan_icon.png" v-if="item.category == 2" class="good_icon" />
                <el-button class="right" @click="detail_click(item)">详情</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="pagination_div">
        <el-pagination layout="prev, pager, next" :page-count="count" :current-page="search.page" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>

    <div v-else style="text-align: center; margin-top: 150px">
      <img src="../../assets/image/nodata.png" style="width: 281px; height: 216px" />
      <div style="
          font-size: 18px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          letter-spacing: 1px;
        ">
        暂无数据
      </div>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>您已查看10位外教，审核成功后可免费查看全部，添加招聘需求，可加快审核呦</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="write_needs">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./searchteach.js"></script>
<style src="./searchteach.css" scoped></style>
