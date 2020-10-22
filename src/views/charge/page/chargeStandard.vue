<style scoped>
.content_box {
  display: flex;
}
.left {
  width: 300px;
  border-right: 1px solid #d8d8d8;
}
.left_title {
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  font-size: 16px;
  color: #333333;
}
.left_icon {
  font-size: 18px;
}
.left_icon span {
  padding-left: 10px;
  color: #444444;
}
.left ul li {
  display: block;
  cursor: pointer;
  height: 48px;
  line-height: 48px;
}
.left ul li.active {
  background: #fff0ea;
  color: #fb4702;
}
.left ul li:hover {
  background: #fff0ea;
  color: #fb4702;
}
.left ul li span {
  padding: 20px;
}
.right {
  padding: 0px 20px;
  padding-bottom: 84px;
  width: calc(100% - 300px);
}
.right_title {
  height: 60px;
  line-height: 60px;
}
.right_input {
  height: 48px;
  line-height: 48px;
}
.right_table {
  margin-top: 20px;
  border: 1px solid #f5f5f6;
}
</style>
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>收费标准管理</span>
    </div>
    <div class="content_box">
      <div class="left">
        <div class="left_title">
          <div>
            <span>费用版本名称</span>
          </div>
          <div class="left_icon">
            <span> <i class="el-icon-plus"></i></span>
            <span> <i class="el-icon-delete"></i></span>
          </div>
        </div>
        <ul>
          <li class="active"><span>费用版本2020(使用中)</span></li>
          <li><span> 费用版本2019</span></li>
          <li><span> 费用版本2018</span></li>
        </ul>
      </div>
      <div class="right">
        <div class="right_title">
          <span style="padding-right: 18px">是否启用</span>
          <el-switch
            v-model="value"
            active-text="开"
            inactive-text="关"
            class="switchStyle"
            active-color="rgba(251, 71, 2, 1)"
          >
          </el-switch>
        </div>
        <div class="right_input">
          <div class="content-btn">
            <el-input
              placeholder="请输入收费项目"
              size="small"
              style="width:240px;padding-right:24px"
              prefix-icon="el-icon-search"
              v-model="input2"
            >
            </el-input>
            <el-button class="init-button" @click="dialog_add = true"
              >添加费用</el-button
            >
            <el-button class="init-button">编辑费用</el-button>
            <el-button class="init-button" @click="del(multipleSelection)"
              >删除费用</el-button
            >
            <el-button class="init-button">导出Excel</el-button>
          </div>
        </div>
        <div class="right_table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            :header-cell-style="{ background: '#F5F5F6', color: '#999999' }"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="60"> </el-table-column>
            <el-table-column label="序号" prop="id" width="auto">
            </el-table-column>
            <el-table-column label="费用名称" width="180" prop="table1">
            </el-table-column>
            <el-table-column prop="table2" label="计费单价/单位" width="180">
            </el-table-column>
            <el-table-column prop="table3" label="附加/固定费用" width="180">
            </el-table-column>
            <el-table-column prop="table4" label="创建人" width="180">
            </el-table-column>
            <el-table-column prop="table5" label="更新日期" width="180">
              <template slot-scope="scope">{{ scope.row.table5 }}</template>
            </el-table-column>
            <!-- 更新日期 -->
            <!-- show-overflow-tooltip -->
          </el-table>
        </div>
      </div>
      <!-- 删除提示弹窗-->
      <Dialog
        :dialogVisible="dialog_visible"
        :dialog_config="dialog_config"
        @cancel="cancel"
        @confirm="confirm"
      >
      </Dialog>
      <!-- 增加 -->
      <el-dialog
        title="添加费用版本"
        class="Dialog"
        :visible.sync="dialog_add"
        width="30%"
        top="40vh"
        Dialog
      >
        <div class="dialog-content">
          <el-input
            placeholder="请输入费用版本名称"
            size="small"
            style="width:360px"
            v-model="add_dialog"
          >
          </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <div class="input-btn">
            <button class="inquire-button" @click="add()">
              确定
            </button>
            <button class="reset-button" @click="dialog_add = false">
              取消
            </button>
          </div>
        </span>
      </el-dialog>
      <!-- 添加 -->
      <drawer
        :drawerVrisible="drawer_vrisible"
        @handleClose="getClose"
        :drawer_config="drawer_config"
      ></drawer>
    </div>
  </div>
</template>
<script>
import Dialog from '@/components/dialog/Dialog.vue'
import drawer from '@/components/Drawer/drawer.vue'
export default {
  data() {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      dialog_add: false,
      // 添加点击确认后弹出抽屉
      drawer_vrisible: false,
      // 传入dialog的参数
      dialog_config: {
        title: '',
        content: ''
      },
      // 添加抽屉数据
      drawer_config: {
        drawer_vrisible: false,
        head_title: '访客编辑',
        content_title: '访客信息',
        ruleForm: {
          name: '',
          jj: '',
          danwei: '',
          guding: ''
        },
        form_item: [
          {
            type: 'Input',
            label: '费用项目名称',
            placeholder: '请输入',
            width: '100%',
            prop: 'name'
          },
          {
            type: 'textarea',
            label: '计价公式/单价',
            placeholder: '请输入',
            rows: 6,
            width: '100%',
            prop: 'jj'
          },
          {
            type: 'Select',
            label: '单位',
            placeholder: '请选择单位',
            prop: 'danwei',
            width: '100%',
            options: [
              { label: '宁波电台', value: '1' },
              { label: '三医院', value: '2' }
            ]
          },
          {
            type: 'Input',
            label: '固定费用',
            placeholder: '请输入',
            prop: 'guding',
            width: '100%'
          }
        ]
      },
      add_dialog: '',
      value: true,
      input2: '',
      tableData: [
        {
          id: 1,
          table1: '物业费',
          table2: '2.9元/月/平方米',
          table3: '-',
          table4: '赖八煊',
          table5: '2019-12-02 10:12:33'
        },
        {
          id: 2,
          table1: '公共能耗费',
          table2: '0.7元/月/平方米',
          table3: '-',
          table4: '赖闳率',
          table5: '2019-12-02 10:12:33'
        },
        {
          id: 3,
          table1: '代收水费',
          table2: '6.12元/月/平方米',
          table3: '-',
          table4: '廖臣宗',
          table5: '2019-12-02 10:12:33'
        },
        {
          id: 4,
          table1: '报事报修',
          table2: '50元/次',
          table3: '-',
          table4: '刘惠',
          table5: '2019-12-02 10:12:33'
        },
        {
          id: 5,
          table1: '其他费用',
          table2: '-',
          table3: '-',
          table4: '程缤邦',
          table5: '2019-12-02 10:12:33'
        }
      ],
      multipleSelection: []
    }
  },
  components: {
    Dialog,
    drawer
  },

  methods: {
    handleClick(row) {
      console.log(row)
    },
    // 监听子组件取消事件
    cancel(data) {
      this.dialog_visible = false
      this.drawer_vrisible = false
    },
    // 监听子组件确认事件
    confirm(data) {
      this.dialog_visible = false

      this.$message({
        message: '操作成功',
        type: 'success'
      })
    },
    // 添加费用版本
    add() {
      this.dialog_add = false
      // 点击确认之后弹出抽屉
      this.drawer_vrisible = true
    },
    // 删除
    del(data) {
      if (data.length) {
        this.dialog_config.title = '删除提示'
        this.dialog_config.content = '您是否确认删除该费用版本？'
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据')
      }
    },
    // 关闭抽屉
    getClose(data) {
      this.drawer_vrisible = false
      console.log(data + '投票管理父组件')
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
