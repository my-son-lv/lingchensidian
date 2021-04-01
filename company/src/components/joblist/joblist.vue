<template>
  <div>
    <div class="header">
      <el-button class="header_btn_s" @click="add_job()">创建职位</el-button>
    </div>

    <div class="details" style="overflow: auto" v-if="list.length > 0">
      <div v-infinite-scroll="load" infinite-scroll-disabled="disabled">
        <el-row class="row" v-for="(item, index) in list" :key="index">
          <div class="row_div" v-on:click="cell_click(item, 0)">
            <el-col :span="9">
              <span class="t1">{{ item.name }}</span>
              <span class="top_con" v-if="item.top == 1">置顶</span>
              <span :class="[item.status == 1 ? 's1' : 'c1']">
                {{
                item.status == 1
                ? "开启中"
                : "已关闭"
                }}
              </span>
              <div class="t2">
                {{
                item.job_province_data.short_name
                ? item.job_province_data.short_name
                : "不限"
                }}
                | {{ get_sex(item.sex) }} | {{ get_edu_type(item.edu_type) }} |
                {{ item.pay.replace(",", "-") }}
              </div>
            </el-col>

            <el-col :span="3">
              <div class="t3">计划上岗时间：</div>
              <div class="t2" v-if="item.start_time != null">{{ item.start_time.replace("-", ".") }}</div>
            </el-col>

            <el-col :span="3" >
              <div class="t3" @click.stop="toudishu(item.id)">投递数：</div>
              <div class="t2" @click.stop="toudishu(item.id)" style="color:rgba(7, 140, 169, 1);text-decoration:underline;">{{ item.job_app_num }}</div>
            </el-col>

            <el-col :span="3">
              <div class="t3">发布时间：</div>
              <div class="t2">
                {{
                item.created_at
                .slice(0, 10)
                .replace(new RegExp("-", "g"), ".")
                }}
              </div>
            </el-col>

            <el-col :span="5">
              <el-button class="btn" type="text" @click="cell_click(item, 1)">编辑</el-button>
              <el-button class="btn" type="text" @click="jiping_click(item)">急聘</el-button>
              <el-button
                class="btn"
                type="text"
                @click.stop="handleClickTop(item.id)"
                v-if="item.top == 0"
              >置顶</el-button>
              <el-button
                class="btn"
                type="text"
                @click.stop="handleClickCancelTop(item.id)"
                v-else
              >取消置顶</el-button>

              <el-button class="btn" type="text" @click="tuisong_click(item)">精准推送</el-button>

              <el-tooltip class="item" effect="dark" content="关闭后，外教将无法看到该职位信息" placement="top">
                <el-button
                  class="btn"
                  type="text"
                  @click="cell_click(item, 2)"
                >{{ item.status == 1 ? "关闭" : "开启" }}</el-button>
              </el-tooltip>

              <!-- <el-tooltip class="item" effect="dark" content="删除后，系统将彻底删除该职位信息" placement="top">
                <el-button class="btn" type="text" @click="cell_click(item, 3)">删除</el-button>
              </el-tooltip> -->
            </el-col>
          </div>
        </el-row>
      </div>

      <div class="bottom_tips" v-if="vip == 0">
        <p class="tips_left">
          您当前可免费发布1个职位，加入会员可发布更多职位，享有更多权益
          <span class="tips_active" @click="handleClickExperience">立即体验</span>
        </p>
      </div>
      <div class="bottom_tips" v-else>
        <p class="tips_left">
          尊敬的会员，会员期间可免费开启或关闭职位，升级会员，可发布更多职位
          <span class="tips_active" @click="handleClickExperience">查看权益</span>
        </p>
      </div>

      <p class="p_t" v-if="loading">加载中...</p>
      <p class="p_t" v-if="noMore">没有更多了</p>
    </div>

    <div v-else style="text-align: center; margin-top: 150px">
      <img src="../../assets/image/nodata.png" style="width: 281px; height: 216px" />
      <div
        style="
          font-size: 18px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          letter-spacing: 1px;
        "
      >暂无数据</div>
    </div>
  </div>
</template>

<script src="./joblist.js"></script>
<style src="./joblist.css" scoped></style>
