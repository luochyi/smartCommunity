<template>
  <div class="main-content">
    <div class="main-titel">
      <span>单位信息</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addBuild()"
                   icon="el-icon-plus">新增单元</el-button>
      </div>
      <VueTable ref="table"
                :config='config'
                @tableCheck="tableCheck">
        <template slot="footer">
          <div class="table-footer">
            <button @click="revise(table_row)">修改</button>
            <button @click="del(table_row)">删除</button>
          </div>
        </template>
      </VueTable>
    </div>
    <Drawer :drawerTitle="drawerTitle"
            @drawerClose="drawerClose"
            :drawerVrisible='drawer_vrisible'>
      <div style="padding:30px">
        <FromCard>
          <template slot="title">基本信息</template>
          <template>
            <VueForm ref="childFrom"
                     @ruleSubmit='ruleSubmit'
                     :formObj='reviseForm'></VueForm>
          </template>
        </FromCard>
      </div>
      <div slot="footer">
        <button class="btn-orange"
                @click="onSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
        <button class="btn-gray"
                @click="drawerClose"><span>取消</span></button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import { cpmBuildingUnitUpdate, cpmBuildingUnitInsert, cpmBuildingUnitFindAll } from '@/api/basic'
export default {
  data () {
    return {
      // 抽屉标题
      drawerTitle: '',
      // 是否通过校验
      bool: false,
      // 抽屉显示隐藏
      drawer_vrisible: false,
      // 控制弹窗为添加或修改  默认为true 添加
      drawerControl: true,

      // 表格配置
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '楼栋', prop: 'buildingName', width: 'auto' },
          { label: '单元（号）', prop: 'no', width: 'auto' },
          {
            label: '总层数', prop: 'totalFloor', width: 'auto',
            type: "function",
            callback: (row, prop) => `${row.totalFloor}层`
          },
          {
            label: '是否有电梯',
            prop: 'isElevator',
            width: 'auto',
            type: "function",
            callback: (row, prop) => `${row.isElevator ? '有电梯' : '无电梯'}`
          },
          { label: '导入编号', prop: 'id', width: 'auto' },
        ],
        loading: true,
        data: {
          pageNum: 1,
          size: 10,
        },
        table_data: [],
        url: 'UnitList',
        // search_item
        search_item: [
          {
            type: 'Input',
            label: '楼栋名称',
            placeholder: '请输入内容',
            prop: 'buildingName'
          },
          {
            type: 'Int',
            label: '单元(号)',
            placeholder: '请输入',
            prop: 'no'
          }
        ],
      },
      // 选中表格数据
      table_row: [],
      reviseForm: {
        ruleForm: {
          isElevator: null,
          no: null,
          totalFloor: null,
          buildingId: null,
        },
        rules: {
          name: [
            {
              required: true,
              message: '请填写楼栋名称',
              trigger: 'blur'
            }
          ],
          no: [
            { required: true, message: '请填写楼栋名称', trigger: 'blur' }
          ],
        },
        form_item: [
          {
            type: 'Select',
            label: '楼栋',
            placeholder: '请输入',
            width: '100%',
            prop: 'buildingId',
            options: [],
          },
          {
            type: 'Int',
            label: '单元（号）',
            placeholder: '请输入',
            width: '100%',
            prop: 'no'
          },
          {
            type: 'Int',
            label: '总层数',
            placeholder: '请输入',
            width: '100%',
            prop: 'totalFloor'
          }, {
            type: 'Select',
            label: '是否有电梯',
            placeholder: '请输入',
            width: '100%',
            prop: 'isElevator',
            options: [
              { value: 0, label: '无电梯' },
              { value: 1, label: '有电梯' }
            ]
          }
        ]
      },
    }
  },
  mounted () {
    // 弹窗内下拉框
    cpmBuildingUnitFindAll().then(res => {
      console.log(res)
      this.reviseForm.form_item[0].options = res
    })
  },
  methods: {
    // 监听验证是否通过from表单
    ruleSubmit (val) {
      this.bool = val;
    },
    // 增加或修改
    onSubmit () {
      // 检查form表单校验
      this.$refs.childFrom.submitForm();
      // 通过from表单验证
      if (this.bool) {
        // 控制是添加还是修改
        if (this.drawerControl) {
          // 添加
          let requestData = {
            buildingId: this.reviseForm.ruleForm.buildingId,
            totalFloor: this.reviseForm.ruleForm.totalFloor,
            isElevator: this.reviseForm.ruleForm.isElevator,
            no: this.reviseForm.ruleForm.no
          }
          cpmBuildingUnitInsert(requestData)
            .then((res) => {
              console.log(res)
              if (res.status) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                this.getData()
                this.drawerClose()
              }
            }).catch((error) => {
              console.log(error)
            })
        } else {
          // 修改
          let requestData = {
            id: this.table_row[0].id,
            buildingId: this.reviseForm.ruleForm.buildingId,
            totalFloor: this.reviseForm.ruleForm.totalFloor,
            isElevator: this.reviseForm.ruleForm.isElevator,
            no: this.reviseForm.ruleForm.no
          }
          cpmBuildingUnitUpdate(requestData)
            .then((res) => {
              console.log(res)
              if (res.status) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                this.getData()
                this.drawerClose()
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    },
    // 表格选择数据
    tableCheck (arr) {
      this.table_row = arr
    },
    // 数据加载
    getData () {
      // 调用子组件的方法
      this.$refs.table.loadData()
    },
    // 弹窗关闭
    drawerClose () {
      for (let key in this.reviseForm.ruleForm) {
        this.reviseForm.ruleForm[key] = ''
      }
      this.drawer_vrisible = false
    },
    // 添加
    addBuild () {
      console.log(this.reviseForm.ruleForm)
      this.drawerControl = true;
      this.drawer_vrisible = true
      this.drawerTitle = '添加单元'
    },
    // 修改
    revise (data) {
      console.log(data)
      if (data.length) {
        if (data.length > 1) {
          this.$message.error('只能单条数据修改')
          return
        }
      } else {
        this.$message.error('请选中需要修改的数据')
        return
      }

      this.drawerControl = false;
      this.drawerTitle = '修改单元'
      this.drawer_vrisible = true
      console.log(data[0].isElevator)
      this.reviseForm.ruleForm.buildingId = data[0].buildingId
      this.reviseForm.ruleForm.totalFloor = data[0].totalFloor
      this.reviseForm.ruleForm.isElevator = data[0].isElevator
      this.reviseForm.ruleForm.no = data[0].no
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
          this.$refs.table.tableDelete(arr)
        }).catch(action => { });
      } else {
        this.$message.error('请选中需要删除的数据');
      }
    },
  }
}
</script>
<style scoped lang='scss'>
</style>
