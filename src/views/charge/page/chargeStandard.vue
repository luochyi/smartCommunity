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
            <span @click="addCost"> <i class="el-icon-plus"></i></span>
            <span> <i class="el-icon-delete"></i></span>
          </div>
        </div>
        <ul>
          <li :class="costActive===index?'active':''"
              v-for="(item,index) in costList"
              @click="tableChange(index,item.id)"
              :key='item.id'>
            <!-- <span>{{item.name}}</span> -->
            <el-input v-model="item.name"
                      @blur='(e) => editInputBlur(e,item.name,item.id,index)'
                      @focus='(e) => editInputFocus(e,item.name)'
                      v-focus
                      v-if="item.editBool"
                      style='flex:1'
                      size="small"></el-input>
            <span v-else>{{item.name}}</span>
            <!--   @click.stop="editType(index)" -->
            <span><i class="el-icon-edit"
                 @click.stop="editType(index)"></i></span>
          </li>
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
            <el-button class="init-button">添加费用</el-button>
            <el-button class="init-button">编辑费用</el-button>
            <el-button class="init-button"
                       @click="del(table_row)">删除费用</el-button>
            <el-button class="init-button">导出Excel</el-button>
          </div>
        </div>
        <div class="right_table">
          <!-- <VueTable ref="table"
                    :config='config'
                    @tableCheck="tableCheck">
          </VueTable> -->
          <tableData :config="config"
                     @clickrow='tableCheck'>
          </tableData>
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
import { chargesTemplateList, chargesTemplateDetailList, chargesTemplateUpdate, chargesTemplateInsert } from '@/api/charge'
import drawer from '@/components/Drawer/drawer.vue'
export default {
  data () {
    return {
      // 添加点击确认后弹出抽屉
      drawer_vrisible: false,
      costList: [],
      typeListName: '',
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
      // 工单类型明细
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '费用名称', prop: 'name', width: 'auto' },
          { label: '计费单价/单位', prop: 'unitPrice', width: 'auto' },
          { label: '附加/固定费用', prop: 'otherFee', width: 'auto' },
          { label: '创建人', prop: 'createName', width: 'auto' },
          { label: '更新日期', prop: 'modifyDate', width: 'auto' },
        ],
        table_data: [
        ],
        loading: true,
      },
      // config: {
      //   thead: [
      //     { label: '序号', type: 'index', width: '80' },
      //     { label: '费用名称', prop: 'name', width: 'auto' },
      //     { label: '计费单价/单位', prop: 'unitPrice', width: 'auto' },
      //     { label: '附加/固定费用', prop: 'otherFee', width: 'auto' },
      //     { label: '创建人', prop: 'createName', width: 'auto' },
      //     { label: '更新日期', prop: 'modifyDate', width: 'auto' },
      //   ],
      //   url: 'chargesTemplateDetailList',
      //   table_data: [],
      //   data: { pageNum: 1, size: 10, chargesTemplateId: null },
      // },
      table_row: [],
    }
  },
  directives: {
    // 注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function (el) {
        // 聚焦元素
        el.querySelector('input').focus()
      }
    }
  },
  components: {
    drawer,
  },
  mounted () {
    chargesTemplateList().then(res => {
      this.costList = res
      this.costList.map(item => {
        this.$set(item, "editBool", false)
      })
      this.GetTableData(res[0].id)
    })
  },
  methods: {
    editType (index) {
      this.$set(this.costList[index], "editBool", true)
    },
    handleClick (row) {
      console.log(row)
    },
    // 工单大类修改 input获取焦点时 获取name
    editInputFocus (e, name) {
      this.typeListName = name
    },
    // 工单大类修改 input 失去焦点焦点时 修改名称
    editInputBlur (e, name, id, index) {
      this.$set(this.costList[index], "editBool", false)
      // 在修改时新值和旧值相同不请求后台
      if (this.typeListName === name) {
        return
      }
      // 内容为空  重新给当前输入赋旧值
      if (name === '') {
        this.costList[index].name = this.typeListName
        this.$message.error('内容不能为空');
        return
      }
      let resData = {
        id: id,
        name: name,
      }
      chargesTemplateUpdate(resData).then(result => {
        console.log(result)

      })
    },
    // tab 侧边栏切换
    tableChange (index, ulId) {
      this.costActive = index
      this.GetTableData(ulId)
    },
    GetTableData (id) {
      let resData = {
        pageNum: 1,
        size: 10,
        chargesTemplateId: id
      }
      chargesTemplateDetailList(resData).then(res => {
        this.config.table_data = res.tableList
        this.config.loading = false
      })
    },
    addCost () {
      this.$prompt('请输入费用版本名称', '添加费用版本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        if (!value) {
          return
        }
        let resData = {
          name: value
        }
        chargesTemplateInsert(resData).then(res => {
          if (res.status) {
            this.$message({
              type: 'success',
              message: res.message
            });
          }
        })
        this.drawer_vrisible = true

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
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
<style scoped lang='scss'>
.content_box {
    display: flex;
    min-height: 500px;
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
    cursor: pointer;
    display: inline-block;
    padding: 6px;
    &:hover {
        opacity: 0.8;
    }
}
.left_icon span {
    padding-left: 10px;
    color: #444444;
}
.left ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    // height: 48px;
    // line-height: 48px;
    i {
        font-size: 16px;
    }
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
