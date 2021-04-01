<template>
  <div class="content_t">
    <div class="top_div">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="t1">登录邮箱</div>
          <el-input class="i1" v-model="check_info.email"></el-input>
        </el-col>

        <el-col :span="6">
          <div class="t1">工作年限：</div>
          <el-select v-model="check_info.working_seniority" placeholder=" " class="i1">
            <el-option
              v-for="item in working_seniority_list"
              :key="item.id"
              :label="item.code"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="6">
          <div class="t1">有无签证：</div>
          <el-select v-model="check_info.work_visa_flg" placeholder="全选" class="i1">
            <el-option
              v-for="item in work_visa_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="6">
          <div class="t1">是否在职：</div>
          <el-select v-model="check_info.work_flg" placeholder="全选" class="i1">
            <el-option
              v-for="item in work_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="10" style="margin-top: 20px">
        <el-col :span="6">
          <div class="t1">目标城市：</div>
          <el-select v-model="check_info.working_city" placeholder=" " class="i1">
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.pinyin"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>

        <el-col :span="10">
          <div class="t1">国籍：</div>
          <el-select
            style="width: 40%"
            class="i1"
            v-model="check_info.language_flg"
            placeholder="全选"
            @change="select1_change"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-select
            style="width: 40%"
            v-model="check_info.nationality"
            placeholder="全选"
            class="i1"
          >
            <el-option v-for="item in options2" :key="item.id" :label="item.code" :value="item.id"></el-option>
          </el-select>
        </el-col>

        <el-col :span="6">
          <div class="t1">顾问姓名</div>
          <el-select v-model="check_info.advert" placeholder="全选" class="i1">
            <el-option
              v-for="item in adviserList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="6">
          <div class="t1">姓名</div>
          <el-input class="i1" v-model="check_info.name"></el-input>
        </el-col>
        <el-col :span="6">
          <div class="t1">是否在华：</div>
          <el-select v-model="check_info.in_domestic" placeholder="全选" class="i1">
            <el-option
              v-for="item in InChinaList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <div style="margin-top: 20px" class="clearfix">
        <el-button class="b1" @click="search">查询</el-button>
        <el-button class="b2" @click="reset">重置</el-button>
        <el-button class="b1 add_btn" @click="addTeacher">添加</el-button>
      </div>
    </div>

    <div
      style="
        width: 100%;
        margin-top: 20px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding: 4px;
      "
    >
      <el-table :data="list" style="padding: 0 20px" @row-click="checkElTable">
        <el-table-column fixed="left" label="序号" width="50">
          <template
            slot-scope="scope"
          >{{ scope.$index + (check_info.page - 1) * check_info.pageSize + 1 }}</template>
        </el-table-column>
        <el-table-column fixed="left" label="姓名" width="200" prop="name">
          <template slot-scope="scope">
            <p>
              {{ scope.row.name }}
              <el-tag type="danger" v-if="scope.row.category == 2" size="mini">优选外教</el-tag>
              <el-tag type="success" v-if="scope.row.category == 1" size="mini">普通外教</el-tag>
            </p>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="id" label="用户ID" width="75"></el-table-column> -->
        <el-table-column prop="email" label="登录邮箱" width="250">
          <template slot-scope="scope">
            <div
              @click.stop="handerCopyEmail(scope.row)"
              v-clipboard:copy="scope.row.email"
            >{{ scope.row.email }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="nationality_val" label="国籍" width="180"></el-table-column>
        <el-table-column
          prop="working_seniority"
          label="工作年限"
          width="180"
          :formatter="working_seniority_Format"
        ></el-table-column>
        <el-table-column prop="in_domestic" label="是否在华" width="80">
          <template slot-scope="scope">{{scope.row.in_domestic ? 'Yes' : 'No'}}</template>
        </el-table-column>
        <el-table-column prop="updated_at" label="申请时间" width="190"></el-table-column>
        <el-table-column prop="memo" label="备注" width="180"></el-table-column>
        <el-table-column prop="click_count" label="浏览量" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button class="btn_2" type="text" @click.stop="memoSet(scope.row)">备注</el-button>
            <el-button class="btn_2" type="text" @click.stop="makeHaibao(scope.row.id)">海报</el-button>
            <el-button class="btn_2" type="text" @click.stop="deliveryTeacher(scope.row.mid)">投递</el-button>
            <el-button class="btn_2" type="text" @click.stop="reommJob(scope.row)">推职位</el-button>
            <!-- <el-button class="btn_2" type="text" @click.stop="vip(scope.row)">
              {{
              scope.row.category == 1 ? "转为优选" : "转为普通"
              }}
            </el-button>
            <el-button class="btn_2" type="text" @click.stop="gw_set(scope.row)">顾问配置</el-button>
            <el-button class="btn_2" type="text" @click.stop="activeType(scope.row)">
              {{
              scope.row.sign_flg == 1 ? "转为下线" : "转为上线"
              }}
            </el-button>
            <el-button class="btn_2" type="text" @click.stop="delTeacher(scope.row)">删除</el-button>
            <el-button
              v-if="
                scope.row.invite && Object.keys(scope.row.invite).length > 0
              "
              class="btn_2"
              type="text"
              @click.stop="check_invite(scope.$index, scope.row)"
            >推荐人</el-button>-->

            <!-- <el-popover placement="bottom" width="300" :ref="scope.row.id">
              <div class="wrapper">
                <el-input v-model="inputComment" placeholder="请输入" :maxlength="17"></el-input>
                <div class="sure_btn" @click="handleClickRowComment">确定</div>
              </div>
              <el-button
                class="btn_2"
                type="text"
                slot="reference"
                @click.stop="handleClickComment(scope.row)"
                style="
                      background: none;
                      border: none;
                      padding: 0;
                      margin: 0 10px;
                      color: rgba(7, 140, 169, 1);
                    "
              >点评</el-button>
            </el-popover>-->

            <el-dropdown style="cursor: pointer;">
              <a class="btn_2">
                更多操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button class="btn_2" type="text" @click.stop="vip(scope.row)">
                    {{
                    scope.row.category == 1 ? "转为优选" : "转为普通"
                    }}
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button class="btn_2" type="text" @click.stop="gw_set(scope.row)">顾问配置</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button class="btn_2" type="text" @click.stop="activeType(scope.row)">
                    {{
                    scope.row.sign_flg == 1 ? "转为下线" : "转为上线"
                    }}
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button class="btn_2" type="text" @click.stop="delTeacher(scope.row)">删除</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button
                    v-if="scope.row.invite && Object.keys(scope.row.invite).length > 0"
                    class="btn_2"
                    type="text"
                    @click.stop="check_invite(scope.$index, scope.row)"
                  >推荐人</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button class="btn_2" type="text" @click.stop="lookTimeline(scope.row)">平台记录</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <!-- <el-table-column fixed="right" label="平台记录">
          <template slot-scope="scope">
            <el-button class="btn_2" type="text" @click.stop="lookTimeline(scope.row)">查看</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <page
        :count="count"
        :currentPage="check_info.page"
        v-if="this.count > 0"
        @activePage="activePage"
      ></page>
    </div>

    <el-dialog
      title="推荐职位"
      :visible.sync="reommJobVisible"
      width="30%"
      :before-close="clickReommJobClose"
    >
      <div>
        <label>请选择职位:</label>
        <el-select
          v-model="jobCheckList"
          multiple
          :multiple-limit="2"
          filterable
          placeholder="请选择职位"
          style="margin-left:20px;width:400px;"
        >
          <el-option v-for="item in jobList" :key="item.name" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="buttons">
        <el-button class="btn_l btn1" @click.stop="clickReommJobOk">确定</el-button>
        <el-button class="btn_r btn2" @click.stop="clickReommJobClose">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="推荐人信息" :visible.sync="invite_dialog">
      <div>姓名： {{ invite_data.name }}</div>
      <div>手机号： {{ invite_data.phone }}</div>
      <div>邮箱： {{ invite_data.email }}</div>
    </el-dialog>

    <el-dialog title="顾问配置" :visible.sync="dialogFormVisible">
      <div>公司名称： {{ teacher_name }}</div>
      <div style="margin-top: 40px">
        <span>选择顾问</span>
        <el-select v-model="user_id" placeholder="请选择" style="margin-left: 20px">
          <el-option v-for="item in adviserList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="buttons">
        <el-button class="btn_l btn1" @click.stop="clickSure">确定</el-button>
        <el-button class="btn_r btn2" @click.stop="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogTimeLine" width="30%">
      <div class="block" style="height: 400px; overflow-y: scroll">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :color="timelineColor"
          >
            {{ activity.info }}
            <div class="creat_time">{{ activity.created_at }}</div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogDelivery" width="40%">
      <div class="delivery_content">
        <el-select
          v-model="delivery"
          multiple
          collapse-tags
          style="margin-left: 20px; width: 90%"
          placeholder="请选择"
          filterable
          @change="deliveryChange"
        >
          <el-option
            v-for="item in deliveryOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <div class="right_company clearfix">
          <div class="throw_item" v-for="(item, index) in throwList" :key="index">
            {{ item.name }}
            <i class="el-icon-close" @click="deleteThrow(item.id)"></i>
          </div>
        </div>
        <div class="btn_wrapper" @click="sureThrow">确定投递</div>
      </div>
    </el-dialog>

    <el-dialog title="海报" :visible.sync="haibaoVisible">
      <div class="haibao_div">
        <div class="haibao_div_item" @click="haibaoSelectBtn(1)">
          <img src="https://api.apex.link/haibao/teach_haibao_1.png" class="haibao_s" />
          <img v-if="haibaoType==1" src="../../assets/image/select_png.png" class="haibao_select" />
        </div>
        <div class="haibao_div_item" @click="haibaoSelectBtn(2)">
          <img src="https://api.apex.link/haibao/teach_haibao_2.png" class="haibao_s" />
          <img v-if="haibaoType==2" src="../../assets/image/select_png.png" class="haibao_select" />
        </div>
        <div class="haibao_div_item" @click="haibaoSelectBtn(3)">
          <img src="https://api.apex.link/haibao/teach_haibao_3.png" class="haibao_s" />
          <img v-if="haibaoType==3" src="../../assets/image/select_png.png" class="haibao_select" />
        </div>
        <div class="haibao_div_item" @click="haibaoSelectBtn(4)">
          <img src="https://api.apex.link/haibao/teach_haibao_4.png" class="haibao_s" />
          <img v-if="haibaoType==4" src="../../assets/image/select_png.png" class="haibao_select" />
        </div>
        <div class="haibao_div_item" @click="haibaoSelectBtn(5)">
          <img src="https://api.apex.link/haibao/teach_haibao_5.png" class="haibao_s" />
          <img v-if="haibaoType==5" src="../../assets/image/select_png.png" class="haibao_select" />
        </div>
      </div>
      <div class="buttons">
        <el-button class="btn_l btn1" @click.stop="makeHiabaoPng">确定</el-button>
        <el-button class="btn_r btn2" @click.stop="haibaoVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script src="//kefu.easemob.com/webim/easemob.js?configId=06c93b88-1c09-4b81-bdfd-b9f5db6ee9ca"></script>
<script src="./teachlist.js"></script>
<style src="./teachlist.css" scoped></style>
