
<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>关联车位</span>
      </div>
      <div class="dra-body">
        <div class="dra-content">
          <div class="content-titel">
            <span>基本信息</span>
          </div>
          <div class="">
            <el-form ref="form" label-position="right" :model="form" label-width="100px">
              <div class="form-box">
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
                    <el-form-item label="车位1">
                      <div style="display:flex">
                        <el-select v-model="value" placeholder="A103" size="small">
                          <el-option>
                          </el-option>
                        </el-select>
                      </div>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form>
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
<style scoped>
.el-form-item span{
  color: #666666;
  font-weight: 400;
  font-size: 14px;
}
</style>
