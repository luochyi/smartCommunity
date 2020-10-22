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
      <span>便民电话</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="drawer_vrisible = true"
                   icon="el-icon-plus">新增电话</el-button>
        <el-button type="init-button2"
                   icon="el-icon-folder-add"
                   plain
                   @click="drawer_Regular = true">定时器检查</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <input-form :formItem="input_form"></input-form>
        <!-- 头部输入框 -->
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'></tableData>
          <div class="table-footer">
            <button>编辑</button>
            <button @click="del">删除</button>
            <button>详情</button>
            <button>发布</button>
          </div>
        </div>
        <table-pagination></table-pagination>
      </div>
    </div>
    <!-- 编辑/删除 提示弹窗-->
    <Dialog :dialogVisible='dialog_visible'
            :dialog_config='dialog_config'
            @cancel='cancel'
            @confirm='confirm'>
    </Dialog>
    <!-- 添加 -->
    <addDrawer :drawerVrisible='drawer_vrisible'
               @handleClose='getClose'></addDrawer>
    <!-- 定时检查 -->
    <Regular :drawerVrisible='drawer_Regular'
             @handleClose='getClose'></Regular>
  </div>
</template>
<script>
import Dialog from '@/components/dialog/Dialog.vue'
import addDrawer from '@/views/butler/components/conveniencePhone/addDrawer.vue'
import Regular from '@/views/butler/components/conveniencePhone/Regular.vue'

// conveniencePhone
export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      // 添加
      drawer_vrisible: false,
      // 添加
      drawer_Regular: false,
      // 传入dialog的参数
      dialog_config: {
        title: '',
        content: ''
      },
      // 选中表格数据
      table_row: {},
      // 搜索重置数据
      input_form: [
        {
          type: 'Input',
          label: '联系名称',
          placeholder: '请输入',
          prop: 'userName'
        },
        {
          type: 'Input',
          label: '联系电话',
          placeholder: '请输入',
          prop: 'phone'
        }
      ],
      // 表格数据
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          { label: '名称', prop: 'table2', width: 'auto' },
          { label: '联系方式', prop: 'table3', width: 'auto' },
          { label: '状态', prop: 'table4', width: 'auto' },
          { label: '下次检查时间', prop: 'table5', width: 'auto' },
          { label: '检查状态', prop: 'table6', width: 'auto' },
          { label: '权重', prop: 'table7', width: 'auto' }
        ],
        table_data: [
          {
            table1: '1',
            table2: '13幢管家服务',
            table3: '18850988790',
            table4: '正常',
            table5: '2019-10-12 ',
            table6: '已检查',
            table7: '9'
          },
          {
            table1: '2',
            table2: '物业前台电话',
            table3: '18850988790',
            table4: '正常',
            table5: '2019-10-12 ',
            table6: '未检查',
            table7: '3'
          },
          {
            table1: '3',
            table2: '维修工小徐',
            table3: '18850988790',
            table4: '正常',
            table5: '2019-10-12 ',
            table6: '已检查',
            table7: '7'
          },
          {
            table1: '4',
            table2: '业委会电话',
            table3: '18850988790',
            table4: '正常',
            table5: '2019-09-12 ',
            table6: '未检查',
            table7: '8'
          },
          {
            table1: '5',
            table2: '顺丰取件电话',
            table3: '18850988790',
            table4: '空号',
            table5: '2019-04-12 ',
            table6: '已检查',
            table7: '9'
          },
          {
            table1: '6',
            table2: '开锁匠',
            table3: '18850988790',
            table4: '有误',
            table5: '2019-10-12 ',
            table6: '未检查',
            table7: '10'
          }
        ]
      }
    }
  },
  components: {
    Dialog,
    addDrawer,
    Regular
  },
  methods: {
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
      if (JSON.stringify(data) != "{}") {
        this.dialog_config.title = '删除提示'
        this.dialog_config.content = '您是否确认删除该联系方式？'
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据');
      }
    },
    // 关闭抽屉
    getClose (data) {
      this.drawer_vrisible = false;
      this.drawer_Regular = false;
      console.log(data + "投票管理父组件");
    },
  }
}
</script>
