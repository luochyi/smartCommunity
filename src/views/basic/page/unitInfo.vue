<template>
  <div class="main-content">
    <div class="main-titel">
      <span>单元信息</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addUnit = true"
                   icon="el-icon-plus">新增单元</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <input-form :formItem="form_item"
                    :btnWidth="'20%'"> </input-form>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'></tableData>
          <div class="table-footer">
            <button @click="reviseUnit = true">修改</button>
            <button @click="del(table_row)">删除</button>
          </div>
        </div>
        <table-pagination></table-pagination>
        <!-- 添加 -->
        <el-drawer title="我是标题"
                   :visible.sync="addUnit"
                   size="56.26%"
                   :with-header="false">
          <add-unit></add-unit>
        </el-drawer>
        <!-- 修改 -->
        <el-drawer title="我是标题"
                   :visible.sync="reviseUnit"
                   size="56.26%"
                   :with-header="false">
          <revise-unit></revise-unit>
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
import addUnit from '@/views/basic/components/unitInfo/addUnit'
import reviseUnit from '@/views/basic/components/unitInfo/reviseUnit'
import Dialog from '@/components/dialog/Dialog.vue'
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
          label: '楼栋名称',
          placeholder: '请输入内容',
          prop: 'p1'
        },
        {
          type: 'Input',
          label: '单元',
          placeholder: '请输入',
          prop: 'p2'
        }

      ],
      // 添加
      addUnit: false,
      reviseUnit: false,
      input: '',
      numberValidateForm: {
        age: ''
      },
      value: '',
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          { label: '楼栋', prop: 'table2', width: 'auto' },
          { label: '单元（号）', prop: 'table3', width: 'auto' },
          { label: '总层数', prop: 'table4', width: 'auto' },
          { label: '是否有电梯', prop: 'table5', width: 'auto' },
        ],
        table_data: [{
          table1: "1",
          table2: "1栋",
          table3: "1",
          table4: "6层",
          table5: "无"
        },
        {
          table1: "2",
          table2: "1栋",
          table3: "1",
          table4: "6层",
          table5: "无"
        },
        {
          table1: "3",
          table2: "3栋",
          table3: "3",
          table4: "20层",
          table5: "有"
        },
        {
          table1: "4",
          table2: "1栋",
          table3: "1",
          table4: "6层",
          table5: "无"
        },
        {
          table1: "5",
          table2: "1栋",
          table3: "1",
          table4: "6层",
          table5: "无"
        },
        {
          table1: "6",
          table2: "2栋",
          table3: "2",
          table4: "12层",
          table5: "有"
        },
        {
          table1: "7",
          table2: "1栋",
          table3: "1",
          table4: "6层",
          table5: "无"
        },
        {
          table1: "8",
          table2: "1栋",
          table3: "1",
          table4: "6层",
          table5: "无"
        },
        {
          table1: "9",
          table2: "3栋",
          table3: "1",
          table4: "12层",
          table5: "有"
        },
        {
          table1: "10",
          table2: "5栋",
          table3: "3",
          table4: "20层",
          table5: "有"
        }
        ]
      }
    }
  },
  components: {
    tablePagination,
    addUnit,
    reviseUnit
  },
  computed: {

  },
  methods: {
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
    submitForm (formName) {
    },
    resetForm (formName) {

    }
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
