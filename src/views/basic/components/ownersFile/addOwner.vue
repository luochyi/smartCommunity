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
                        <el-input size="small"
                                  v-model="scope.row.identity"
                                  placeholder="请输入"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="证件类型">
                      <template slot-scope="scope">
                        <el-select size="small"
                                   v-model="scope.row.idType"
                                   placeholder="请输入">
                          <el-option v-for="item in userOptions"
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
      <FromCard style="margin:30px">
        <span slot="title">房屋信息</span>
        <div v-for="(item,index) in hoursArray"
             class="flex"
             :key='index'>
          <template>
            <div class="label-span">
              <span>房屋信息<span v-show="index !== 0">{{index+1}}</span></span>
            </div>
            <div>
              <!-- @change='(value) => change(froms[index].addForm.ruleForm.residentId,index,value)' -->
              <el-select v-model="item.buildValue"
                         filterable
                         @change='(value) => buildChange(value,index)'
                         size="small"
                         style="width:108px;margin-right:16px"
                         placeholder="幢">
                <el-option v-for="obj in buildOptions"
                           :key="obj.value"
                           :label="obj.label"
                           :value="obj.value">
                </el-option>
              </el-select>
              <el-select v-model="item.unitValue"
                         filterable
                         @change='(value) => unitChange(value,index)'
                         size="small"
                         style="width:108px;margin-right:16px"
                         placeholder="单元">
                <el-option v-for="obj in item.unitOptions"
                           :key="obj.value"
                           :label="obj.label"
                           :value="obj.value">
                </el-option>
              </el-select>
              <el-select v-model="item.hoursValue"
                         filterable
                         size="small"
                         style="width:108px;margin-right:16px"
                         placeholder="房间号">
                <el-option v-for="obj in item.hoursOptions"
                           :key="obj.value"
                           :label="obj.label"
                           :value="obj.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <span style="font-size:19px;margin-right:8px"
                    @click="houseAdd"><i class="el-icon-circle-plus-outline"></i></span>
              <span style="font-size:19px"
                    v-if="index !== 0"
                    @click="houseRemove(index)"><i class="el-icon-remove-outline"></i></span>
            </div>
          </template>
        </div>
      </FromCard>
      <FromCard style="margin:30px">
        <span slot="title">车位信息</span>
        <div class="flex"
             v-for="(item,index) in parkingArray"
             :key="index">
          <div class="label-span">
            <span>车位信息<span v-show="index !== 0">{{index+1}}</span></span>
          </div>
          <div>
            <el-select size="small"
                       filterable
                       style="margin-right:16px"
                       v-model="item.parkingValue"
                       placeholder="请输入">
              <el-option v-for="obj in parkingOptions"
                         :key="obj.value"
                         :label="obj.label"
                         :value="obj.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <span style="font-size:19px;"
                  @click="parkingAdd"><i class="el-icon-circle-plus-outline"></i></span>
            <span style="font-size:19px;margin-left:8px"
                  v-if="index !== 0"
                  @click="parkingRemove(index)"><i class="el-icon-remove-outline"></i></span>
          </div>
        </div>

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

import { userResidentInsert, cpmBuildingUnitFindAll, findByBuildingUnitId, findByBuildingId, } from '@/api/basic'
export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: () => false
    },
    drawerTitle: {
      type: String,
      default: () => ""
    }
  },
  data () {
    return {
      // 楼栋 单元 房产
      buildOptions: [],
      hoursArray: [
        {
          buildValue: null,
          // 单元
          unitValue: null,
          unitOptions: [],
          hoursOptions: [],
          // 房产
          hoursValue: null,
        },
      ],
      // 车位
      parkingOptions: [],
      parkingArray: [
        {
          parkingValue: null,
        },
      ],
      // 亲属
      userOptions: [
        {
          label: '父亲',
          value: 1
        },
        {
          label: '母亲',
          value: 2
        }
      ],
      drawer_vrisible: false,
      // 亲属表格
      tableData: [{
        name: null,
        tel: null,
        idType: null,
        idNumber: null,
        identity: null,
      }],
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
            width: '50%',
            prop: 'idNumber'
          }
        ]
      }
    }
  },
  mounted () {
    // 楼栋下拉选择
    cpmBuildingUnitFindAll().then(res => {
      this.buildOptions = res
    })
  },
  methods: {
    //  提交
    onSubmit () {
      let table_data = this.tableData.map(({ name, tel, idType, idNumber, identity }) => ({ name, tel, idType, idNumber, identity }))
      let result = this.hoursArray.map(i => i.hoursValue)
      for (let key in this.fromjson.ruleForm) {
        if (!this.fromjson.ruleForm[key]) {
          this.$message({
            message: '基础信息为必填项',
            type: 'error'
          })
          return
        }
      }
      for (let i = 0; i < result.length; i++) {
        if (result[i] === null) {
          this.$message({
            message: '请将房屋信息填写完整',
            type: 'error'
          })
          return
        }
      }
      let resData = {
        userResident: {
          name: this.fromjson.ruleForm.name,
          tel: this.fromjson.ruleForm.tel,
          idType: this.fromjson.ruleForm.idType,
          idNumber: this.fromjson.ruleForm.idNumber,
        },
        voRelativesList: table_data,
        buildingUnitEstateIds: result,
        cpmParkingSpaceIds: []
      }
      console.log(resData)
      userResidentInsert(resData).then(res => {
        if (res.status) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.drawerClose()
        }
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
    // 房产添加
    houseAdd () {
      this.hoursArray.push({
        buildValue: null,
        // 单元
        unitValue: null,
        unitOptions: [],
        hoursOptions: [],
        // 房屋
        hoursValue: null,
      })
    },
    // 楼栋数据变化
    buildChange (value, index) {
      this.hoursArray[index].unitOptions = []
      this.hoursArray[index].hoursOptions = []
      this.hoursArray[index].unitValue = null
      this.hoursArray[index].hoursValue = null
      let resData = {
        id: value
      }
      findByBuildingId(resData).then(res => {
        // 给单元号赋值
        this.hoursArray[index].unitOptions = res
      })
    },
    // 单元数据变化
    unitChange (value, index) {
      this.hoursArray[index].hoursValue = null
      this.hoursArray[index].hoursOptions = []
      let resData = {
        id: value
      }
      findByBuildingUnitId(resData).then(res => {
        this.hoursArray[index].hoursOptions = res
      })
    },
    houseRemove (index) {
      this.hoursArray.splice(index, 1);
    },
    parkingAdd () {
      this.parkingArray.push({
        parkingValue: null,
      })
    },
    parkingRemove (index) {
      this.parkingArray.splice(index, 1);
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
    }
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

