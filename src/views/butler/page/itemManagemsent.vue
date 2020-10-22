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
      <span>物品管理</span>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <!-- 头部输入框 -->
        <input-form :formItem="input_form"></input-form>
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="全部"
                       name="first"></el-tab-pane>
          <el-tab-pane label="正常"
                       name="second"></el-tab-pane>
          <el-tab-pane label="破损"
                       name="third"></el-tab-pane>
        </el-tabs>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'></tableData>
          <div class="table-footer">
            <button>编辑</button>
            <button @click="del(table_row)">删除</button>
            <button>打印二维码</button>
          </div>
        </div>
        <table-pagination></table-pagination>
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
export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      dialog_config: {
        title: '',
        content: ''
      },
      // 选中表格数据
      table_row: {},
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          { label: '物品名称', prop: 'table6', width: 'auto' },
          { label: '照片', prop: 'table7', width: 'auto', type: 'imagebtn' },
          { label: '数量', prop: 'number', width: 'auto' },
          { label: '物品状态', prop: 'status', width: 'auto' },
        ],
        table_data: [
          {
            table1: 1,
            table6: '扳手',
            table7: '1',
            number: '8',
            status: '正常'
          },
          {
            table1: 2,
            table6: '菜刀',
            table7: '1',
            number: '3',
            status: '报损'
          },
          {
            table1: 3,
            table6: '工具箱',
            table7: '1',
            number: '2',
            status: '正常'
          },
          {
            table1: 4,
            table6: '榔头',
            table7: '1',
            number: '2',
            status: '报损'
          },
          {
            table1: 5,
            table6: '梯子',
            table7: '2',
            number: '8',
            status: '正常'
          },
          {
            table1: 6,
            table6: '工具箱',
            table7: '1',
            number: '1',
            status: '正常'
          },
        ]
      },

      activeName: 'first',
      value1: 3.7,
      input_form: [
        {
          type: 'Input',
          label: '物品名称',
          placeholder: '请输入',
          prop: 'hojsuse'
        },

        {
          type: 'select',
          label: '物品状态',
          value: [],
          options: [],
          placeholder: '请选择',
          prop: 'selectstuats'
        }
      ],
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    onSubmit () {
      console.log('submit!')
    },
    tableRow (data) {
      this.table_row = data;
    },
    // 删除
    del (data) {
      console.log(data)
      if (JSON.stringify(data) != "{}") {
        this.dialog_config.title = '删除提示'
        this.dialog_config.content = '是否确认删除？删除无法撤回！'
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
    }
  }
}
</script>
