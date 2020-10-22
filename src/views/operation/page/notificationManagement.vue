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
      <!-- 查询重制 -->
      <div class="">
        <input-form :formItem="form_item"
                    :btnWidth="'20%'"> </input-form>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'></tableData>
          <div class="table-footer">
            <button @click="viewsDetails = true">详情</button>
            <button>修改</button>
            <button>推送</button>
            <button @click="newNotification = true">发送短信</button>
            <button @click='del(table_row)'>删除</button>
          </div>
        </div>
        <table-pagination></table-pagination>
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
import tablePagination from '@/components/tablePagination'
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
      table_row: {},
      form_item: [
        {
          type: 'Input',
          label: '通知标题',
          placeholder: '请输入内容',
          prop: 'p1'
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
          prop: 'p2'
        }
      ],
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '80' },
          { label: '通知标题', prop: 'table2', width: 'auto' },
          { label: '有效开始时间', prop: 'table3', width: 'auto' },
          { label: '有效结束时间', prop: 'table4', width: 'auto' },
          { label: 'app阅读量', prop: 'table5', width: 'auto' },
          { label: '推送状态', prop: 'table6', width: 'auto' },
          { label: '短信状态', prop: 'table7', width: 'auto' },
          { label: '创建人', prop: 'table8', width: 'auto' },
          { label: '更新时间', prop: 'table9', width: 'auto' },
        ],
        table_data: [
          {
            table1: '1',
            table2: '最佳明星保洁员',
            table3: '2020-12-01',
            table4: '2020-07-18',
            table5: '128',
            table6: '已推送',
            table7: '已发送',
            table8: '任岚岚',
            table9: '2020-12-01'
          },
          {
            table1: '2',
            table2: '华城园最佳维修员',
            table3: '2020-02-14',
            table4: '2020-03-25',
            table5: '99',
            table6: '未推送',
            table7: '未发送',
            table8: '邹悦',
            table9: '2020-02-14'
          }
          ,
          {
            table1: '3',
            table2: '周六组织全小区联谊会地址选择',
            table3: '2020-07-16',
            table4: '2020-05-14',
            table5: '128',
            table6: '已推送',
            table7: '已发送',
            table8: '许智',
            table9: '2020-07-16'
          },
          {
            table1: '4',
            table2: '2019年华城园最美绿化带评选',
            table3: '2020-05-21',
            table4: '2020-07-18',
            table5: '115',
            table6: '未推送',
            table7: '未发送',
            table8: '孙平',
            table9: '2020-05-21'
          },
          {
            table1: '5',
            table2: '元旦联欢会最佳表演组',
            table3: '2020-10-26',
            table4: '2020-01-24',
            table5: '128',
            table6: '未推送',
            table7: '未发送',
            table8: '曹路',
            table9: '2020-10-26'
          },
          {
            table1: '6',
            table2: '植树节地区选举',
            table3: '2020-01-28',
            table4: '2020-08-04',
            table5: '128',
            table6: '已推送',
            table7: '已发送',
            table8: '顾翔翔',
            table9: '2020-01-28'
          },
          {
            table1: '7',
            table2: '五一欢动会',
            table3: '2020-07-16',
            table4: '2020-02-13',
            table5: '128',
            table6: '已推送',
            table7: '已发送',
            table8: '尹颢荃',
            table9: '2020-07-16'
          }
        ]
      },
      // 添加
      viewsDetails: false,
      viewsRecords: false,
      newNotification: false,
      input: '',
      numberValidateForm: {
        age: ''
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
    }
  },
  components: {
    tablePagination,
    newNotification,
    viewsRecords,
    viewsDetails
  },
  computed: {},
  methods: {
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
