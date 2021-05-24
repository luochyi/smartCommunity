<template>
  <div>
    <Drawer :drawerTitle="drawerTitle"
            @drawerClose="drawerClose"
            :drawerVrisible='drawer_vrisible'>
      <FromCard style="margin:30px">
        <span slot="title">基本信息</span>
        <VueForm ref="childFrom"
                 :formObj='fromjson'>
        </VueForm>
        <template>
          <div>
            <div class="hr"></div>
            <div>
              <div class="add">
                <span @click="addMember">添加成员</span>
              </div>
              <div class="content-table">
                <template>
                  <el-table :data="tableData"
                            highlight-current-row
                            :header-cell-style="{ background: '#F5F5F6', color: '#999999' }"
                            style="width: 100%">
                    <el-table-column label="序号"
                                     width="80"
                                     type="index">
                    </el-table-column>
                    <el-table-column prop="date"
                                     label="姓名">
                      <template slot-scope="scope">
                        <el-input size="small"
                                  v-model="scope.row.name"
                                  placeholder="请输入"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name"
                                     label="手机号">
                      <template slot-scope="scope">
                        <el-input size="small"
                                  v-model="scope.row.tel"
                                  placeholder="请输入"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address"
                                     label="身份">
                      <template slot-scope="scope">
                        <!-- <el-input size="small"
                                  v-model="scope.row.identity"
                                  placeholder="请输入"></el-input> -->
                        <el-select size="small"
                                   v-model="scope.row.identity"
                                   placeholder="请输入">
                          <el-option v-for="item in identityOptions"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                          </el-option>
                        </el-select>
                        <!-- userOptions -->
                      </template>
                    </el-table-column>
                    <el-table-column label="证件类型">
                      <template slot-scope="scope">
                        <el-select size="small"
                                   v-model="scope.row.idType"
                                   placeholder="请输入">
                          <el-option v-for="item in idTypeOptions"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address"
                                     width="220"
                                     label="证件号码">
                      <template slot-scope="scope">
                        <div class="column_flex">
                          <div style='flex:1'>
                            <el-input size="small"
                                      v-model="scope.row.idNumber"
                                      placeholder="请输入"></el-input>
                          </div>
                          <div @click="deleteRow(scope.$index, tableData)"
                               v-if="scope.$index !== 0"
                               style='padding-left:10px;'><span><i class="el-icon-delete"></i></span></div>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </div>
          </div>
        </template>
      </FromCard>
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
import { userResidentFindById, userResidentUpdateRelatives } from '@/api/basic'
export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: () => false
    },
    drawerTitle: {
      type: String,
      default: () => ""
    },
    owerId: {
      type: Number,
      default: () => null
    }
  },
  data () {
    return {
      // 亲属
      idTypeOptions: [
        {
          label: '身份证',
          value: 1
        },
        {
          label: '营业执照',
          value: 2
        }
      ],
      identityOptions: [{
        label: '父亲',
        value: 1
      },
      {
        label: '母亲',
        value: 2
      },
      {
        label: '其他',
        value: 3
      }],
      drawer_vrisible: false,
      // 亲属表格
      tableData: [],
      userResident: {},
      cpmBuildingUnitEstateIdList: [],
      cpmParkingSpaceIdList: [],
      // 基本信息
      fromjson: {
        ruleForm: {
          tel: null,
          name: null,
          idType: null,
          idNumber: null,
        },
        form_item: [
          {
            type: 'Input',
            label: '业主姓名',
            placeholder: '请输入',
            disabled: true,
            width: '50%',
            prop: 'name'
          },
          {
            type: 'Input',
            label: '联系方式',
            placeholder: '请输入',
            width: '50%',
            prop: 'tel'
          },
          {
            type: 'Select',
            label: '证件类型',
            disabled: true,
            placeholder: '请输入',
            options: [
              { value: 1, label: '身份证' },
              { value: 2, label: '营业执照' },
            ],
            width: '50%',
            prop: 'idType'
          },
          {
            type: 'Input',
            label: '证件号码',
            placeholder: '请输入',
            disabled: true,
            width: '50%',
            prop: 'idNumber'
          }
        ]
      }
    }
  },
  methods: {
    //  提交
    onSubmit () {
      this.fromjson.ruleForm.id = this.owerId
      // let table_data = this.tableData.map(({ name, tel, idType, idNumber, identity }) => ({ name, tel, idType, idNumber, identity }))
      // 家属成员  表格有内容时间必填写
      let isRequest = true

      let table_data = this.tableData.map(item => {
        if (!item.name || !item.tel || !item.idType || !item.idNumber || !item.identity) {
          isRequest = false
        }
        return {
          name: item.name,
          tel: item.tel,
          idType: item.idType, idNumber: item.idNumber,
          identity: item.identity
        }
      })
      if (isRequest === false) {
        this.$message({
          message: '请完善成员信息填写（可不填写）',
          type: 'error'
        })
        return
      }
      let resData = {
        userResident: this.fromjson.ruleForm,
        userRelatives: table_data
      }
      userResidentUpdateRelatives(resData).then(res => {
        if (res.status) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.drawerClose()
          
        }
      })
    },
    getData (id) {
      let resData = {
        id: id
      }
      userResidentFindById(resData).then(res => {
        this.fromjson.ruleForm.tel = res.userResident.tel
        this.fromjson.ruleForm.name = res.userResident.name
        this.fromjson.ruleForm.idType = res.userResident.idType
        this.fromjson.ruleForm.idNumber = res.userResident.idNumber
        this.tableData = res.voRelativesList
      })
    },
    // 弹窗关闭
    drawerClose () {
      this.drawer_vrisible = false;
      this.$emit('handleClose', 'Close')
    },
    // 添加成员
    addMember () {
      this.tableData.push({
        name: null,
        tel: null,
        idType: null,
        idNumber: null,
        identity: null
      })
    },
    deleteRow (index, rows) {
      rows.splice(index, 1);
    }
  },
  watch: {
    drawerVrisible: {
      handler (newValue) {
        this.drawer_vrisible = newValue
      }
    },
    owerId: {
      handler (newValue) {
        this.getData(newValue)
      }
    },
  }
}
</script>

<style scoped lang='scss'>
.flex {
    margin: 17px 0;
    display: flex;
    align-items: center;
}
.label-span {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    width: 80px;
}
.add {
    margin-bottom: 20px;

    span {
        cursor: pointer;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #fb4702;
        line-height: 20px;
    }
}
.hr {
    margin: 30px 0;
    height: 1px;
    background: #e8e8e8;
}
.column_flex {
    display: flex;
    align-items: center;
}
</style>

