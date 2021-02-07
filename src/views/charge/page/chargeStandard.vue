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
          <li :class="costActive===index?'active':''"
              v-for="(item,index) in costList"
              @click="tableChange(index,item.id)"
              :key='item.id'><span>{{item.name}}</span></li>
        </ul>
      </div>
      <div class="right">
        <div class="right_title">
          <span style="padding-right: 18px">是否启用</span>
          <el-switch v-model="value"
                     active-text="开"
                     inactive-text="关"
                     class="switchStyle"
                     active-color="rgba(251, 71, 2, 1)">
          </el-switch>
        </div>
        <div class="right_input">
          <div class="content-btn">
            <el-input placeholder="请输入收费项目"
                      size="small"
                      style="width:240px;padding-right:24px"
                      prefix-icon="el-icon-search"
                      v-model="input2">
            </el-input>
            <el-button class="init-button"
                       @click="addCost">添加费用</el-button>
            <el-button class="init-button">编辑费用</el-button>
            <el-button class="init-button"
                       @click="del(table_row)">删除费用</el-button>
            <el-button class="init-button">导出Excel</el-button>
          </div>
        </div>
        <div class="right_table">
          <!-- <el-table ref="multipleTable"
                    :data="tableData"
                    :header-cell-style="{ background: '#F5F5F6', color: '#999999' }"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection"
                             width="60"> </el-table-column>
            <el-table-column label="序号"
                             prop="id"
                             width="auto">
            </el-table-column>
            <el-table-column label="费用名称"
                             width="180"
                             prop="table1">
            </el-table-column>
            <el-table-column prop="table2"
                             label="计费单价/单位"
                             width="180">
            </el-table-column>
            <el-table-column prop="table3"
                             label="附加/固定费用"
                             width="180">
            </el-table-column>
            <el-table-column prop="table4"
                             label="创建人"
                             width="180">
            </el-table-column>
            <el-table-column prop="table5"
                             label="更新日期"
                             width="180">
              <template slot-scope="scope">{{ scope.row.table5 }}</template>
            </el-table-column>
          </el-table> -->
          <VueTable ref="table"
                    :config='config'
                    @tableCheck="tableCheck">
          </VueTable>
        </div>
      </div>
      <!-- 添加 -->
      <drawer :drawerVrisible="drawer_vrisible"
              @handleClose="getClose"
              :drawer_config="drawer_config"></drawer>
    </div>
  </div>
</template>
<script>
import { chargesTemplateList } from '@/api/charge'
import drawer from '@/components/Drawer/drawer.vue'
export default {
  data () {
    return {
      // 添加点击确认后弹出抽屉
      drawer_vrisible: false,
      costList: [],
      costActive: 0,
      drawer_config: {
        drawer_vrisible: false,
        head_title: '访客编辑',
        content_title: '访客信息',
        ruleForm: {
          name: '',
          jj: '',
          danwei: '',
          guding: '',
        },
        form_item: [
          {
            type: 'Input',
            label: '费用项目名称',
            placeholder: '请输入',
            width: '100%',
            prop: 'name',
          },
          {
            type: 'textarea',
            label: '计价公式/单价',
            placeholder: '请输入',
            rows: 6,
            width: '100%',
            prop: 'jj',
          },
          {
            type: 'Select',
            label: '单位',
            placeholder: '请选择单位',
            prop: 'danwei',
            width: '100%',
            options: [
              { label: '宁波电台', value: '1' },
              { label: '三医院', value: '2' },
            ],
          },
          {
            type: 'Input',
            label: '固定费用',
            placeholder: '请输入',
            prop: 'guding',
            width: '100%',
          },
        ],
      },
      value: true,
      input2: '',
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '费用名称', prop: 'name', width: 'auto' },
          { label: '计费单价/单位', prop: 'unitPrice', width: 'auto' },
          { label: '附加/固定费用', prop: 'otherFee', width: 'auto' },
          { label: '创建人', prop: 'createName', width: 'auto' },
          { label: '更新日期', prop: 'modifyDate', width: 'auto' },
        ],
        url: 'chargesTemplateDetailList',
        table_data: [],
        data: { pageNum: 1, size: 10, chargesTemplateId: null },
      },
      table_row: [],
    }
  },
  components: {
    drawer,
  },

  mounted () {
    chargesTemplateList().then(res => {
      this.costList = res
      this.config.data.chargesTemplateId = res[0].id
    })
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    tableChange (index, ulId) {
      this.costActive = index
      this.config.data.chargesTemplateId = ulId
    },
    addCost () {
      this.$prompt('请输入费用版本名称', '添加费用版本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.drawer_vrisible = true
        this.$message({
          type: 'success',
          message: '你的费用版本是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    // 监听子组件取消事件
    cancel (data) {
      this.dialog_visible = false
      this.drawer_vrisible = false
    },

    // 删除
    del (data) {
      if (data.length) {
        let arr = []
        for (let i = 0; i < this.table_row.length; i++) {
          arr.push(this.table_row[i].id)
        }
        this.$confirm('是否确认删除？删除不可恢复', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'confirmButton',
          cancelButtonClass: 'cancelButton'
        }).then(() => {
        }).catch(action => { });
      } else {
        this.$message.error('请选中需要删除的数据');
      }
    },
    // 关闭抽屉
    getClose (data) {
      this.drawer_vrisible = false
      console.log(data + '投票管理父组件')
    },
    tableCheck (arr) {
      this.table_row = arr
    },
  },
}
</script>
