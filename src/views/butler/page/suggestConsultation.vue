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
      <span>建议咨询</span>
    </div>
    <div class="tips">
      <p>
        <span class="el-icon-warning-outline"
              style="margin:0 12px"></span>
        温馨提示：今日新增建议
        <span style="color:rgba(251, 71, 2, 1)">3</span>
        条，质询 <span style="color:rgba(251, 71, 2, 1)">18</span>条
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
          <el-tab-pane label="咨询"
                       name="second"></el-tab-pane>
          <el-tab-pane label="建议"
                       name="third"></el-tab-pane>
        </el-tabs>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'></tableData>
          <div class="table-footer">
            <button @click="drawer_details= true">详情</button>
            <button @click="drawer_details= true">回复</button>
            <button @click="del">删除</button>
          </div>
        </div>
        <table-pagination></table-pagination>
      </div>
    </div>
    <!-- 详情 -->
    <drawerDetails :drawerVrisible='drawer_details'
                   @handleClose='getClose'></drawerDetails>
    <!-- 删除 提示弹窗-->
    <Dialog :dialogVisible='dialog_visible'
            :dialog_config='dialog_config'
            @cancel='cancel'
            @confirm='confirm'>
    </Dialog>
  </div>
</template>

<script>

import drawerDetails from '@/views/butler/components/suggestConsultation/details.vue'
import Dialog from '@/components/dialog/Dialog.vue'

export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      // 传入dialog的参数
      dialog_config: {
        title: '',
        content: ''
      },
      activeName: 'first',
      // drawerDetails
      drawer_details: false,
      form_item: [
        {
          type: 'startEndDate',
          label: '发布时间',
          rangeSeparator: '~',
          startPlaceholder: '请选择开始日期',
          endPlaceholder: '结束时间',
          prop: 'date1'
        },
        {
          type: 'Input',
          label: '发布人',
          placeholder: '单元/楼栋/房号',
          prop: 'house'
        },

        {
          type: 'Input',
          label: '状态',
          placeholder: '请输入',
          prop: 'pho323ne'
        },
        {
          type: 'Input',
          label: '平分',
          placeholder: '请输入',
          prop: 'houses'
        }
      ],
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '80' },
          { label: '内容', prop: 'table2', width: 'auto' },
          { label: '类型', prop: 'table3', width: '100', sortable: true },
          { label: '发布人', prop: 'table4', width: '100' },
          { label: '发布时间', prop: 'table5', width: 'auto' },
          { label: '状态', prop: 'table6', width: '100', sortable: true },
          { label: '星级', prop: 'table7', width: '200', type: 'Rate' },
          { label: '最后一次回复/提问时间', prop: 'table8', width: 'auto' }
        ],
        table_data: [
          {
            table1: '1',
            table2: '人性潜藏着无限力量，有了渴望，才能激活原本的生活。',
            table3: '建议',
            table4: '王珂佳 ',
            table5: '2020-08-18  02:39:10',
            table6: '已反馈',
            table7: 5,
            table8: '2020-02-18  02:39:10'
          },
          {
            table1: '2',
            table2: '坦诚讲，我认为在小区里开店，你的顾客就是小区业主。',
            table3: '建议',
            table4: '柳橙 ',
            table5: '2020-03-18  02:39:10',
            table6: '已反馈',
            table7: 5,
            table8: '2020-08-18  05:39:10'
          },
          {
            table1: '3',
            table2: '我觉得小区绿化是否能在多多些？',
            table3: '咨询',
            table4: '王珂佳 ',
            table5: '2020-08-18  02:39:10',
            table6: '未反馈',
            table7: '',
            table8: '2020-08-18  02:39:10'
          },
          {
            table1: '4',
            table2: '如何联系到业委会的马泽鹏？',
            table3: '建议',
            table4: '李章 ',
            table5: '2020-08-18  02:39:10',
            table6: '已反馈',
            table7: 3,
            table8: '2020-08-18  02:39:10'
          },
          {
            table1: '5',
            table2: '我们小区老年活动中心在哪里？',
            table3: '咨询',
            table4: '马小明 ',
            table5: '2020-08-18  02:39:10',
            table6: '已反馈',
            table7: 4,
            table8: '2020-08-18  02:39:10'
          },
          {
            table1: '6',
            table2: '小区停车位是否可以在多些',
            table3: '建议',
            table4: '周丽 ',
            table5: '2020-08-18  02:39:10',
            table6: '已反馈',
            table7: 2,
            table8: '2020-08-18  02:39:10'
          }
        ]
      }
    }
  },
  components: {
    drawerDetails,
    Dialog,
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    // table选中行
    tableRow (data) {
      this.table_row = data;
    },
    // 监听子组件取消事件
    cancel (data) {
      this.dialog_visible = false;
    },
    // 监听子组件确认事件
    confirm (data) {
      this.dialog_visible = false;
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    // 删除
    del (data) {
      console.log(this.table_row.table6 + '0000')
      if (JSON.stringify(data) != "{}") {
        this.dialog_config.title = '删除提示'
        if (this.table_row.table6 != '已反馈') {
          this.dialog_config.content = '该条信息，还为回复是否确认删除？'
        } else {
          this.dialog_config.content = '是否确认删除该信息？'

        }
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据');
      }
    },
    // 关闭抽屉
    getClose (data) {
      this.drawer_details = false;
    },
  }
}
</script>
