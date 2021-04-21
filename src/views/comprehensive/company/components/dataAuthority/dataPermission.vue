<template>
  <div class="data-content">
    <div class="data-box">
      <div class="data-item">
        <div class="data-item_title">
          <span>{{item_title}}</span>
        </div>
        <div class="data-list">
          <ul>
            <li>人员管理</li>
            <li>组织架构管理</li>
            <li class="active">运营管理</li>
            <li>管家服务</li>
            <li>收费服务</li>
          </ul>
        </div>
      </div>
      <div class="permission-item">
        <div class="permission-input">
          <template>
            <span>请选择部门：</span>
            <el-select v-model="select"
                       size="mini"
                       placeholder="请选择"
                       style="width:240px">
              <el-option v-for="item in cities"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </template>
        </div>
        <div class="permission-btn">
          <el-button size="small"
                     type="primary">查询</el-button>
          <el-button size="small">重置</el-button>
        </div>
        <div>
          <el-button size="small"
                     @click="drawer = true"
                     type="primary">新建规则</el-button>
        </div>
        <div class="per-box">
          <div>
            <el-table :data="tableData"
                      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                      style="width: 100%">
              <el-table-column prop="dataName"
                               label="数据来源"
                               width="180">
              </el-table-column>
              <el-table-column prop="allData"
                               label="共享数据"
                               width="180">
              </el-table-column>
              <el-table-column prop="allFw"
                               label="共享范围"
                               width="180">
              </el-table-column>
              <el-table-column prop="status"
                               label="状态"
                               width="180">
              </el-table-column>
              <el-table-column prop="address"
                               label="操作">
                <template>
                  <el-button type="text"
                             @click="drawer=true"
                             size="small">启用</el-button>
                  <el-button type="text"
                             size="small">删除 </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--点击启用之后的弹窗-->
            <template>
              <el-drawer title="我是标题"
                         size="52%"
                         :visible.sync="drawer"
                         :with-header="false">
                <new-drawer></new-drawer>
              </el-drawer>
            </template>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import newDrawer from './newDrawer.vue'
export default {
  data() {
    return {
      drawer: false,
      item_title: '全部数据共享',
      input3: '',
      select: '',
      radio: '3',
      cities: [],
      tableData: [
        {
          date: '2016-05-02',
          dataName: '李龙',
          address: '1',
          allData: '组织架构',
          allFw: '深圳市',
          status: '正常',
        },
        {
          date: '2016-05-02',
          dataName: '张华',
          address: '1',
          allData: '组织架构',
          allFw: '深圳市',
          status: '正常',
        },
        {
          date: '2016-05-02',
          dataName: '李曾',
          address: '1',
          allData: '组织架构',
          allFw: '深圳市',
          status: '正常',
        },
        {
          date: '2016-05-02',
          dataName: '林森',
          address: '1',
          allData: '组织架构',
          allFw: '深圳市',
          status: '正常',
        },
      ],
    }
  },
  components: {
    newDrawer,
  },
  methods: {},
}
</script>

<style scoped>
.data-content {
  width: 100%;
  margin-right: 20px;
}
.data-box {
  width: calc(100% - 40px);
  margin: auto;
  height: 418px;
  margin: 20px 20px 28px 20px;
  display: flex;
  background: #ffffff;
  border-radius: 4px 0px 0px 4px;
}
.data-item_title {
  padding: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 20px;
}
.data-list ul li {
  cursor: pointer;
  padding: 4px 0px 0px 24px;
  height: 32px;
}
.data-list ul li.active {
  background: #f6f6f6;
}
.data-list ul li:hover {
  background: #f6f6f6;
}
.data-item {
  width: 20%;
  border-radius: 4px;
  border: 1px solid #cfd0dd;
  margin-right: 20px;
}
.permission-item {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  border-radius: 0px 4px 4px 0px;
  border: 1px solid #e7e7e7;
}
.permission-item .per-box {
  width: 100%;
}
.permission-input {
  width: 486px;
  margin-right: 88px;
}
.permission-btn {
  flex: 1;
}
</style>
