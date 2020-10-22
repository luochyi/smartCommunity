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
      <!-- 查询重制 -->
      <div class="">
        <input-form :formItem="form_item"
                    :btnWidth="'20%'"> </input-form>
        <div>
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="全部"
                         name="first"></el-tab-pane>
            <el-tab-pane label="未开始"
                         name="second"></el-tab-pane>
            <el-tab-pane label="进行中"
                         name="third"></el-tab-pane>
            <el-tab-pane label="已结束"
                         name="fourth"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'></tableData>
          <div class="table-footer">
            <button>修改</button>
            <button @click='del(table_row)'>删除</button>
            <button @click="registratinRecord = true">报名记录</button>
          </div>
        </div>
        <table-pagination></table-pagination>
        <!-- 添加 -->
        <el-drawer title="我是标题"
                   :visible.sync="addEvent"
                   size="56.26%"
                   :with-header="false">
          <add-event></add-event>
        </el-drawer>
        <!-- 报名记录 -->
        <el-drawer title="我是标题"
                   :visible.sync="registratinRecord"
                   size="56.26%"
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
import tablePagination from '@/components/tablePagination'
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
          { label: '通知标题', prop: 'table2', width: '180' },
          { label: '主办方', prop: 'table3', width: '100' },
          { label: '图片', prop: 'table4', width: 'auto' },
          { label: '活动地点', prop: 'table5', width: '140' },
          { label: '活动联系人', prop: 'table6', width: '140' },
          { label: '联系电话', prop: 'table7', width: '140' },
          { label: '报名开始时间', prop: 'table8', width: '180' },
          { label: '报名截止时间', prop: 'table9', width: '180' },
          { label: '活动开始时间', prop: 'table10', width: '180' },
          { label: '活动结束时间', prop: 'table11', width: '180' },
          { label: '状态', prop: 'table12', width: 'auto' },
          { label: '报名人数', prop: 'table13', width: ' 180' },
          { label: '收费标准', prop: 'table14', width: '120' },
          { label: '退费', prop: 'table15', width: '120' },
          { label: '创建人', prop: 'table17', width: '100' },
          { label: '更新时间', prop: 'table18', width: '180' },
        ],
        table_data: [
          {
            table1: '1',
            table2: '社区趣味运动会',
            table3: '物业',
            table4: '查看',
            table5: '社区体育馆',
            table6: '任岚岚',
            table7: '17625310145',
            table8: '2020-08-27 10:00:00',
            table9: '2020-08-20 10:00:00',
            table10: '2020-08-27 10:00:00',
            table11: '2020-09-10 10:00:00',
            table12: '未开始',
            table13: '20',
            table14: '20',
            table15: '',
            table16: '',
            table17: '冯小钻',
            table18: '2020-10-08',
          }

          ,

          {
            table1: '2',
            table2: '社区消防安全意识讲座',
            table3: '物业',
            table4: '查看',
            table5: '社区文化大礼堂',
            table6: '邹悦',
            table7: '17625310145',
            table8: '2020-06-14 10:00:00',
            table9: '2020-08-20 10:00:00',
            table10: '2020-06-20 10:00:00',
            table11: '2020-09-11 10:00:00',
            table12: '进行中 ',
            table13: '20',
            table14: '20',
            table15: '',
            table16: '',
            table17: '叶才耘',
            table18: '2020-10-08',
          },
          {
            table1: '3',
            table2: '社区曲艺文化节',
            table3: '物业',
            table4: '查看',
            table5: '社区文化大礼堂',
            table6: '赵妮妮',
            table7: '18267338170',
            table8: '2020-04-17 10:00:00',
            table9: '2020-07-10 10:00:00',
            table10: '2020-05-27 10:00:00',
            table11: '2020-09-20 10:00:00',
            table12: '已结束',
            table13: '25',
            table14: '25',
            table15: '',
            table16: '',
            table17: '赵宏',
            table18: '2020-10-08',
          },
        ]
      },
      // 添加
      value1: '',
      // 添加
      addEvent: false,
      registratinRecord: false,
      activeName: 'first',
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
    registratinRecord,
    addEvent
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
    resetForm (formName) { },
    handleClick (tab, event) {
      console.log(tab, event)
    }
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
