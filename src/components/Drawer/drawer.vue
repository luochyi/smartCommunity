<template>

  <div>
    <el-drawer title="我是标题"
               :visible.sync="isVisibleDrawe"
               size="58%"
               :before-close="handleClose"
               :with-header="false">

      <div class="drawer-box">
        <div class="dra-header">
          <span>{{configObj.head_title}}</span>
        </div>
        <div class="dra-body">
          <div class="dra-content">
            <div class="content-titel">
              <span>基本信息</span>
            </div>
            <div class="">
              <el-form label-position="right"
                       :rules="configObj.rules"
                       size="small"
                       ref="ruleForm"
                       :model="configObj.ruleForm"
                       label-width="auto"
                       class="demo-ruleForm">
                <el-form-item v-for="item in configObj.form_item"
                              :key="item.prop"
                              :label="item.label"
                              :prop="item.prop"
                              :rules="item.rules"
                              :style="{width: item.width}">
                  <el-input v-if="item.type === 'Input'"
                            v-model.trim="configObj.ruleForm[item.prop]"
                            :placeholder="item.placeholder"
                            :disabled="item.disabled"
                            style="width: 240px;"></el-input>
                  <el-date-picker v-else-if="item.type === 'date'"
                                  type="date"
                                  size="small"
                                  v-model.trim="configObj.ruleForm[item.prop]"
                                  :placeholder="item.placeholder"
                                  :disabled="item.disabled"
                                  style="width: 240px;"></el-date-picker>
                  <el-select size="small"
                             v-else-if="item.type === 'Select'"
                             v-model.trim="configObj.ruleForm[item.prop]"
                             :placeholder="item.placeholder"
                             :disabled="item.disabled"
                             style="width: 240px;">
                    <el-option v-for="selectItem in item.options"
                               :key="selectItem.value || selectItem[item.select_vlaue]"
                               :value="selectItem.value || selectItem[item.select_vlaue]"
                               :label="selectItem.label || selectItem[item.select_label]"></el-option>
                  </el-select>
                  <span v-else-if="item.type === 'span'"
                        :placeholder="item.placeholder"
                        style="width: 240px;"
                        :style="{ color: item.color }">{{configObj.ruleForm[item.prop]}}</span>
                  <el-input v-else-if="item.type === 'textarea'"
                            type="textarea"
                            :rows="item.rows"
                            size="small"
                            v-model.trim="configObj.ruleForm[item.prop]"
                            :placeholder="item.placeholder">
                  </el-input>
                  <editor-bar v-else-if="item.type === 'editor'"
                              :style="{width: item.width}"></editor-bar>
                  <el-upload v-else-if="item.type === 'upload'"
                             action="https://jsonplaceholder.typicode.com/posts/">
                    <el-button icon="el-icon-edit"
                               size="small">上传图片</el-button> <span>建议比例3:2</span>
                    <div slot="tip"
                         class="el-upload__tip">
                      <span>支持扩展名：png.pdf.jpg</span>
                    </div>
                  </el-upload>

                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div class="dra-footer">
          <div class="dra-footer-content">
            <button class="dra-submit el-icon-circle-check"
                    @click="onSubmit('ruleForm')"><span>提交</span></button>
            <button class="dra-cancel"
                    @click="handleClose('ruleForm')"><span>取消</span></button>
          </div>
        </div>
      </div>
    </el-drawer>

  </div>
</template>

<script>
import editorBar from '@/components/editor/editorBar.vue';
export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: false
    },
    drawer_config: {
      type: Object,
      default: () => ({})
    },
  },
  components: {
    editorBar
  },
  data () {
    return {
      input: '',
      isVisibleDrawe: false,
      configObj: {
        // 表头
        head_title: '',
        // 绑定数据
        ruleForm: {},
        rules: {},
        form_item: []
      },
    }
  },
  mounted () {

  },
  methods: {
    // 提交
    onSubmit (formName) {
      // 
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!')
          this.$refs['ruleForm'].resetFields();
          this.$emit('handleClose', 'submit')
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    },
    // 重置
    // 取消关闭esc
    handleClose () {
      this.$refs['ruleForm'].resetFields();
      this.$emit('handleClose', "Close")
    },
    initConfig () {
      // 父组件传递数据过滤
      for (const key in this.drawer_config) {
        if (Object.keys(this.configObj).includes(key)) {
          this.configObj[key] = this.drawer_config[key]
        }
      }
    },
  },
  watch: {
    drawerVrisible: {
      handler (newValue) {
        this.isVisibleDrawe = newValue
      },
      immediate: true
    },
    drawer_config: {
      handler (newValue) {
        this.initConfig()
      },
      immediate: true
    },
  }
}
</script>
<style >
.content-titel2 {
  margin: 0px 0px 20px 30px;
  padding-top: 30px;
  border-top: 1px solid #e8e8e8;
}
</style>
