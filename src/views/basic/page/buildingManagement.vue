<template>
  <div class="main-content">
    <div class="main-titel">
      <span>楼栋信息</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addBuilding = true"
                   icon="el-icon-plus">新增楼栋</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <input-form :formItem="form_item"
                    :btnWidth="'20%'"> </input-form>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'></tableData>
          <div class="table-footer">
            <button @click="reviseBuilding = true">修改</button>
            <button @click="del(table_row)">删除</button>
            <button>增加单元</button>
          </div>
        </div>
        <table-pagination></table-pagination>
        <!-- 添加 -->
        <el-drawer title="我是标题"
                   :visible.sync="addBuilding"
                   size="56.26%"
                   :with-header="false">
          <add-building></add-building>
        </el-drawer>
        <!-- 修改 -->
        <el-drawer title="我是标题"
                   :visible.sync="reviseBuilding"
                   size="56.26%"
                   :with-header="false">
          <revise-building></revise-building>
        </el-drawer>
        <!-- 编辑提示弹窗-->
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
import addBuilding from '@/views/basic/components/buildingManagement/addBuilding'
import reviseBuilding from '@/views/basic/components/buildingManagement/reviseBuilding'
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
          prop: 'house'
        },
        {
          type: 'Input',
          label: '楼栋编号',
          placeholder: '请输入',
          prop: 'pho323ne'
        }
      ],
      // 添加
      addBuilding: false,
      reviseBuilding: false,
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          { label: '编号', prop: 'table2', width: 'auto' },
          { label: '楼栋名称', prop: 'table3', width: 'auto' },
          { label: '楼栋ID', prop: 'table4', width: 'auto' },

        ],
        table_data: [{
          table1: "1",
          table2: "001",
          table3: "1栋",
          table4: "777828171617",
        },
        {
          table1: "2",
          table2: "002",
          table3: "2栋",
          table4: "777828171617",
        },
        {
          table1: "3",
          table2: "003",
          table3: "3栋",
          table4: "777828171617",
        },
        {
          table1: "4",
          table2: "004",
          table3: "4栋",
          table4: "777828171617",
        },
        {
          table1: "5",
          table2: "005",
          table3: "5栋",
          table4: "777828171617",
        },
        {
          table1: "6",
          table2: "006",
          table3: "6栋",
          table4: "777828171617",
        },
        {
          table1: "7",
          table2: "007",
          table3: "7栋",
          table4: "777828171617",
        },
        {
          table1: "8",
          table2: "008",
          table3: "8栋",
          table4: "777828171617",
        },
        {
          table1: "9",
          table2: "009",
          table3: "9栋",
          table4: "777828171617",
        },
        {
          table1: "10",
          table2: "0010",
          table3: "10栋",
          table4: "777828171617",
        }
        ]
      }

    }
  },
  components: {
    Dialog,
    tablePagination,
    addBuilding,
    reviseBuilding,
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
