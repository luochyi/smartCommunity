<style scoped>
.row_nav {
  display: flex;
}
.row_nav > .left_nav {
  width: 20%;
  margin-right: 24px;
  border-radius: 0px 4px 4px 0px;
  border: 1px solid #e7e7e7;
}
.left-title {
  display: flex;
  padding: 26px 24px 26px 24px;
  justify-content: space-between;
}
.left-title .title_text {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
}
.left-title > .el-icon-plus {
  font-size: 24px;
}
.row_nav > .right_nav {
  flex: 1;
  border-radius: 0px 4px 4px 0px;
  border: 1px solid #e7e7e7;
  padding: 20px;
}
.ul-list ul li {
  display: block;
  padding-left: 24px;
  height: 44px;
  line-height: 44px;
  cursor: pointer;
}
.ul-list ul li.active {
  background: #fff5f2;
  border-left: 4px solid #fb4702;
}
</style>
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>工单设置</span>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <!-- 头部输入框 -->
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="工单类型管理"
                       name="first">
            <div class="row_nav">
              <div class="left_nav">
                <div class="left-title">
                  <span class="title_text">工单大类</span>
                  <span class="el-icon-plus"></span>
                </div>
                <div class="ul-list">
                  <ul>
                    <li class="active">报修业务</li>
                    <li>绿化服务</li>
                    <li>巡检管理</li>
                  </ul>
                </div>
              </div>
              <div class="right_nav">
                <div class="content-btn">
                  <el-button class="init-button"
                             @click="reviseDrawer = true"
                             icon="el-icon-plus">新增工单类型</el-button>
                </div>
                <div class="content-table"
                     style="width:574px">
                  <tableData :config="table_config1"
                             @clickrow='tableRow'></tableData>
                  <div class="table-footer">
                    <button>编辑</button>
                    <button @click="del(table_row)">删除</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- <table-pagination></table-pagination> -->
          </el-tab-pane>
          <el-tab-pane label="工单限时管理"
                       name="second">
            <div class="right_nav">
              <div class="content-btn">
                <el-button class="init-button"
                           @click="reviseDrawer = true"
                           icon="el-icon-plus">新增工单类型</el-button>
              </div>
              <div class="content-table">
                <tableData :config="table_config"
                           @clickrow='tableRow'></tableData>
                <div class="table-footer">
                  <button>编辑</button>
                  <button @click="del(table_row)"> 删除</button>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 编辑提示弹窗-->
    <Dialog :dialogVisible='dialog_visible'
            :dialog_config='dialog_config'
            @cancel='cancel'
            @confirm='confirm'>
    </Dialog>
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
      table_config1: {
        thead: [
          { label: '编号', prop: 'table1', width: 'auto' },
          { label: '名称', prop: 'table2', width: 'auto' },
        ],
        table_data: [
          {
            table1: "001",
            table2: '一般单',
          },
          {
            table1: "002",
            table2: '加急单',
          },
          {
            table1: "003",
            table2: '加急单',

          },
        ]
      },

      table_config: {
        thead: [
          { label: '编号', prop: 'table1', width: 'auto' },
          { label: '名称', prop: 'table2', width: 'auto' },
          { label: '处理时限（小时）', prop: 'table3', width: 'auto' },
          { label: '备注', prop: 'table4', width: 'auto' },
        ],
        table_data: [
          {
            table1: "001",
            table2: '24小时内处理',
            table3: '出租中',
            table4: '适用于咨询单及其他业务',
          },
          {
            table1: "002",
            table2: '8小时内处理',
            table3: '8',
            table4: '适用于一般单',
          },
          {
            table1: "003",
            table2: '4小时内处理',
            table3: '4',
            table4: '适用于加急单',
          },
        ]
      },
      activeName: 'first',
      value1: 3.7,
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
    },
  }
}
</script>
