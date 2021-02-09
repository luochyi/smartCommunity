<template>
  <div class="main-content">
    <div class="main-titel">
      <span>车辆档案</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="add()"
                   icon="el-icon-plus">新增车辆</el-button>
        <el-button type="init-button2"
                   icon="el-icon-folder-add"
                   plain>批量导入</el-button>
        <el-button class="init-text"
                   type="text">模板下载</el-button>
      </div>
      <VueTable ref="table"
                :config='config'
                @tableCheck="tableCheck">
        <template slot="footer">
          <div class="table-footer">
            <button @click="revises(table_row)">修改</button>
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
                     :formObj='addEidtForm'>
              <template v-slot:hours>
                <el-select v-model="buildValue"
                           filterable
                           style="width:30%;margin-right:16px"
                           placeholder="幢">
                  <el-option v-for="item in buildOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="unitValue"
                           filterable
                           style="width:30%;margin-right:16px"
                           placeholder="单元">
                  <el-option v-for="item in unitOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="hoursValue"
                           filterable
                           style="width:30%"
                           placeholder="房间号">
                  <el-option v-for="item in hoursOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </template>

            </VueForm>
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
import { userCarFindById, cpmBuildingUnitFindAll, findByBuildingUnitId, findByBuildingId, findUserCarStatus, userCarInsert } from '@/api/basic'

export default {
  data () {
    return {
      // 楼栋
      buildValue: null,
      buildOptions: [],
      // 单元
      unitValue: null,
      unitOptions: [],
      // 房屋
      hoursValue: null,
      hoursOptions: [],
      loading: false,
      // 业主
      userName: "",
      // 抽屉标题
      drawerTitle: '',
      // 是否通过校验
      // 抽屉显示隐藏
      drawer_vrisible: false,
      table_row: [],
      addEidtForm: {
        ruleForm: {
          code: null,
          no: null,
          owner: null,
          tel: null,
          idType: null,
          idNumber: null,
          status: null,
        },
        form_item: [
          {
            type: 'Input',
            label: '车牌号',
            placeholder: '请输入车牌号',
            width: '50%',
            prop: 'code'
          },
          {
            type: 'Input',
            label: '车位号',
            placeholder: '请输入车位号',
            width: '50%',
            prop: 'no'
          },
          {
            type: 'Input',
            label: '所属人',
            placeholder: '请输入',
            width: '50%',
            prop: 'owner'
          },
          {
            type: 'Input',
            label: '手机号',
            placeholder: '请输入',
            width: '50%',
            prop: 'tel'
          },
          {
            type: 'Select',
            label: '证件类型',
            placeholder: '请输入',
            options: [
              { value: 1, label: '身份证' },
              { value: 2, label: '营业执照' }
            ],
            width: '50%',
            prop: 'idType'
          },
          {
            type: 'Input',
            label: '证件号码	',
            placeholder: '请输入',
            width: '50%',
            prop: 'idNumber'
          },
          {
            type: 'Select',
            label: '状态',
            placeholder: '请输入',
            options: [],
            width: '50%',
            prop: 'status'
          },
          {
            type: 'Slot',
            label: '房屋信息',
            placeholder: '请输入',
            width: '70%',
            slotName: 'hours',
            prop: 'hours'
          },
        ],
        rules: {
          code: [
            {
              required: true,
              message: '请输入车牌号',
              trigger: 'blur'
            }
          ],
          no: [
            { required: true, message: '请输入车位号', trigger: 'blur' }
          ]
        },
      },
      config: {
        // 搜索
        search_item: [
          {
            type: 'Input',
            label: '所属手机号',
            placeholder: '请输入所属手机号',
            prop: 'tel'
          },
          {
            type: 'Input',
            label: '车牌号',
            placeholder: '请输入车牌号',
            prop: 'code'
          },
          {
            type: 'Input',
            label: '车位号',
            placeholder: '请输入车位号',
            prop: 'parkingSpaceCode'
          }
        ],
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '车牌号', prop: 'code', width: 'auto' },
          { label: '姓名', prop: 'owner', width: 'auto' },
          { label: '手机号', prop: 'tel', width: 'auto' },
          { label: '状态', prop: 'status', width: 'auto' },
          { label: '剩余时间', prop: 'effectiveTimeEnd', width: 'auto' },
          { label: '车位号', prop: 'parkingSpaceCode', width: 'auto' },
          { label: '房屋信息', prop: 'roomName', width: 'auto' },
          { label: '证件类型', prop: 'idType', width: 'auto' },
          { label: '证件号码', prop: 'idNumber', width: 'auto' },
        ],
        url: 'vehicleList',
        data: {
          pageNum: 1,
          size: 10,
        },

      },
      options: [],
      buildingUnitEstateId: null,
    }
  },
  mounted () {
    // 弹窗内下拉框
    cpmBuildingUnitFindAll().then(res => {
      this.buildOptions = res
    })
    findUserCarStatus().then(res => {
      console.log(res)
      let arr = res.map(item => ({
        label: item.showName,
        value: item.showValue
      }))
      console.log(arr)
      this.addEidtForm.form_item[6].options = arr
    })
  },
  methods: {
    onSubmit () {
      let resData = {
        buildingUnitEstateId: 57,
        code: this.addEidtForm.ruleForm.code,
        // no: this.addEidtForm.ruleForm.no,
        type: 1,
        owner: this.userName,
        tel: this.addEidtForm.ruleForm.tel,
        idType: this.addEidtForm.ruleForm.idType,
        idNumber: this.addEidtForm.ruleForm.idNumber,
        status: this.addEidtForm.ruleForm.status,
        parkingSpaceId: 7
      }
      userCarInsert(resData).then(res => {
        console.log(res)
      })
      // userCarFindById
    },
    ruleSubmit () { },
    // 弹窗关闭
    drawerClose () {
      this.drawer_vrisible = false
    },
    revises (data) {
      if (data.length) {
        if (data.length > 1) {
          this.$message.error('只能单条数据修改')
          return
        }
      } else {
        this.$message.error('请选中需要修改的数据')
        return
      }
      this.drawerTitle = '修改车辆',
        this.drawer_vrisible = true;
      let resData = {
        id: data[0].id
      }
      userCarFindById(resData).then(res => {
        console.log(res)
      })
    },
    add () {
      this.drawerTitle = '新增车辆',
        this.drawer_vrisible = true;
    },
    handleClose () {
      this.drawer_vrisible = false;
    },
    tableCheck (arr) {
      console.log(arr)
      this.table_row = arr
    },
    getData () {
      // 调用子组件的方法
      this.$refs.table.loadData()
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
    // 单元楼栋
    unitData (value) {
      let resData = {
        id: value
      }
      findByBuildingId(resData).then(res => {
        // 给单元号赋值
        this.unitOptions = res
      })
    },
    hoursData (value) {
      let resData = {
        id: value
      }
      findByBuildingUnitId(resData).then(res => {
        console.log(res)
        this.hoursOptions = res
      })
    },
  },
  watch: {
    'buildValue': {
      handler (newValue) {
        this.unitData(newValue)
        this.unitValue = null;
      },
      deep: true
    },
    "unitValue": {
      handler (newValue) {
        this.hoursData(newValue)
        this.hoursValue = null;
      },
      deep: true
    },
    //     buildValue
    // unitValue
    // hoursValue
  }
}
</script>
<style scoped lang='scss'>
</style>
