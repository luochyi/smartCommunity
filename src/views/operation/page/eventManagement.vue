<template>
  <div class="main-content">
    <div class="main-titel">
      <span>活动管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addEvent = true"
                   icon="el-icon-plus">新增活动</el-button>
      </div>
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="tabs">
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
              <el-tab-pane label="全部"
                           name="0"></el-tab-pane>
              <el-tab-pane label="未开始"
                           name="1"></el-tab-pane>
              <el-tab-pane label="进行中"
                           name="2"></el-tab-pane>
              <el-tab-pane label="已结束"
                           name="3"></el-tab-pane>
            </el-tabs>
          </template>
          <template slot="footer">
            <div class="table-footer">
              <button>修改</button>
              <button @click='del(table_row)'>删除</button>
              <button @click="registratinRecord = true">报名记录</button>
            </div>
          </template>
        </VueTable>
        <el-drawer title="我是标题"
                   :visible.sync="addEvent"
                   size="65%"
                   :with-header="false">
          <add-event></add-event>
        </el-drawer>
        <!-- 报名记录 -->
        <el-drawer title="我是标题"
                   :visible.sync="registratinRecord"
                   size="65%"
                   :with-header="false">
          <registratin-record></registratin-record>
        </el-drawer>
      </div>
    </div>
    <!-- 提示弹窗-->
    <Dialog :dialogVisible='dialog_visible'
            :dialog_config='dialog_config'
            @cancel='cancel'
            @confirm='confirm'>
    </Dialog>
  </div>
</template>
<script>
import addEvent from '@/views/operation/components/eventManagement/addEvent'
import registratinRecord from '@/views/operation/components/eventManagement/registratinRecord'

export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      dialog_config: {
        title: '',
        content: ''
      },
      table_row: [],
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '通知标题', prop: 'title', width: '180' },
          { label: '主办方', prop: 'sponsorUnit', width: '100' },
          { label: '图片', prop: 'imgs', width: 'auto' },
          { label: '活动地点', prop: 'location', width: '140' },
          { label: '活动联系人', prop: 'name', width: '140' },
          { label: '联系电话', prop: 'tel', width: '140' },
          { label: '报名开始时间', prop: 'registrationStartTime', width: '180' },
          { label: '报名截止时间', prop: 'registrationEndTime', width: '180' },
          { label: '活动开始时间', prop: 'activityStartTime', width: '180' },
          { label: '活动结束时间', prop: 'activityEndTime', width: '180' },
          { label: '状态', prop: 'status', width: 'auto' },
          { label: '报名人数', prop: 'registrationNumber', width: ' 180' },
          { label: '收费标准', prop: 'participantsNumber', width: '120' },
          { label: '退费', prop: 'refund', width: '120' },
          { label: '创建人', prop: 'createName', width: '100' },
          { label: '更新时间', prop: 'updateDate', width: '180' },
        ],
        table_data: [],
        url: 'activityManagementList',
        search_item: [
          {
            type: 'Input',
            label: '通知标题',
            placeholder: '请输入内容',
            prop: 'title'
          },
          {
            type: 'startDate',
            label: '活动开始时间',
            placeholder: '请选择开始日期',
            prop: 'activityStartTimeStart',
          },
          {
            type: 'endDate',
            label: '活动结束时间',
            placeholder: '请选择结束时间',
            prop: 'activityStartTimeEnd',
          },
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
      // 添加
      addEvent: false,
      registratinRecord: false,
      activeName: '0',

    }
  },
  components: {
    registratinRecord,
    addEvent
  },
  computed: {},
  methods: {
    handleClick (tab, event) {
      let status = null
      if (this.activeName != 0) {
        status = this.activeName
      } else {
        status = null
      }
      const requestData = {
        pageNum: 1,
        size: 10,
        status: status
      }
      this.$refs.table.requestData(requestData);
    },
    // 删除
    del (data) {
      if (JSON.stringify(data) != "{}") {
        this.dialog_config.title = '删除提示'
        this.dialog_config.content = '是否确认删除？删除无法撤回！'
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据');
      }
    },
    // 发布
    release (data) {
      if (JSON.stringify(data) != "{}") {
        this.dialog_config.title = '发布'
        this.dialog_config.content = '确定现在发布？'
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据');
      }
    },
    // 监听子组件取消事件
    cancel (data) {
      this.dialog_visible = false;
    },
    // 监听子组件确认事件
    confirm (data) {
      this.dialog_visible = false;
      this.$message({
        message: '操作成功',
        type: 'success'
      });
    },
    tableCheck (data) {
      this.table_row = data;
    },
    submitForm (formName) { },
    resetForm (formName) { },
  }
}
</script>
<style scoped>
.main-titel span {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    padding-left: 21px;
}
.content {
    padding: 20px;
}
.content-btn {
    padding-bottom: 20px;
}
.form-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.form-box > .form-input {
    margin-right: 170px;
}
.form-btn {
    flex: 1;
}
.input-box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}
.input-box > div > span {
    color: #999999;
    font-size: 14px;
    padding-right: 10px;
}
.content-table {
    margin-top: 20px;
    border: 1px solid #f5f5f6;
}
</style>
