<template>
  <div>
    <div class="pagination-box">
      <div class="pagination-item">
        <p>
          当前1-{{ pageCount }}，共{{totalNumber}}条 <span>每页显示{{ limit }}条</span>
        </p>
      </div>
      <div class="pagination-item">
        <div class="block">
          <!--  :page-sizes="[1, 10, 50, 100]"
                         layout="sizes,prev, pager, next,slot" -->
          <el-pagination @current-change="handleCurrentChange"
                         @size-change="handleSizeChange"
                         :page-size="limit"
                         background
                         :pager-count="9"
                         :current-page="currentPage"
                         layout="prev, pager, next,slot"
                         :total="totalNumber">
            <div class="page-slot">
              <span>向第</span>
              <el-input v-model.number="page"
                        @keyup.enter.native="jump()"
                        class="page-jump"
                        style="width:52px"></el-input>
              <span>页</span>
              <div class="slot-jump"
                   @click="jump()">跳转</div>
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
      input: '',
      page: null
    }
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
    totalNumber: {
      type: Number,
      default: 100
    },
    pageCount: {
      type: Number,
      default: 1
    },
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    },
    // 跳转
    jump () {
      if (parseInt(this.page) > this.pageCount) {
        this.page = this.pageCount
      }
      this.$emit('handleCurrentChange', parseInt(this.page))
    }
  }
}
</script>
<style scoped>
</style>
