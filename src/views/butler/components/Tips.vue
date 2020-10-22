<template>
  <div class="tips">
    <p>
      <span class="el-icon-warning-outline" style="margin:0 12px"></span>
      温馨提示：今日预计有
      <span style="color:rgba(251, 71, 2, 1)">3</span>
      户家庭发起装修，共计8户家庭未执行
    </p>
  </div>
</template>

<script>
export default {
  props: {
    tipsJson: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    console.log('---------mounted')
    console.log(this.tipsJson)
  },
  data() {
    return {
      tipsObj: ''
    }
  },
  methods: {
    initFromDate() {
      const forDate = {}
      // 取出formItem的prop
      // this.tipsJson.forEach(item => {
      //   if (item.prop) {
      //     forDate[item.prop] = item.value || null
      //   }
      //   // console.log(this.form)
      // })
      // this.tipsObj = forDate
      console.log('---------initFromDate' + forDate)
    }
  },
  watch: {
    tipsJson: {
      handler(newValue) {
        this.initFromDate()
        console.log('newValue')
        console.log(newValue)
      },
      immediate: true
    }
  }
}
</script>

<style scoped></style>
