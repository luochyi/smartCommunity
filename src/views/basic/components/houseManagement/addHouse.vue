<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>添加车位</span>
      </div>
      <div class="dra-body">
        <div class="dra-content">
          <div class="content-titel">
            <span>基本信息</span>
          </div>
          <div class="">
            <el-form ref="form"
                     label-position="right"
                     :model="form"
                     label-width="100px">
              <div class="form-box">
                <div class="form-item">
                  <el-form-item label="楼栋">
                    <el-select v-model="value"
                               placeholder="请选择"
                               size="small"
                               style="width:240px">
                      <el-option v-for="item in options"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="单元号">
                    <el-select v-model="value"
                               placeholder="请选择"
                               size="small"
                               style="width:240px">
                      <el-option v-for="item in options"
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
                  <el-form-item label="房屋名称">
                    <el-select v-model="value"
                               placeholder="请选择"
                               size="small"
                               style="width:240px">
                      <el-option v-for="item in options"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="房屋状态">
                    <el-select v-model="value"
                               placeholder="请选择"
                               size="small"
                               style="width:240px">
                      <el-option v-for="item in options"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="车位编号">
                    <el-input v-model="form.name"
                              size="small"
                              style="width:240px"
                              placeholder="请输入">
                      <i slot="suffix"
                         style="font-style:normal"
                         class="metre">㎡</i>
                    </el-input>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="房屋类型">
                    <el-select v-model="value"
                               placeholder="请选择"
                               size="small"
                               style="width:240px">
                      <el-option v-for="item in options"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="车位编号">
                    <el-input v-model="form.name"
                              size="small"
                              style="width:240px"
                              placeholder="请输入">
                      <i slot="suffix"
                         style="font-style:normal"
                         class="metre">㎡</i>
                    </el-input>
                  </el-form-item>
                </div>
                <div class="form-item">
                </div>
              </div>
              <!-- <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item> -->
            </el-form>
          </div>
        </div>
        <div class="dra-content">
          <div class="content-titel">
            <span>业主关联</span>
          </div>
          <div class="">
            <el-form ref="form"
                     label-position="right"
                     :model="form"
                     label-width="100px">
              <div class="form-box">
                <div class="form-item">
                  <el-form-item label="业主姓名">
                    <el-input v-model="form.name"
                              size="small"
                              style="width:240px"
                              placeholder="请输入">
                    </el-input>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="联系方式">
                    <el-select v-model="value"
                               placeholder="请选择"
                               size="small"
                               style="width:240px">
                      <el-option v-for="item in options"
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
                  <el-form-item label="证件类型">
                    <el-select v-model="value"
                               placeholder="请选择"
                               size="small"
                               style="width:240px">
                      <el-option v-for="item in options"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="证件号码">
                    <el-select v-model="value"
                               placeholder="请选择"
                               size="small"
                               style="width:240px">
                      <el-option v-for="item in options"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <!-- <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item> -->
            </el-form>
          </div>
        </div>
      </div>

      <div class="dra-footer">
        <div class="dra-footer-content">
          <button class="dra-submit el-icon-circle-check"><span>提交</span></button>
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
      }],
      value: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
