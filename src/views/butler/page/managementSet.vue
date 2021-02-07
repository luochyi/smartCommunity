<style scoped>
.row_nav {
    display: flex;
}
.row_nav > .left_nav {
    width: 20%;
    min-height: 500px;
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
    font-weight: bold;
    border-left: 4px solid #fb4702;
}
.main-content {
    min-height: calc(100vh - 160px);
}
</style>
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>工单设置</span>
    </div>
    <div class="content">
      <div class="">
        <el-tabs v-model="activeName"
                 @tab-click="orderHandle">
          <el-tab-pane label="工单类型管理"
                       name="1">
            <div class="row_nav">
              <div class="left_nav">
                <div class="left-title">
                  <span class="title_text">工单大类</span>
                  <span class="el-icon-plus"></span>
                </div>
                <div class="ul-list">
                  <ul>
                    <li v-for="(item,index) in typeList"
                        :key='item.id'
                        :class="index===typeActive?'active':''"
                        @click="typeChange(index,item.id)">{{item.name}}</li>
                  </ul>
                </div>
              </div>
              <div class="right_nav">
                <div class="content-btn">
                  <el-button class="init-button"
                             icon="el-icon-plus">新增工单类型</el-button>
                </div>
                <div class="content-table"
                     style="width:574px">
                  <tableData :config="orderTpeData"
                             @clickrow='tableTypeRow'>

                  </tableData>
                  <div class="table-footer">
                    <button>编辑</button>
                    <button @click="del(table_row)">删除</button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="工单限时管理"
                       name="2">
            <div class="right_nav">
              <div class="content-btn">
                <el-button class="init-button"
                           icon="el-icon-plus">新增工单类型</el-button>
              </div>

              <VueTable ref="table"
                        :config="orderTimeTable"
                        @tableCheck='orderTimeCheck'>
                <template slot="footer">
                  <div class="table-footer">
                    <button>编辑</button>
                    <button @click="orderTimeDel(orderTimeCheckData)"> 删除</button>
                  </div>
                </template>
              </VueTable>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 编辑提示弹窗-->
    <Dialog :dialogVisible='orderTime_visible'
            :dialog_config='dialog_config'
            @cancel='cancel'
            @confirm='orderTimeconfirm'>
    </Dialog>
  </div>
</template>

<script>
import { workOrderType, workOrderTypeList } from '@/api/butler'
export default {
  data () {
    return {
      // 控制dialog显示隐藏
      orderTime_visible: false,
      dialog_config: {
        title: '',
        content: ''
      },
      // 选中表格数据
      table_row: {},
      orderTpeData: {
        thead: [
          { label: '编号', prop: 'id', width: 'auto' },
          { label: '名称', prop: 'name', width: 'auto' },
        ],
        table_data: [
        ],
        loading: true,
      },
      // 类型管理 - 分类
      typeList: [],
      typeActive: 0,
      // 工单时限
      orderTimeTable: {
        thead: [
          { label: '编号', prop: 'id', width: 'auto' },
          { label: '名称', prop: 'name', width: 'auto' },
          { label: '处理时限（小时）', prop: 'remake', width: 'auto' },
          { label: '备注', prop: 'timeLimit', width: 'auto' },
        ],
        table_data: [
        ],
        url: 'workOrderTimeLimitList',
        data: {
          pageNum: 1,
          size: 10
        },
      },
      orderTimeCheckData: [],
      // tab切换
      activeName: '1',
    }
  },
  mounted () {
    this.getType()
  },
  methods: {
    getType () {
      workOrderType().then(res => {
        this.typeList = res
        this.TypeList(res[0].id)
      })
    },
    // 根据工单类型查找table数据
    TypeList (id) {
      let resData = {
        id: id,
      }
      workOrderTypeList(resData).then(res => {
        this.orderTpeData.table_data = res
        this.orderTpeData.loading = false
      })
    },
    typeChange (index, id) {
      this.typeActive = index
      this.TypeList(id)
    },
    orderHandle () {
    },
    onSubmit () {

    },
    tableTypeRow (data) {
      this.table_row = data;
    },
    // 工单时限多选
    orderTimeCheck (data) {
      this.orderTimeCheckData = data
    },
    // 工单时限删除
    orderTimeDel (data) {
      if (data.length) {
        this.dialog_config.title = '删除提示'
        this.dialog_config.content = '是否确认工单时限删除？删除无法撤回！'
        this.orderTime_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据');
      }
    },
    // 监听删除确认确认事件
    orderTimeconfirm () {
      let arr = []
      for (let i = 0; i < this.orderTimeCheckData.length; i++) {
        arr.push(this.orderTimeCheckData[i].id)
      }
      // 调用子组件的方法
      this.$refs.table.tableDelete(arr)
      this.orderTime_visible = false
    },
    // 监听子组件取消事件
    cancel (data) {
      this.orderTime_visible = false;
    },
  }
}
</script>
