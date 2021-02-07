<template>
  <div class="main-content">
    <div class="main-titel">
      <span>房产管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addHouse = true"
                   icon="el-icon-plus">新增房屋</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <input-form :formItem="form_item"
                    :btnWidth="'20%'"> </input-form>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'></tableData>
          <div class="table-footer">
            <button @click="addHouse = true">编辑</button>
            <button @click="del(table_row)">删除</button>
          </div>
        </div>
        <table-pagination></table-pagination>
        <!-- 添加 -->
        <!-- <el-drawer title="我是标题"
                   :visible.sync="addHouse"
                   size="56.26%"
                   :with-header="false">
          <add-house></add-house>
        </el-drawer> -->
        <!-- 修改 -->
        <el-drawer title="我是标题"
                   :visible.sync="reviseHouse"
                   size="56.26%"
                   :with-header="false">
          <revise-house></revise-house>
        </el-drawer>
        <!--  -->
        <!-- 添加 -->
        <addHouse ref="ruleForm"
                  @handleClose='getClose'
                  :drawerVrisible.sync="addHouse">
        </addHouse>
        <!-- 删除 提示弹窗-->
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
import { cpmBuildingUnitEstateList } from '@/api/basic'
import tablePagination from '@/components/tablePagination'
import addHouse from '@/views/basic/components/houseManagement/index.vue'
import reviseHouse from '@/views/basic/components/houseManagement/reviseHouse'
export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      dialog_config: {
        title: '',
        content: ''
      },
      table_row: {},
      form_item: [
        {
          type: 'Input',
          label: '房屋信息',
          placeholder: '楼栋/单元/室号',
          prop: 'p1'
        },
        {
          type: 'select',
          label: '房屋状态',
          placeholder: '请输入内容',
          prop: 'p2'
        },
        {
          type: 'Input',
          label: '业主',
          placeholder: '请输入',
          prop: 'p3'
        },
        {
          type: 'Input',
          label: '手机号',
          placeholder: '请输入',
          prop: 'p4'
        }

      ],
      // 添加
      addHouse: false,
      reviseHouse: false,
      input: '',
      // 房屋管理
      dialogVisible: false,
      table_config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '楼栋', prop: 'buildingName', width: 'auto' },
          { label: '单元（号）', prop: 'buildingUnitNo', width: 'auto' },
          { label: '房屋名称', prop: 'roomNumber', width: 'auto' },
          { label: '房屋状态', prop: 'status', width: 'auto' },
          { label: '业主', prop: 'userResidentName', width: 'auto' },
          { label: '手机号', prop: 'userResidentTel', width: 'auto' },
          { label: '房屋类型', prop: 'type', width: 'auto' },
          { label: '建筑面积', prop: 'constructionArea', width: 'auto' },
          { label: '室内面积', prop: 'indoorArea', width: 'auto' },
        ],
        table_data: []
      }
    }
  },
  components: {
    tablePagination,
    addHouse,
    reviseHouse
  },
  mounted () {
    this.getData()
  },
  methods: {
    tableRow (data) {
      this.table_row = data;
    },
    getData () {
      let requestData = {
        pageNum: 1,
        size: 10,
        buildingName: null,
        buildingUnitNo: null,
        roomNumber: null,
        status: null,
        userResidentName: null,
        userResidentTel: null
      }
      cpmBuildingUnitEstateList(requestData).then(res => {
        console.log(res)
        this.table_config.table_data = res.tableList
      })
    },
    // 监听子组件传关闭事件
    getClose (data) {
      this.addHouse = false
    },
    // 删除
    del (data) {
      if (data.length) {
        this.dialog_config.title = '删除提示'
        this.dialog_config.content = '您是否确认删除该房屋信息？'
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
    submitForm (formName) {
    },
    resetForm (formName) {

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
.dialog-content {
    height: 90px;
    line-height: 90px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    border-top: 1px solid rgba(0, 0, 0, 0.06);
}
</style>
