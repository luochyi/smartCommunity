<template>
  <div>
    <!-- 页面搜索重置输入框组件 -->
    <div class="title-input">
      <el-form :model="form"
               ref="form"
               :label-width="labelWidth"
               size="mini">
        <div class="title-input-box">
          <div class="title-item"
               v-for="item in formItem"
               :key="item.prop">
            <el-form-item :prop="item.prop"
                          :label="item.label"
                          :style="{ width: item.width }">
              <el-input v-if="item.type === 'Input'"
                        v-model.trim="form[item.prop]"
                        :placeholder="item.placeholder"
                        :disabled="item.disabled"
                        :style="{ width: item.inputWidth }">
              </el-input>
              <el-input v-else-if="item.type === 'Int'"
                        oninput="value=value.replace(/[^\d]/g,'')"
                        v-model.trim="form[item.prop]"
                        :placeholder="item.placeholder"
                        :disabled="item.disabled"
                        :style="{ width: item.inputWidth }"></el-input>
              <!-- <el-date-picker v-else-if="item.type === 'startEndDate'"
                              v-model="form[item.prop]"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd hh:mm:ss"
                              :default-time="['00:00:00', '23:59:59']"
                              type="daterange"
                              :range-separator="item.rangeSeparator"
                              :start-placeholder="item.startPlaceholder"
                              :end-placeholder="item.endPlaceholder"
                              style="width:240px">
              </el-date-picker> -->
              <el-select v-else-if="item.type === 'select'"
                         v-model.trim="form[item.prop]"
                         :placeholder="item.placeholder">
                <el-option v-for="item in item.options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
              <el-checkbox-group v-else-if="item.type === 'checkbox'"
                                 :style="{ width: item.checkboxWidth }"
                                 v-model="form[item.prop]">
                <el-checkbox v-for="item in item.options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-checkbox>
              </el-checkbox-group>
              <el-date-picker v-else-if="item.type === 'Date'"
                              value-format="yyyy/MM/dd"
                              type="date"
                              v-model="form[item.prop]"
                              :placeholder="item.placeholder"></el-date-picker>
              <el-date-picker v-else-if="item.type === 'startDate'"
                              value-format="yyyy/MM/dd HH:mm:ss"
                              type="datetime"
                              v-model="form[item.prop]"
                              :placeholder="item.placeholder"></el-date-picker>
              <el-date-picker v-else-if="item.type === 'endDate'"
                              value-format="yyyy/MM/dd HH:mm:ss"
                              type="datetime"
                              v-model="form[item.prop]"
                              default-time="23:59:59"
                              :placeholder="item.placeholder"></el-date-picker>
              <el-date-picker v-else-if="item.type === 'picker'"
                              v-model="form[item.prop]"
                              value-format="yyyy/MM/dd HH:mm:ss"
                              @change="GetzhifuTime"
                              type="datetimerange"
                              :style="{ width: item.width }"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
              <el-input v-else-if="item.type === 'textarea'"
                        type="textarea"
                        :rows="item.rows"
                        v-model="form[item.prop]"
                        :placeholder="item.placeholder">
              </el-input>
              <slot v-else-if="item.type = 'Slot'"
                    :name="item.slotName"></slot>
            </el-form-item>
          </div>
        </div>
        <div class="title-input-btn"
             :style="{ width: btnWidth }">
          <el-form-item label-width="0px">
            <button class="inquire-button"
                    @click="onSubmit()">
              查询
            </button>
            <button class="reset-button"
                    @click="resetForm('form')">
              重置
            </button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  // 获取父组件传递参数

  props: {
    labelWidth: {
      type: String,
      default: "auto"
    },
    formItem: {
      type: Array,
      default: () => [],
    },
    btnWidth: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      form: {},
    }
  },
  methods: {
    initFromDate () {
      const forDate = {}
      // 取出formItem的prop
      this.formItem.forEach((item) => {
        if (item.type === 'picker') {
          forDate[item.startDate] = item.value || null
          forDate[item.endDate] = item.value || null
        } else if (item.prop) {
          forDate[item.prop] = item.value || null
        }
        // picker
      })
      this.form = forDate
      console.log(this.form)
    },
    GetzhifuTime (value) {
      // console.log(value)
    },
    onSubmit () {
      console.log(this.form)
      this.$emit('searchForm', this.form)
    },
    resetForm (form) {
      this.$refs[form].resetFields()
      this.$emit('searchForm', this.form)
    },
  },
  watch: {
    formItem: {
      handler (newValue) {
        this.initFromDate()
      },
      immediate: true,
    },
    btnWidth: {
      handler (newValue) {
        this.btnWidth = newValue
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>
<style scoped>
.el-form {
    display: flex;
}

.title-input-box {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.title-item {
    display: flex;
    flex-wrap: wrap;
    min-width: 25%;
    box-sizing: border-box;
    padding-right: 20px;
}
.title-input .el-form .el-form-item .el-select,
.title-input .el-form .el-form-item .el-input {
    width: 240px;
}
.title-input-btn {
    width: 10%;
}
.el-form-item__content .inquire-button {
    margin-bottom: 20px;
}
.title-input-btn > .el-form-item {
    width: 100%;
    line-height: 20px;
}
</style>
