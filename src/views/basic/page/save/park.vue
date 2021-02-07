<template>
  <div class="main-content">
    <div class="main-titel">
      <span>车辆档案 </span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="reviseDrawer = true"
                   icon="el-icon-plus">新增车辆</el-button>
        <el-button type="init-button2"
                   icon="el-icon-folder-add"
                   plain>批量导入</el-button>
        <el-button class="init-text"
                   type="text">模板下载</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <input-form :formItem="form_item"
                    :btnWidth="'20%'"> </input-form>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'></tableData>

          <div class="table-footer">
            <button @click="reviseDrawer = true">修改</button>
            <button @click="del(table_row)">删除</button>
            <!-- 添加 -->
            <add-revise :drawerVrisible.sync="reviseDrawer"
                        @handleClose='getClose'
                        size="58%"
                        :with-header="false">

            </add-revise>
          </div>
        </div>
        <table-pagination></table-pagination>
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
import tablePagination from '@/components/tablePagination'
import addRevise from '@/views/basic/components/parkingInfo/addRevise'
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
      form_item: [
        {
          type: 'Input',
          label: '车位号',
          placeholder: '请输入内容',
          prop: 'p1'
        },
        {
          type: 'select',
          label: '状态',
          placeholder: '请选择',
          value: '',
          options: [
            { label: '已售', value: '1' },
            { label: '已出租', value: '2' },
          ],
          prop: 'p2'
        },
        {
          type: 'Input',
          label: '业主',
          placeholder: '请输入',
          prop: 'p3'
        }
      ],
      reviseDrawer: false,

      table_config: {
        thead: [
          { label: '序号', prop: 'id', width: 'auto' },
          { label: '车位编号', prop: 'ParkingNumber', width: 'auto' },
          { label: '状态', prop: 'status', width: 'auto' },
          { label: '车位类型', prop: 'ParkingType', width: 'auto' },
          { label: '业主', prop: 'owner', width: 'auto' },
          { label: '使用人', prop: 'userName', width: 'auto' },
          { label: '联系方式', prop: 'phone', width: 'auto' },
        ],
        table_data: [
          {
            id: 1,
            ParkingNumber: 'A128',
            status: '已售',
            ParkingType: '产权车位',
            owner: '夏恒灵',
            userName: '夏恒灵 ',
            phone: '18965334842'
          }, {
            id: 2,
            ParkingNumber: 'A128',
            status: '已出租',
            ParkingType: '临时车位',
            owner: '张志超',
            userName: '张志超 ',
            phone: '13265334841'
          }, {
            id: 3,
            ParkingNumber: 'B038',
            status: '已售',
            ParkingType: '产权车位',
            owner: '吴彦祖',
            userName: '吴彦祖 ',
            phone: '18965334242'
          }, {
            id: 4,
            ParkingNumber: 'C223',
            status: '已售',
            ParkingType: '产权车位',
            owner: '李龙',
            userName: '李龙 ',
            phone: '18965334042'
          }
        ]
      }
    }
  },
  components: {
    tablePagination,
    addRevise
  },
  methods: {
    tableRow (data) {
      this.table_row = data;
    },
    // 监听子组件传关闭事件
    getClose (data) {
      this.reviseDrawer = false
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
