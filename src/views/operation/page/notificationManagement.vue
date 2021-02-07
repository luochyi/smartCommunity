<template>
  <div class="main-content">
    <div class="main-titel">
      <span>通知管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   icon="el-icon-plus"
                   @click="newNotification = true">新增公告</el-button>
        <el-button type="init-button2"
                   @click="viewsRecords = true"
                   plain>查看发送记录</el-button>
      </div>
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="footer">
            <div class="table-footer">
              <button @click="viewsDetails = true">详情</button>
              <button>修改</button>
              <button>推送</button>
              <button @click="newNotification = true">发送短信</button>
              <button @click='del(table_row)'>删除</button>
            </div>
          </template>
        </VueTable>
        <!-- 添加 -->
        <el-drawer title="我是标题"
                   :visible.sync="viewsRecords"
                   size="56.26%"
                   :with-header="false">
          <views-records></views-records>
        </el-drawer>
        <!-- 详情 -->
        <el-drawer title="我是标题"
                   :visible.sync="viewsDetails"
                   size="56.26%"
                   :with-header="false">
          <views-details></views-details>
        </el-drawer>
        <!-- 新增 -->
        <el-drawer title="我是标题"
                   :visible.sync="newNotification"
                   size="56.26%"
                   :with-header="false">
          <new-notification></new-notification>
        </el-drawer>
      </div>
      <!-- 提示弹窗-->
      <Dialog :dialogVisible='dialog_visible'
              :dialog_config='dialog_config'
              @cancel='cancel'
              @confirm='confirm'>
      </Dialog>
    </div>
  </div>
</template>
<script>
import viewsRecords from '@/views/operation/components/notificationManagement/viewsRecords'
import newNotification from '@/views/operation/components/notificationManagement/newNotification'
import viewsDetails from '@/views/operation/components/notificationManagement/viewsDetails'

// viewsDetails

// newNotification
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
          { label: '通知标题', prop: 'title', width: 'auto' },
          // { label: '有效开始时间', prop: 'table3', width: 'auto' },
          // { label: '有效结束时间', prop: 'table4', width: 'auto' },
          { label: 'app阅读量', prop: 'readingVolume', width: 'auto' },
          { label: '推送状态', prop: 'pushStatus', width: 'auto' },
          { label: '短信状态', prop: '1', width: 'auto' },
          { label: '创建人', prop: 'createName', width: 'auto' },
          { label: '更新时间', prop: 'updateDate', width: 'auto' },
        ],
        table_data: [],
        url: 'notificationManagementList',
        search_item: [
          {
            type: 'Input',
            label: '通知标题',
            placeholder: '请输入内容',
            prop: 'title'
          },
          {
            type: 'select',
            label: '推送状态',
            value: '',
            options: [
              { label: '已推送', value: '1' },
              { label: '未推送', value: '2' },
            ],
            placeholder: '请选择推送状态',
            prop: 'pushStatus'
          }
        ],
        data: {
          pageNum: 1,
          size: 10
        }
      },
      // 添加
      viewsDetails: false,
      viewsRecords: false,
      newNotification: false,

    }
  },
  components: {
    newNotification,
    viewsRecords,
    viewsDetails
  },
  computed: {},
  methods: {
    tableCheck (data) {
      this.table_row = data;
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
    tableRow (data) {
      this.table_row = data;
    },
    submitForm (formName) { },
    resetForm (formName) { }
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
