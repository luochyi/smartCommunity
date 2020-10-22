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
            <button @click="reviseHouse = true">修改</button>
            <button @click="del(table_row)">删除</button>
          </div>
        </div>
        <table-pagination></table-pagination>
        <!-- 添加 -->
        <el-drawer title="我是标题"
                   :visible.sync="addHouse"
                   size="56.26%"
                   :with-header="false">
          <add-house></add-house>
        </el-drawer>
        <!-- 修改 -->
        <el-drawer title="我是标题"
                   :visible.sync="reviseHouse"
                   size="56.26%"
                   :with-header="false">
          <revise-house></revise-house>
        </el-drawer>
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
import tablePagination from '@/components/tablePagination'
import addHouse from '@/views/basic/components/houseManagement/addHouse'
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
          { label: '序号', prop: 'table1', width: 'auto' },
          { label: '楼栋', prop: 'table2', width: 'auto' },
          { label: '单元（号）', prop: 'table3', width: 'auto' },
          { label: '房屋名称', prop: 'table4', width: 'auto' },
          { label: '房屋状态', prop: 'table5', width: 'auto' },
          { label: '业主', prop: 'table6', width: 'auto' },
          { label: '手机号', prop: 'table7', width: 'auto' },
          { label: '房屋类型', prop: 'table8', width: 'auto' },
          { label: '建筑面积', prop: 'table9', width: 'auto' },
          { label: '室内面积', prop: 'table10', width: 'auto' },
        ],
        table_data: [{
          table1: "1",
          table2: "1栋",
          table3: "1",
          table4: "601室",
          table5: "入住",
          table6: "许奔奔",
          table7: "15357983215",
          table8: "住宅",
          table9: "100平",
          table10: "88平"
        },
        {
          table1: "2",
          table2: "1栋",
          table3: "1",
          table4: "0401室",
          table5: "装修",
          table6: "尹薄暇",
          table7: "13415637143",
          table8: "公寓",
          table9: "50平",
          table10: "47.1平"
        },
        {
          table1: "3",
          table2: "3栋",
          table3: "3",
          table4: "1003室",
          table5: "空置",
          table6: "叶笑",
          table7: "15087085840",
          table8: "别墅",
          table9: "230平",
          table10: "197平"
        },
        {
          table1: "4",
          table2: "1栋",
          table3: "1",
          table4: "1002室",
          table5: "未售",
          table6: "康和",
          table7: "15357983215",
          table8: "商铺",
          table9: "80平",
          table10: "68平"
        },
        {
          table1: "5",
          table2: "1栋",
          table3: "1",
          table4: "601室",
          table5: "入住",
          table6: "许奔奔",
          table7: "15357983215",
          table8: "住宅",
          table9: "100平",
          table10: "88平"
        },
        {
          table1: "6",
          table2: "2栋",
          table3: "2",
          table4: "601室",
          table5: "入住",
          table6: "许奔奔",
          table7: "15357983215",
          table8: "住宅",
          table9: "100平",
          table10: "88平"
        },
        {
          table1: "7",
          table2: "1栋",
          table3: "1",
          table4: "1002室",
          table5: "未售",
          table6: "康和",
          table7: "15357983215",
          table8: "商铺",
          table9: "80平",
          table10: "68平"
        },
        {
          table1: "8",
          table2: "1栋",
          table3: "1",
          table4: "601室",
          table5: "入住",
          table6: "许奔奔",
          table7: "15357983215",
          table8: "住宅",
          table9: "100平",
          table10: "88平"
        },
        {
          table1: "9",
          table2: "3栋",
          table3: "1",
          table4: "601室",
          table4: "1002室",
          table5: "未售",
          table6: "康和",
          table7: "15357983215",
          table8: "商铺",
          table9: "80平",
          table10: "68平"
        },
        {
          table1: "10",
          table2: "5栋",
          table3: "3",
          table4: "601室",
          table5: "入住",
          table6: "许奔奔",
          table7: "15357983215",
          table8: "住宅",
          table9: "100平",
          table10: "88平"
        }
        ]
      }

    }
  },
  components: {
    tablePagination,
    addHouse,
    reviseHouse
  },
  methods: {
    tableRow (data) {
      this.table_row = data;
    },
    // 删除
    del (data) {
      if (JSON.stringify(data) != "{}") {
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
