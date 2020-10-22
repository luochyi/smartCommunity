<style scoped>
.tips {
  margin: 20px;
  height: 38px;
  line-height: 38px;
  background: #fafafa;
  border-radius: 4px;
  opacity: 0.8;
  border: 1px solid #e8e8e8;
}
</style>
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>访客管理</span>
    </div>
    <div class="tips">
      <p>
        <span class="el-icon-warning-outline"
              style="margin:0 12px"></span>
        温馨提示：今日有
        <span style="color:rgba(251, 71, 2, 1)">43</span>
        户家庭申报访客通行
      </p>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <!-- 头部输入框 -->
        <input-form :formItem="form_item"></input-form>
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="全部"
                       name="first"></el-tab-pane>
          <el-tab-pane label="质询"
                       name="second"></el-tab-pane>
          <el-tab-pane label="建议"
                       name="third"></el-tab-pane>
        </el-tabs>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'></tableData>

          <div class="table-footer">
            <button @click="drawer_vrisible = true">编辑</button>
            <button @click="recordVrisible = true">出入记录</button>
            <button @click="invalid(table_row)">作废</button>
            <button @click="del(table_row)">删除</button>
          </div>
        </div>
        <table-pagination></table-pagination>
        <!-- 编辑 -->
        <drawer :drawerVrisible='drawer_vrisible'
                @handleClose='getClose'
                :drawer_config="drawer_config"></drawer>
        <!-- 出入记录 -->
        <record :drawerVrisible='recordVrisible'
                @handleClose='getClose'></record>
        <!-- 作废/删除 提示弹窗-->
        <Dialog :dialogVisible='dialog_visible'
                :dialog_config='dialog_config'
                @cancel='cancel'
                @confirm='confirm'>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import drawer from '@/components/Drawer/drawer.vue'
import record from '@/views/butler/components/visitorManagement/record.vue'
import Dialog from '@/components/dialog/Dialog.vue'

export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      // 传入dialog的参数
      dialog_config: {
        title: '删除提示',
        content: '该活动已经开始投票，不可删除！'
      },
      drawer_vrisible: false,
      recordVrisible: false,
      activeName: 'first',
      // 选中表格数据
      table_row: {},
      form_item: [
        {
          type: 'Input',
          label: '房屋信息',
          placeholder: '单元/楼栋/房号',
          prop: 'house'
        },

        {
          type: 'Input',
          label: '访客姓名',
          placeholder: '请输入',
          prop: 'pho32233ne'
        },
        {
          type: 'select',
          label: '访客性别',
          value: [],
          placeholder: '请输入',
          prop: 'pho32d33ne',
          options: [
            { value: '1', label: '男' },
            { value: '2', label: '女' }
          ]
        },
        {
          type: 'Input',
          label: '车牌号',
          placeholder: '请输入',
          prop: 'pho23323ne'
        },
        {
          type: 'date',
          label: '预约到访时间',
          placeholder: '请输入',
          prop: 'hous2esds'
        },
        {
          type: 'date',
          label: '实际到访时间',
          placeholder: '请输入',
          prop: 'housesds'
        },
        {
          type: 'select',
          label: '通行状态',
          value: [],
          placeholder: '请选择',
          prop: 'pho32d3s3ne',
          options: [
            { value: '1', label: '通行' },
            { value: '2', label: '不通行' }
          ]
        },
        {
          type: 'select',
          label: '类型',
          value: [],
          placeholder: '请选择',
          prop: 'pho32d3ass3ne',
          options: [
            { value: '1', label: '搭车' },
            { value: '2', label: '拉货' }
          ]
        }
      ],
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          { label: '房屋信息', prop: 'table2', width: '130' },
          { label: '类型', prop: 'table3', width: ' 116' },
          { label: '访客姓名', prop: 'table4', width: '116' },
          { label: '访客电话', prop: 'table5', width: '130' },
          { label: '访客性别', prop: 'table6', width: '116' },
          { label: '是否开车', prop: 'table7', width: '116 ' },
          { label: '车牌号', prop: 'table8', width: '160' },
          {
            label: '预约到访时间',
            prop: 'table9',
            width: '160',
            sortable: true
          },
          {
            label: '实际到访时间 ',
            prop: 'table10',
            width: '160',
            sortable: true
          },
          { label: '实际离开时间', prop: 'table11', width: '160' },
          { label: '通信证时效', prop: 'table12', width: '160' },
          { label: '通信状态', prop: 'table13', width: '130', sortable: true }
        ],
        table_data: [
          {
            table1: '1',
            table2: '1-2-0801',
            table3: '业主填写',
            table4: '马泽鹏 ',
            table5: '18850988790',
            table6: '男',
            table7: '是',
            table8: '浙B22CV1',
            table9: '2020-08-20 10:00',
            table10: '',
            table11: '',
            table12: '2020-08-21 10:00',
            table13: '未到'
          },
          {
            table1: '2',
            table2: '12-1-1002',
            table3: '访客填写',
            table4: '刘凡 ',
            table5: '13909078899',
            table6: '女',
            table7: '是',
            table8: '',
            table9: '2020-09-20 10:00',
            table10: '',
            table11: '',
            table12: '2020-08-11 10:00',
            table13: '已过期'
          },
          {
            table1: '3',
            table2: '1-2-0801',
            table3: '访客填写',
            table4: '王珂 ',
            table5: '18850988790',
            table6: '女',
            table7: '是',
            table8: '浙BQ097F',
            table9: '',
            table10: '',
            table11: '',
            table12: '2020-08-21 10:00',
            table13: '未到'
          },
          {
            table1: '4',
            table2: '1-2-0801',
            table3: '业主填写',
            table4: '周玲慧 ',
            table5: '',
            table6: '男',
            table7: '是',
            table8: '',
            table9: '2020-08-20 10:00',
            table10: '',
            table11: '',
            table12: '2020-08-21 10:00',
            table13: '已到'
          },
          {
            table1: '5',
            table2: '1-2-0801',
            table3: '访客填写',
            table4: '叶洪阳 ',
            table5: '13909078899',
            table6: '男',
            table7: '是',
            table8: '浙B22CV1',
            table9: '2020-08-20 10:00',
            table10: '',
            table11: '',
            table12: '2020-08-21 10:00',
            table13: '已到'
          },
          {
            table1: '6',
            table2: '1-2-0801',
            table3: '业主填写',
            table4: '周建 ',
            table5: '18850988790',
            table6: '男',
            table7: '是',
            table8: '浙B22CV1',
            table9: '2020-08-20 10:00',
            table10: '',
            table11: '',
            table12: '2020-08-21 10:00',
            table13: '已到'
          }
        ]
      }
      // 添加抽屉数据
      , drawer_config: {
        drawer_vrisible: false,
        head_title: '访客编辑',
        content_title: '访客信息',
        ruleForm: {
          house: '2-1-1101',
          name: '阎岚',
          sex: '男',
          kaiche: '否',
          chepaihao: '',
          date: '2020-08-20 12:00',
          txsx: "2020-08-19 12:00",
          span: "",
          sjdate: "",
          sjenddate: "",
          sjenddate: "",
          stutas: "未到"
        },
        form_item: [
          {
            type: "Input",
            label: "来访信息",
            placeholder: "请输入",
            width: "100%",
            prop: "house",
          },
          {
            type: "Input",
            label: "访客姓名",
            placeholder: "请输入",
            width: "50%",
            prop: "name",
          },
          {
            type: "Select",
            label: "访客姓名",
            placeholder: "请选择",
            prop: "sex",
            width: "50%",
            options: [
              { label: "男", value: "1" },
              { label: "女", value: "2" },
            ],
          }, {
            type: "Select",
            label: "是否开车",
            placeholder: "请选择",
            prop: "kaiche",
            width: "50%",
            options: [
              { label: "否", value: "1" },
              { label: "是", value: "2" },
            ],
          },
          {
            type: "Input",
            label: "车牌号",
            placeholder: "请输入",
            prop: "chepaihao",
            width: "50%",
          },
          {
            type: "Select",
            label: "预约到访时间",
            placeholder: "请选择",
            prop: "date",
            width: "50%",
            options: [
              { label: "2020-07-18 12:00", value: "1" },
              { label: "2020-12-18 13:00", value: "2" },
              { label: "2020-11-18 12:00", value: "3" }
            ],
          },
          {
            type: "span",
            label: "通行时效",
            width: '50%',
            prop: "txsx",
          },
          {
            type: "Select",
            label: "预约到访时间",
            placeholder: "请选择",
            prop: "sjdate",
            width: "50%",
            options: [
              { label: "2020-07-18 12:00", value: "1" },
              { label: "2020-12-18 13:00", value: "2" },
              { label: "2020-11-18 12:00", value: "3" }
            ],
          }, {
            type: "Select",
            label: "预约离开时间",
            placeholder: "请选择",
            prop: "sjenddate",
            width: "50%",
            options: [
              { label: "2020-07-18 12:00", value: "1" },
              { label: "2020-12-18 13:00", value: "2" },
              { label: "2020-11-18 12:00", value: "3" }
            ],
          },
          {
            type: "Select",
            label: "预约离开时间",
            placeholder: "请选择",
            prop: "stutas",
            width: "50%",
            options: [
              { label: "未到", value: "1" },
              { label: "已到", value: "2" },
              { label: "离开", value: "3" }
            ],
          },
        ],
      },

    }
  },
  components: {
    drawer,
    record,
    Dialog
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    // table选中行
    tableRow (data) {
      this.table_row = data;
    },
    // 删除
    del (data) {
      if (JSON.stringify(data) != "{}") {
        this.dialog_config.title = '删除提示'
        this.dialog_config.content = '是否删除该访客记录'
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据');
      }
    },
    invalid (data) {
      if (JSON.stringify(data) != "{}") {
        this.dialog_config.title = '作废提示'
        this.dialog_config.content = '确认要将访客信息作废吗？（若访客还未到访，作废将导致该访客无法进入）'
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据');
      }
    },
    // 监听子组件取消事件
    cancel (data) {
      this.dialog_visible = false;
      // console.log(data)
    },
    // 监听子组件确认事件
    confirm (data) {
      this.dialog_visible = false;
      this.$message({
        message: '操作成功',
        type: 'success'
      });
    },
    // 关闭抽屉
    getClose (data) {
      this.drawer_vrisible = false;
      this.recordVrisible = false;
      console.log(data + "投票管理父组件");
    },
  }
}
</script>
