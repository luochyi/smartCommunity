<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>关联房屋</span>
      </div>
      <div class="dra-body">
        <div class="dra-content">
          <div class="content-titel">
            <span>基本信息</span>
          </div>
          <div class="">
            <el-form
              ref="form"
              label-position="right"
              :model="form"
              label-width="100px"
            >
              <div class="form-box">
                <div class="form-item">
                  <el-form-item label="姓名">
                    <span>王康康</span>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="手机号">
                    <span>1582314345</span>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="身份证">
                    <span>21312454359283</span>
                  </el-form-item>
                </div>
                <div class="form-item" style="width:100%">
                  <el-form-item label="房屋产权">
                    <div style="display:flex">
                      <el-select
                        v-model="value"
                        placeholder="幢"
                        size="small"
                        style="max-width:108px;margin-right:10px"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                      <el-select
                        v-model="value"
                        placeholder="单元"
                        size="small"
                        style="max-width:108px;margin-right:10px"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                      <el-select
                        v-model="value"
                        placeholder="房间号"
                        size="small"
                        style="max-width:108px;margin-right:10px"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                      <el-button
                        type="text"
                        icon="el-icon-circle-plus-outline"
                        style="font-size:19px;color:#444444"
                        @click="addDomain"
                      ></el-button>
                    </div>
                  </el-form-item>
                </div>
                <div
                  class="form-item"
                  style="width:100%"
                  v-for="(domain, index) in dynamicValidateForm.domains"
                  :key="domain.key"
                >
                  <el-form-item :label="'房屋产权' + index">
                    <div style="display:flex">
                      <!-- :prop="'domains.' + index + '.value'" -->
                      <el-select
                        v-model="value"
                        placeholder="幢"
                        size="small"
                        style="max-width:108px;margin-right:10px"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                      <el-select
                        v-model="value"
                        placeholder="单元"
                        size="small"
                        style="max-width:108px;margin-right:10px"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                      <el-select
                        v-model="value"
                        placeholder="房间号"
                        size="small"
                        style="max-width:108px;margin-right:10px"
                      >
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                      <el-button
                        type="text"
                        icon="el-icon-circle-plus-outline"
                        style="font-size:19px;color:#444444"
                        @click="addDomain"
                      ></el-button>
                      <el-button
                        type="text"
                        icon="el-icon-remove-outline"
                        style="font-size:19px;color:#444444"
                        @click.prevent="removeDomain(domain)"
                      ></el-button>
                    </div>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
      <div class="dra-footer">
        <div class="dra-footer-content">
          <button class="dra-submit el-icon-circle-check">
            <span>提交</span>
          </button>
          <button class="dra-cancel"><span>取消</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
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
      dynamicValidateForm: {
        domains: [
          {
            value: ''
          }
        ]
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
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
        }
      ],
      value: '',
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
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
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
