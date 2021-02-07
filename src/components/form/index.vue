<template>
  <div class="main-form">
    <el-form label-position="right"
             :model="form"
             :rules="rulesItem"
             ref="form"
             label-width="auto">
      <el-form-item v-for="item in formItem"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :style="{ width: item.width }">
        <el-input v-if="item.type === 'Input'"
                  size="small"
                  v-model="form[item.prop]"
                  :placeholder="item.placeholder"
                  :disabled="item.disabled"
                  style="width: 240px;">
        </el-input>
        <el-select v-else-if="item.type === 'select'"
                   size="small"
                   v-model="form[item.prop]"
                   :placeholder="item.placeholder"
                   :disabled="item.disabled"
                   style="width: 240px;">
          <el-option v-for="item in item.options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker v-else-if="item.type === 'date'"
                        type="date"
                        size="small"
                        v-model="form[item.prop]"
                        :placeholder="item.placeholder"
                        style="width: 240px;"></el-date-picker>
        <el-input v-else-if="item.type === 'textarea'"
                  type="textarea"
                  :rows="item.rows"
                  size="small"
                  v-model="form[item.prop]"
                  :placeholder="item.placeholder">
        </el-input>
        <span v-else-if="item.type === 'span'"
              :style="{ color: item.color }">{{
          item.value
        }}</span>
        <el-image v-else-if="item.type ==='imagePreview'"
                  style="width: 100px; height: 100px"
                  :src="url"
                  :preview-src-list="srcList">
        </el-image>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // 获取父组件传递参数
  props: {
    formItem: {
      type: Array,
      default: () => [],
    },
    rulesItem: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted () {
    console.log('---------mounted')
    console.log(this.formItem)
  },
  data () {
    return {
      form: {},
      url:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      ],
    }
  },
  methods: {
    initFromDate () {
      const forDate = {}
      // 取出formItem的prop
      this.formItem.forEach((item) => {
        if (item.prop) {
          forDate[item.prop] = item.value || null
        }
        // console.log(this.form)
      })
      this.form = forDate
    },
    onSubmit (form) {
      console.log(this.form)
      // this.$refs[form].resetFields();
      console.log((this.form = {}))
    },
  },
  watch: {
    formItem: {
      handler (newValue) {
        this.initFromDate()
        console.log('formItem')
        console.log(newValue)
      },
      immediate: true,
    },
    rulesItem: {
      handler (newValue) {
        // this.initFromDate()
        console.log('rulesItem')
        console.log(newValue)
      },
      immediate: true,
    },
  },
}
</script>
<style lang="scss">
.main-form {
    .el-form {
        .el-form-item {
            .el-input {
                width: 240px;
            }
        }
    }
    .content-titel2 {
        margin: 0px 0px 20px 30px;
        padding-top: 30px;
        border-top: 1px solid #e8e8e8;
    }
    .el-form {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 90%;
        margin: 0 auto;
    }
}

@media screen and (min-width: 1600px) {
    .el-form {
        width: 85%;
    }
}
@media screen and (min-width: 1800px) {
    .el-form {
        width: 80%;
    }
}
@media screen and (max-width: 1440px) {
    .el-form {
        width: 95%;
    }
}
@media screen and (max-width: 1300px) {
    .el-form {
        width: 100%;
    }
}
.el-form-item {
    width: 50%;
}
</style>
