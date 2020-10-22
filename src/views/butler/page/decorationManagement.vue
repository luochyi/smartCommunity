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
    <div v-if="detailsVrisible">
      <div class="main-titel">
        <span>装修管理</span>
      </div>
      <div class="tips">
        <p>
          <span class="el-icon-warning-outline"
                style="margin:0 12px"></span>
          温馨提示：今日预计有
          <span style="color:rgba(251, 71, 2, 1)">3</span>
          户家庭发起装修，共计8户家庭未执行
        </p>
      </div>

      <div class="content">
        <div class="content-btn">
          <el-button class="init-button"
                     icon="el-icon-plus"
                     @click="addVrisible=true">新增装修</el-button>
        </div>
        <!-- 查询重制 -->
        <div class="">
          <!-- 头部输入框 -->
          <input-form :formItem="input_form"></input-form>
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="全部"
                         name="first"></el-tab-pane>
            <el-tab-pane label="未开始"
                         name="second"></el-tab-pane>
            <el-tab-pane label="装修中"
                         name="third"></el-tab-pane>
            <el-tab-pane label="装修结束-未退押金"
                         name="fourth"></el-tab-pane>
            <el-tab-pane label="已结束"
                         name="third1"></el-tab-pane>
            <el-tab-pane label="已作废"
                         name="third2"></el-tab-pane>
          </el-tabs>
          <div class="content-table">
            <tableData :config="table_config"
                       @clickrow='tableRow'></tableData>
            <div class="table-footer">
              <button @click='details'>详情</button>
              <button>编辑</button>
              <button>审批</button>
              <button>作废</button>
            </div>
          </div>
          <table-pagination></table-pagination>
        </div>
      </div>
      <!-- 添加 -->
      <addVrisible :drawerVrisible='addVrisible'
                   @handleClose='getClose'> </addVrisible>

    </div>
    <div v-else>
      <!-- 装修详情组件 -->
      <detailsViews></detailsViews>
    </div>
  </div>
</template>
<script>
import addVrisible from '@/views/butler/components/decorationManagement/add.vue'
import detailsViews from '@/views/butler/components/decorationManagement/details/index.vue'
export default {
  data () {
    return {
      // 控制显示装修详情页面显示
      detailsVrisible: 1,
      addVrisible: false,
      activeName: 'first',
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '110' },
          { label: '房屋信息', prop: 'table2', width: '180' },
          { label: '业主', prop: 'table3', width: '180' },
          { label: '联系方式', prop: 'table4', width: '180' },
          { label: '紧急联系人', prop: 'table5', width: '180' },
          { label: '联系方式', prop: 'table6', width: '180' },
          { label: '施工单位', prop: 'table7', width: '180' },
          { label: '门禁卡', prop: 'table8', width: '180' },
          { label: '负责人', prop: 'table9', width: '180' },
          { label: '联系方式', prop: 'table10', width: '180' },
          { label: '装修押金', prop: 'table11', width: '180' },
          {
            label: '申请时间',
            prop: 'table12',
            width: '180',
            sortable: true
          },
          {
            label: '预计开始时间',
            prop: 'table13',
            width: '180',
            sortable: true
          },
          {
            label: '预计结束时间',
            prop: 'table14',
            width: '180',
            sortable: true
          },
          {
            label: '实际开始时间',
            prop: 'table15',
            width: '180',
            sortable: true
          },
          {
            label: '实际结束时间',
            prop: 'table16',
            width: '180',
            sortable: true
          },
          { label: '垃圾清运费', prop: 'table17', width: '180' },
          { label: '公共设施修复', prop: 'table18', width: '180' },
          { label: '退还押金', prop: 'table19', width: '180' },
          { label: '是否退还门禁卡', prop: 'table20', width: '180' },
          { label: '状态', prop: 'table21', width: '180' },
          { label: '审批结果', prop: 'table22', width: '180', type: 'txtbtn' },
          { label: '审批时间', prop: 'table23', width: '180' },
          { label: '最后一次完工检查情况', prop: 'table24', width: '180' },
          { label: '备注', prop: 'table25', width: '100', type: 'tooltip' }
        ],
        table_data: [
          {
            table1: 1,
            table2: '1-1-0101',
            table3: '王珂佳',
            table4: '18850988790',
            table5: '周林会',
            table6: '18850988790',
            table7: '宏远装修公司',
            table8: '1',
            table9: '王珂佳',
            table10: '18845355790',
            table11: '¥5000',
            table12: '2020-08-20 12:00',
            table13: '2020-02-05',
            table14: '2020-04-09',
            table15: '2020-04-27',
            table16: '2020-09-14',
            table17: '',
            table18: '',
            table19: '',
            table20: '否',
            table21: '未开始',
            table22: {},
            table23: '',
            table24: '',
            table25: '业主损坏承重墙'
          },
          {
            table1: 2,
            table2: '1-1-102',
            table3: '周晓晓',
            table4: '13909078899',
            table5: '周林会',
            table6: '18850988790',
            table7: '宏远装修公司',
            table8: '1',
            table9: '马泽鹏',
            table10: '18845355790',
            table11: '¥5000',
            table12: '2020-08-20 12:00',
            table13: '2020-09-05',
            table14: '2020-01-09',
            table15: '2020-03-27',
            table16: '2020-02-14',
            table17: '¥1200',
            table18: '¥200',
            table19: '¥1200',
            table20: '是',
            table21: '装修中',
            table22: {},
            table23: '',
            table24: '',
            table25: ''
          },
          {
            table1: 3,
            table2: '1-1-0101',
            table3: '王珂佳',
            table4: '18850988790',
            table5: '周林会',
            table6: '18850988790',
            table7: '宏远装修公司',
            table8: '1',
            table9: '王珂佳',
            table10: '18845355790',
            table11: '¥5000',
            table12: '2020-08-20 12:00',
            table13: '2020-02-05',
            table14: '2020-04-09',
            table15: '2020-04-27',
            table16: '2020-09-14',
            table17: '',
            table18: '',
            table19: '',
            table20: '否',
            table21: '装修结束-已退押金',
            table22: {
              status: '不合格',
              label: '照片'
            },
            table23: '',
            table24: '',
            table25: ''
          },
          {
            table1: 4,
            table2: '1-1-0101',
            table3: '王珂佳',
            table4: '18850988790',
            table5: '周林会',
            table6: '18850988790',
            table7: '宏远搬家公司',
            table8: '1',
            table9: '马小明',
            table10: '18845355790',
            table11: '¥5000',
            table12: '2020-08-20 12:00',
            table13: '2020-03-10 15:12 ',
            table14: '2020-12-01',
            table15: '2020-04-08',
            table16: '2020-09-14',
            table17: '',
            table18: '',
            table19: '',
            table20: '否',
            table21: '装修结束-未退押金',
            table22: {
              status: '合格',
              label: '照片'
            },
            table23: '',
            table24: '',
            table25: '业主损坏承重墙'
          }
        ]
      },
      input_form: [
        {
          type: 'Input',
          label: '房屋信息',
          placeholder: '单元/楼栋/房号',
          prop: 'house'
        },
        {
          type: 'Input',
          label: '业主姓名',
          placeholder: '请输入',
          prop: 'yexm'
        },
        {
          type: 'Input',
          label: '业主联系方式',
          placeholder: '请输入',
          prop: 'yzlxfs'
        },
        {
          type: 'Input',
          label: '最后一次完工检查情况',
          placeholder: '请输入',
          prop: 'zshahsya'
        },
        {
          type: 'Input',
          label: '审批结果',
          placeholder: '请选择审批结果',
          prop: 'yexsm'
        },
        {
          type: 'Input',
          label: '试过单位',
          placeholder: '请输入',
          prop: 'yexxxm'
        },
        {
          type: 'Input',
          label: '审批人',
          placeholder: '请输入',
          prop: 'spr'
        },
        {
          type: 'select',
          label: '出户出口',
          placeholder: '请选择',
          prop: 'sta43tus',
          options: [
            {
              value: '1',
              label: '半年付'
            },
            {
              value: '2',
              label: '一年付'
            }
          ]
        },
        {
          type: 'Input',
          label: '申请人',
          placeholder: '请输入',
          prop: 'pho323ne'
        },
        {
          type: 'Input',
          label: '联系方式',
          placeholder: '请输入',
          prop: 'houses'
        },
        {
          type: 'startEndDate',
          label: '实际出门时间',
          rangeSeparator: '~',
          startPlaceholder: '请选择开始日期',
          endPlaceholder: '结束时间',
          prop: 'date1'
        }
      ]
    }
  },
  components: {
    addVrisible,
    detailsViews
  },
  methods: {
    // 子组件触发
    getClose () {
      this.addVrisible = false
    },
    handleClick (row) {
      console.log(row)
    },
    onSubmit () {
      console.log('submit!')
    },
    // 控制显示装修详情页面显示
    details () {
      this.detailsVrisible = 0;
    },
    // 关闭查看器
    closeViewer () {
      this.showViewer = false
    }
  }
}
</script>
