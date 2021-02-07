<template>
  <div class="main-content">
    <div class="main-titel">
      <span>楼栋信息</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addBuild()"
                   icon="el-icon-plus">新增楼栋</el-button>
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
    <!-- 删除提示弹窗-->
    <Dialog :dialogVisible='dialog_visible'
            :dialog_config='dialog_config'
            @cancel='cancel'
            @confirm='confirm'>
    </Dialog>
  </div>
</template>
<script>
import { buildingInsert, Login, buildingUpdate } from '@/api/basic'
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
      // 控制dialog显示隐藏
      dialog_visible: false,
      // 弹窗提示
      dialog_config: {
        title: '删除提示',
        content: '是否确认删除？删除无法撤回！'
      },
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '编号', prop: 'no', width: 'auto' },
          { label: '楼栋名称', prop: 'name', width: 'auto' },
          { label: '楼栋ID', prop: 'code', width: 'auto' }
        ],
        url: 'buildList',
        data: {
          pageNum: 1,
          size: 10,
        },
        // search_item
        search_item: [
          {
            type: 'Input',
            label: '楼栋名称',
            placeholder: '请输入内容',
            prop: 'name'
          },
          {
            type: 'Input',
            label: '楼栋编号',
            placeholder: '请输入',
            prop: 'no'
          }
        ],
      },
      // 选中表格数据
      table_row: [],
      // addForm: {
      //   ruleForm: {
      //     no: null,
      //     name: null
      //   },
      //   rules: {
      //     name: [
      //       {
      //         required: true,
      //         message: '请填写楼栋名称',
      //         trigger: 'blur'
      //       }
      //     ],
      //     no: [
      //       { required: true, message: '请填写楼栋编号', trigger: 'blur', }
      //     ]
      //   },
      //   form_item: [
      //     {
      //       type: 'Int',
      //       label: '楼栋编号',
      //       placeholder: '请输入',
      //       width: '100%',
      //       prop: 'no'
      //     },
      //     {
      //       type: 'Input',
      //       label: '楼栋名称',
      //       placeholder: '请输入',
      //       width: '100%',
      //       prop: 'name'
      //     }
      //   ]
      // },
      // 修改
      reviseForm: {
        ruleForm: {
          code: null,
          name: null,
          no: null
        },
        rules: {
          code: [
            {
              required: true,
              message: '请填写楼栋名称',
              trigger: 'blur'
            }
          ],
          no: [
            { required: true, message: '请填写楼栋编号', trigger: 'blur' }
          ],
          name: [
            {
              required: true,
              message: '请填写楼栋名称',
              trigger: 'blur'
            }
          ]
        },
        form_item: [
          // {
          //   type: 'Input',
          //   label: '楼栋ID',
          //   placeholder: '请输入',
          //   disabled: true,
          //   width: '100%',
          //   prop: 'code'
          // },
          {
            type: 'Int',
            label: '楼栋编号',
            placeholder: '请输入',
            width: '100%',
            prop: 'no'
          },
          {
            type: 'Input',
            label: '楼栋名称',
            placeholder: '请输入',
            width: '100%',
            prop: 'name'
          }
        ]
      },
    }
  },
  mounted () {
    Login().then((res) => {
      console.log(res)
      sessionStorage.setItem('X-Admin-Token', res.token)
    })
  },
  methods: {
    /**
     * 监听提交验证是否通过
     * */
    ruleSubmit (val) {
      this.bool = val;
    },
    // 增加或修改
    onSubmit () {
      /**
       * 检查form表单校验 调用子组件方法验证
       * */
      this.$refs.childFrom.submitForm();
      if (this.bool) {
        if (this.drawerControl) {
          // 添加
          let requestData = {
            no: parseInt(this.reviseForm.ruleForm.no),
            name: this.reviseForm.ruleForm.name,
          }
          buildingInsert(requestData)
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
            no: parseInt(this.reviseForm.ruleForm.no),
            name: this.reviseForm.ruleForm.name,
          }
          buildingUpdate(requestData)
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
    tableCheck (arr) {
      this.table_row = arr
    },
    getData () {
      // 调用子组件的方法
      this.$refs.table.loadData()
    },
    // 弹窗关闭
    drawerClose () {
      /****
       * 关闭弹窗 调用子组件重置事件清空状态 在修改传入的值是重置不了 手动重置
      */
      console.log(this.$refs.childFrom.reset)

      this.$refs.childFrom.reset();
      for (let key in this.reviseForm.ruleForm) {
        this.reviseForm.ruleForm[key] = ''
      }
      if (!this.drawerControl) {
        this.reviseForm.form_item.shift();
      }
      this.drawer_vrisible = false
    },
    addBuild () {
      this.drawerControl = true;
      this.drawer_vrisible = true
      this.drawerTitle = '添加楼栋'
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
      let obj = {
        type: 'Input',
        label: '楼栋ID',
        placeholder: '请输入',
        disabled: true,
        width: '100%',
        prop: 'code'
      }
      this.reviseForm.form_item.splice(0, 0, obj)
      this.drawerControl = false;
      this.drawerTitle = '修改楼栋'
      this.drawer_vrisible = true
      this.reviseForm.ruleForm.code = data[0].code
      this.reviseForm.ruleForm.name = data[0].name
      this.reviseForm.ruleForm.no = data[0].no
    },
    // 删除
    del (data) {
      if (data.length) {
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据')
      }
    },
    // 监听删除取消事件
    cancel (data) {
      this.dialog_visible = false
    },
    // 监听删除确认确认事件
    confirm (data) {
      let arr = []
      for (let i = 0; i < this.table_row.length; i++) {
        arr.push(this.table_row[i].id)
      }
      // 调用子组件的方法
      this.$refs.table.tableDelete(arr)
      this.dialog_visible = false
    }
  }
}
</script>
<style scoped lang='scss'>
</style>
