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
      <span>拼团管理</span>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <!-- 头部输入框 -->
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="全部拼团"
                       name="first"></el-tab-pane>
          <el-tab-pane label="拼团中"
                       name="second"></el-tab-pane>
          <el-tab-pane label="拼团成功"
                       name="third"></el-tab-pane>
          <el-tab-pane label="拼团失败"
                       name="fourth"></el-tab-pane>
        </el-tabs>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow="tableRow"></tableData>
          <div class="table-footer">
            <button @click="drawer_details = true">查询</button>
            <button @click="del">删除</button>
          </div>
        </div>
        <table-pagination></table-pagination>
      </div>
    </div>
    <!-- 详情 -->
    <drawerDetails :drawerVrisible="drawer_details"
                   @handleClose="getClose"></drawerDetails>
    <!-- 删除 提示弹窗-->
    <Dialog :dialogVisible="dialog_visible"
            :dialog_config="dialog_config"
            @cancel="cancel"
            @confirm="confirm">
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
      table_config: {
        thead: [
          { label: '拼团ID', prop: 'table1', width: '120' },
          { label: '商品ID', prop: 'table2', width: '120' },
          { label: '商品名称', prop: 'table3', width: '580' },
          { label: '状态 ', prop: 'table4', width: '180' },
          { label: '已买/总需', prop: 'table5', width: '120' },
          { label: '开团时间', prop: 'table6', width: '180' },
          { label: '到期时间', prop: 'table7', width: '180' }
        ],
        table_data: [
          {
            table1: '20200001',
            table2: '3187873204',
            table3:
              '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
            table4: '拼团成功-已发货 ',
            table5: '100/100',
            table6: '2020-08-20 09:00',
            table7: '2020-10-19 09:00'
          },
          {
            table1: '20200002',
            table2: '3187872204',
            table3:
              '【超定制】三只松鼠 零食坚果大礼包1490g中秋节礼盒送礼9袋装',
            table4: '拼团中 ',
            table5: '100/100',
            table6: '2020-08-20 09:00',
            table7: '2020-10-19 09:00'
          },
          {
            table1: '20200003',
            table2: '5207915650',
            table3:
              '【超定制】三只松鼠 零食坚果大礼包1490g中秋节礼盒送礼9袋装',
            table4: '拼团失败-已退款',
            table5: '100/100',
            table6: '2020-08-20 09:00',
            table7: '2020-10-19 09:00'
          },
          {
            table1: '20200004',
            table2: '3123873204',
            table3:
              '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
            table4: '拼团成功-已发货 ',
            table5: '100/100',
            table6: '2020-08-20 09:00',
            table7: '2020-10-19 09:00'
          },
          {
            table1: '20200005',
            table2: '5202315650',
            table3:
              '【超定制】三只松鼠 零食坚果大礼包1490g中秋节礼盒送礼9袋装',
            table4: '拼团成功-已发货 ',
            table5: '100/100',
            table6: '2020-08-20 09:00',
            table7: '2020-10-19 09:00'
          }
        ]
      }
    }
  },
  components: {
    drawerDetails,
    Dialog
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    // table选中行
    tableRow (data) {
      this.table_row = data
    },
    // 监听子组件取消事件
    cancel (data) {
      this.dialog_visible = false
    },
    // 监听子组件确认事件
    confirm (data) {
      this.dialog_visible = false
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    // 删除
    del (data) {
      console.log(this.table_row.table6 + '0000')
      if (JSON.stringify(data) != '{}') {
        this.dialog_config.title = '删除提示'
        if (this.table_row.table6 != '已反馈') {
          this.dialog_config.content = '该条信息，还为回复是否确认删除？'
        } else {
          this.dialog_config.content = '是否确认删除该信息？'
        }
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据')
      }
    },
    // 关闭抽屉
    getClose (data) {
      this.drawer_details = false
    }
  }
}
</script>
