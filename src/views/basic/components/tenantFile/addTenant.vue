<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>添加租户</span>
      </div>
      <div class="dra-body">
        <div class="dra-content">
          <div class="content-titel">
            <span>基本信息</span>
          </div>
          <form-datechildren
            :formItem="form_item"
            ref="formData"
          ></form-datechildren>
          <div class="dra-content2">
            <div class="content-titel2">
              <el-button class="init-text" type="text">添加成员</el-button>
            </div>
            <div class="dra-table">
              <div class="content-table">
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  highlight-current-row
                  :header-cell-style="{
                    background: '#F5F5F6',
                    color: '#999999'
                  }"
                >
                  <el-table-column prop="id" label="序号" width="70">
                  </el-table-column>
                  <el-table-column label="姓名">
                    <template>
                      <el-input
                        size="small"
                        v-model="input"
                        placeholder="请输入内容"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="手机号">
                    <template>
                      <el-input
                        size="small"
                        v-model="input"
                        placeholder="请输入内容"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="身份">
                    <template>
                      <el-select
                        v-model="value"
                        placeholder="请选择"
                        size="small"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="证件类型">
                    <el-select
                      v-model="value"
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-table-column>
                  <el-table-column label="证件号码" width="180" prop="input">
                    <template>
                      <div style="display:flex;align-items: center;">
                        <div>
                          <el-input
                            size="small"
                            v-model="input"
                            placeholder="请输入内容"
                          ></el-input>
                        </div>
                        <div>
                          <el-button
                            type="text"
                            icon="el-icon-delete"
                            style="color:#444444;font-size:20px"
                          ></el-button>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dra-footer">
        <div class="dra-footer-content">
          <button class="dra-submit el-icon-circle-check" @click="onSubmit">
            <span>提交</span>
          </button>
          <button class="dra-cancel"><span>取消</span></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import formDatechildren from '@/components/form/formDatechildren'
export default {
  data() {
    return {
      input: '',
      form_item: [
        {
          type: 'Input',
          label: '姓名',
          placeholder: '请输入',
          prop: 'userName'
        },
        {
          type: 'Input',
          label: '手机号',
          placeholder: '请输入',
          prop: 'phone'
        },
        {
          type: 'date',
          label: '起始日期',
          placeholder: '请选择日期',
          prop: 'startDate'
        },
        {
          type: 'date',
          label: '终止日期',
          placeholder: '请选择日期',
          prop: 'endDate'
        },
        {
          type: 'select',
          label: '状态',
          placeholder: '请选择租房状态',
          prop: 'status',
          options: [
            {
              value: '1',
              label: '已租'
            },
            {
              value: '2',
              label: '已售'
            }
          ]
        }
      ],
      value: '',
      options: [
        {
          value: '1',
          label: '黄金糕2'
        },
        {
          value: '2',
          label: '黄金2糕'
        },
        {
          value: '3',
          label: '黄金糕3'
        },
        {
          value: '4',
          label: '黄金4糕'
        },
        {
          value: '5',
          label: '黄金5糕'
        },
        {
          value: '选项1122',
          label: 'sadasd'
        }
      ],
      tableData: [
        {
          id: 1,
          ParkingNumber: 'A128',
          status: '已售',
          ParkingType: '产权车位',
          owner: '夏恒灵',
          userName: '夏恒灵 ',
          phone: '18965334842'
        }
      ]
    }
  },
  components: {
    formDatechildren
  },
  methods: {
    onSubmit() {
      // console.log(this.$refs.header.formData)
      console.log('submit!')
    }
  }
}
</script>
<style scoped>
.content-titel2 {
  margin: 0px 0px 20px 30px;
  padding-top: 30px;
  border-top: 1px solid #e8e8e8;
}
</style>
