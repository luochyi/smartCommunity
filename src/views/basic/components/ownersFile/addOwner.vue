<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>新增租户</span>
      </div>
      <div class="dra-body">
        <div class="dra-content">
          <div class="content-titel">
            <span>基本信息</span>
          </div>
          <div class="">
            <el-form ref="form" label-position="right" :model="form" label-width="100px">
              <div class="form-box">
                <div class="form-item">
                  <el-form-item label="姓名">
                    <el-input v-model="form.name"
                    size="small"
                    style="width:240px"
                    placeholder="请输入"
                    >
                    </el-input>
                  </el-form-item>
                </div>
                 <div class="form-item">
                   <el-form-item label="手机号">
                    <el-select v-model="value" placeholder="请选择" size="small" style="width:240px">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="form-box">
                <div class="form-item">
                  <el-form-item label="证件类ss型">
                    <el-select v-model="value" placeholder="请选择" size="small" style="width:240px">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="证件号码">
                    <el-input v-model="form.name"
                    size="small"
                    style="width:240px"
                    placeholder="请输入"
                    >
                    </el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
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
                :header-cell-style="{background:'#F5F5F6',color:'#999999'}"
                >
                  <el-table-column
                    prop="id"
                    label="序号"
                    width="70">
                  </el-table-column>
                  <el-table-column
                    label="姓名">
                    <template>
                      <el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="手机号">
                    <template>
                      <el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="身份">
                    <template>
                      <el-select v-model="value" placeholder="请选择" size="small">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="证件类型">
                    <el-select v-model="value" placeholder="请选择" size="small">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-table-column>
                  <el-table-column
                    label="证件号码"
                    width="180"
                    prop="input">
                    <template>
                      <div style="display:flex;align-items: center;">
                        <div>
                          <el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                        <div>
                          <el-button type="text"  icon="el-icon-delete" style="color:#444444;font-size:20px"></el-button>
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
          <button  class="dra-submit el-icon-circle-check"><span>提交</span></button>
          <button class="dra-cancel"><span>取消</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      },
      {
        value: '选项2',
        label: '黄金糕'
      },
      {
        value: '选项3',
        label: '蚵仔煎'
      },
      {
        value: '选项4',
        label: '龙须面'
      },
      {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      tableData: [{
        id: 1,
        ParkingNumber: 'A128',
        status: '已售',
        ParkingType: '产权车位',
        owner: '夏恒灵',
        userName: '夏恒灵 ',
        phone: '18965334842'
      }]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
<style scoped>
  .content-titel2{
    margin: 0px 0px 20px 30px;
    padding-top: 30px;
    border-top: 1px solid #E8E8E8;
  }
</style>
