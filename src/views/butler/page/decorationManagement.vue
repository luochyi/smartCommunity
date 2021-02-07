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
          <span style="color:rgba(251, 71, 2, 1)">{{countNow}}</span>
          户家庭发起装修，共计{{countPerformed}}户家庭未执行
        </p>
      </div>

      <div class="content">
        <div class="content-btn">
          <el-button class="init-button"
                     icon="el-icon-plus"
                     @click="addVrisible=true">新增装修</el-button>
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
                <el-tab-pane label="装修中"
                             name="2"></el-tab-pane>
                <el-tab-pane label="装修结束-未退押金"
                             name="3"></el-tab-pane>
                <el-tab-pane label="已结束"
                             name="4"></el-tab-pane>
                <el-tab-pane label="已作废"
                             name="5"></el-tab-pane>
              </el-tabs>
            </template>
            <template slot="footer">
              <div class="table-footer">
                <button @click='details'>详情</button>
                <button>编辑</button>
                <button>审批</button>
                <button>作废</button>
              </div>
            </template>
          </VueTable>
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
import { userDecorationCountDecorationNow, userDecorationCountPerformed } from '@/api/butler'

import addVrisible from '@/views/butler/components/decorationManagement/add.vue'
import detailsViews from '@/views/butler/components/decorationManagement/details/index.vue'
export default {
  data () {
    return {
      // 控制显示装修详情页面显示
      detailsVrisible: 1,
      addVrisible: false,
      activeName: '0',
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '房屋信息', prop: 'roomName', width: '180' },
          { label: '业主', prop: 'residentName', width: '180' },
          { label: '联系方式', prop: 'residentTel', width: '180' },
          { label: '紧急联系人', prop: 'emergencyContact', width: '180' },
          { label: '联系方式', prop: 'tel', width: '180' },
          { label: '施工单位', prop: 'constructionUnit', width: '180' },
          { label: '门禁卡', prop: 'userAccessCardNum', width: '180' },
          { label: '负责人', prop: 'constructionName', width: '180' },
          { label: '联系方式', prop: 'constructionTel', width: '180' },
          { label: '装修押金', prop: 'decorationDeposit', width: '180' },
          {
            label: '申请时间',
            prop: 'applicationDate',
            width: '180',
            sortable: true,
          },
          {
            label: '预计开始时间',
            prop: 'expectedBegin',
            width: '180',
            sortable: true,
          },
          {
            label: '预计结束时间',
            prop: 'expectedEnd',
            width: '180',
            sortable: true,
          },
          {
            label: '实际开始时间',
            prop: 'actualBegin',
            width: '180',
            sortable: true,
          },
          {
            label: '实际结束时间',
            prop: 'actualEnd',
            width: '180',
            sortable: true,
          },
          { label: '垃圾清运费', prop: 'cleanCost', width: '180' },
          { label: '公共设施修复', prop: 'serviceCost', width: '180' },
          { label: '退还押金', prop: 'refundDeposit', width: '180' },
          { label: '是否退还门禁卡', prop: 'isReturnAccessCard', width: '180' },
          { label: '状态', prop: 'status', width: '180' },
          {
            label: '审批结果',
            prop: 'approveResults',
            width: '180',
          },
          {
            label: '审批人',
            prop: 'approveName',
            width: '180',
          },
          { label: '审批时间', prop: 'approveDate', width: '180' },
          {
            label: '最后一次完工检查情况',
            prop: 'isQualified',
            width: '180',
          },
          {
            label: '备注',
            prop: 'remarks2',
            width: '100',

          },
        ],
        url: 'userDecorationList',
        table_data: [],
        search_item: [
          {
            type: 'Input',
            label: '房屋信息',
            placeholder: '单元/楼栋/房号',
            prop: 'roomName',
          },
          {
            type: 'Input',
            label: '业主姓名',
            placeholder: '请输入',
            prop: 'residentName',
          },
          {
            type: 'Input',
            label: '业主联系方式',
            placeholder: '请输入',
            prop: 'residentTel',
          },
          {
            type: 'Input',
            label: '最后一次完工检查情况',
            placeholder: '请输入',
            prop: 'isQualified',
          }, {
            type: 'Input',
            label: '审批人',
            placeholder: '请输入',
            prop: 'approveName',
          },
          {
            type: 'Input',
            label: '审批结果',
            placeholder: '请选择审批结果',
            prop: 'approveResults',
          },
          {
            type: 'Input',
            label: '施工单位',
            placeholder: '请输入',
            prop: 'constructionUnit',
          },
          {
            type: 'Input',
            label: '施工负责人',
            placeholder: '请输入',
            prop: 'constructionName',
          },
          {
            type: 'startDate',
            label: '预计开始时间',
            placeholder: '请选择开始日期',
            prop: 'expectedBegin',
          },
          {
            type: 'endDate',
            label: '预计结束时间',
            placeholder: '请选择结束日期',
            prop: 'expectedEnd',
          },
          {
            type: 'Input',
            label: '紧急联系人	',
            placeholder: '请输入',
            prop: 'emergencyContact',
          },
          {
            type: 'Input',
            label: '紧急联系方式	',
            placeholder: '请输入',
            prop: 'tel',
          },
          {
            type: 'Input',
            label: '施工负责人联系方式	',
            placeholder: '请输入',
            prop: 'constructionTel',
          },
          {
            type: 'startDate',
            label: '预计开始时间',
            placeholder: '请选择开始日期',
            prop: 'actualBegin',
          },
          {
            type: 'endDate',
            label: '预计结束时间',
            placeholder: '请选择结束日期',
            prop: 'actualEnd',
          },
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
      // 今日发起装修数量
      countNow: null,
      // 未发起装修数量
      countPerformed: null,
    }
  },
  mounted () {
    this.getTipsData()
  },
  components: {
    addVrisible,
    detailsViews,
  },
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
    tableCheck () {
      this.table_row = arr
    },
    // 子组件触发
    getClose () {
      this.addVrisible = false
    },
    // 发起装修数量
    getTipsData () {
      // 今日发起装修
      userDecorationCountDecorationNow().then(result => {
        this.countNow = result.countNow
      })
      // 共计未装修
      userDecorationCountPerformed().then(result => {
        this.countPerformed = result.countPerformed
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    // 控制显示装修详情页面显示
    details () {
      this.detailsVrisible = 0
    },
    // 关闭查看器
    closeViewer () {
      this.showViewer = false
    },
  },
}
</script>
