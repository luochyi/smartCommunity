<template>
  <div>
    <div>
      <!-- search_form -->
      <template v-if="table_config.search_item.length">
        <searchForm :formItem="table_config.search_item"
                    @searchForm="search"
                    :btnWidth="'20%'">
        </searchForm>
      </template>

      <slot name="tabs"></slot>
      <div class="content-table">
        <div style='width:100%;'>
          <el-table style="width: 100%"
                    @selection-change="tableCheck"
                    v-loading="loading_table"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    highlight-current-row
                    :default-sort="{prop: 'date', order: 'descending'}"
                    :header-cell-style="{ background: '#F5F5F6', color: '#999999' }"
                    :data="table_data">
            <el-table-column v-if="table_config.checkbox"
                             type="selection"
                             width="55"></el-table-column>
            <template v-for="item in this.table_config.thead">
              <!--回调-->
              <el-table-column v-if="item.type === 'function'"
                               :key="item.prop"
                               :prop="item.prop"
                               :label="item.label"
                               :width="item.width">
                <template slot-scope="scope">
                  <span v-html="item.callback && item.callback(scope.row, item.prop)"></span>
                </template>
              </el-table-column>
              <!--插槽slot-->
              <el-table-column v-else-if="item.type === 'slot'"
                               :key="item.prop"
                               :prop="item.prop"
                               :label="item.label"
                               :width="item.width">
                <template slot-scope="scope">
                  <slot :name="item.slotName"
                        :data="scope.row"></slot>
                </template>
              </el-table-column>
              <!-- 序号 -->
              <el-table-column v-else-if="item.type === 'index'"
                               :key="item.type"
                               :type="item.type"
                               :label="item.label"
                               :width="item.width">
              </el-table-column>
              <!--纯文本渲染-->
              <el-table-column v-else
                               :key="item.prop"
                               :prop="item.prop"
                               :label="item.label"
                               :width="item.width"></el-table-column>
            </template>
          </el-table>
        </div>
        <slot name="footer"></slot>
      </div>
      <table-pagination v-if="table_config.pagination"
                        :totalNumber='totalNumber'
                        :pageCount='pageCount'
                        :limit='table_config.data.size'
                        :currentPage='table_config.data.pageNum'
                        @handleSizeChange="handleSizeChange"
                        @handleCurrentChange="handleCurrentChange"></table-pagination>
    </div>
  </div>
</template>
<script>
import { GetTableData, Delete } from '@/api/basic'
export default {
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data () {
    return {
      // 当前页面
      currentPage: 1,
      // 每页显示数量
      limit: 10,
      // 当前总页数
      pageCount: 1,
      // 当前总条数
      totalNumber: 1,
      // 表格数据
      table_data: [],
      loading_table: true,
      table_config: {
        thead: [],
        checkbox: true,
        url: '',
        pagination: true,
        data: {},
        search_form: true,
        // form
        search_item: [],
      },
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    // 配置相关参数
    initConfig () {
      // 父组件传递数据过滤
      for (const key in this.config) {
        if (Object.keys(this.table_config).includes(key)) {
          this.table_config[key] = this.config[key]
        }
      }
      // 配置完成后开始读取接口数据
      this.loadData()
    },

    sortChage (column) {
      console.log(column)

    },
    // 表格选中数据
    tableCheck (val) {
      console.log(val)
      this.$emit('tableCheck', val)
    },
    // 数据加载
    loadData () {
      let requestData = {
        url: this.table_config.url,
        data: this.table_config.data,
      }
      console.log(requestData)
      this.loading_table = true
      GetTableData(requestData)
        .then((response) => {
          console.log(response)
          // 判断数据是否存在
          if (response) {
            this.table_data = response.tableList
            this.loading_table = false
          }
          this.pageCount = response.pageCount
          this.totalNumber = response.rowCount
        })
        .catch((error) => {
          this.loading_table = false
        })
    },
    // 重新配置请求参数
    requestData (params) {
      if (params) {
        // 处理业务逻辑
        this.table_config.data = params
        this.limit = params.size
      }
      this.loadData()
    },
    /** 切换页面显示数量 */
    handleSizeChange (val) {
      // let requestData = {
      //   size: val,
      //   pageNum: 1
      // }
      this.table_config.data.size = val;

      this.requestData()
      // this.currentPage = 1
    },
    // 切换页码
    handleCurrentChange (val) {
      // this.currentPage = val
      this.table_config.data.pageNum = val;
      this.loadData()
    },
    // 查询
    search (data) {
      const searchData = data
      searchData.pageNum = 1
      searchData.size = this.table_config.data.size
      this.requestData(searchData)
    },
    // 删除表格数据
    tableDelete (params) {
      if (params) {
        // 处理业务逻辑
        let requestData = {
          url: this.table_config.url + "Delete",
          data: {
            ids: params
          },
        }
        Delete(requestData)
          .then((res) => {
            if (!res.status) return
            // 判断数据是否存在
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.table_config.data.pageNum = 1;
            this.currentPage = 1;
            this.loadData()
          })
          .catch((error) => {
            this.loading_table = false
          })
      }

    }
  },
  watch: {
    config: {
      handler (newValue) {
        this.initConfig()
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>
