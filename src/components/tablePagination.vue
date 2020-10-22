<template>
  <div>
    <div class="pagination-box">
      <div class="pagination-item">
        <p>
          当前1-{{ pageArr }}，共{{totalNumber}}条 <span>每页显示{{ pageSize }}条</span>
        </p>
      </div>
      <div class="pagination-item">
        <div class="block">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-size="pageSize"
                         background
                         :pager-count="9"
                         :current-page="currentPage"
                         layout="prev, pager, next,slot"
                         :total="totalNumber">
            <div class="page-slot">
              <span>向第</span>
              <el-input v-model="page"
                        @keyup.enter.native="fn()"
                        class="page-jump"
                        style="width:52px"></el-input>
              <span>页</span>
              <div class="slot-jump"
                   @click="fn()">跳转</div>
            </div>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1,
      // totalNumber: 1000,
      // pageSize: 100,
      input: '',
      page: ''
    }
  },
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    totalNumber: {
      type: Number,
      default: 1000
    }
  },
  computed: {
    pageArr () {
      var totalPage = this.totalNumber / this.pageSize
      return totalPage
    }
  },
  methods: {
    submitForm (formName) { },
    resetForm (formName) { },
    // 表格分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    fn () {
      this.currentPage = parseInt(this.page)
      this.$options.methods.handleCurrentChange(this.currentPage)
    }
  }
}
</script>
<style scoped>
</style>
