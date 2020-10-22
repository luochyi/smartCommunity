<template>
  <div>
    <el-table :data="table_data"
              style="width: 100%"
              @row-click="clickrow"
              highlight-current-row
              :header-cell-style="{ background: '#F5F5F6', color: '#999999' }">
      <template v-for="item in this.table_config.thead">
        <!--查看图片按钮 -->
        <el-table-column v-if="item.type === 'imagebtn'"
                         :key="item.prop"
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width">
          <template slot-scope="scope">
            <!-- 查看图片 -->
            <el-button v-if="scope.row[item.prop] === '1'"
                       class="init-text"
                       type="text"
                       @click="getPhotos()">
              <span>查看</span>
            </el-button>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <!-- 审批结果 -->
        <el-table-column v-else-if="item.type === 'txtbtn'"
                         :key="item.prop"
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width">
          <template slot-scope="scope">
            <div>
              <div v-if="JSON.stringify(scope.row[item.prop]) != '{}'">
                <span style="padding-right:20px">
                  {{ scope.row[item.prop].status }}</span>
                <el-button class="init-text"
                           type="text"
                           @click="getPhotos()">
                  <span> {{ scope.row[item.prop].label }}</span>
                </el-button>

              </div>
              <div v-else>
                <span>-</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- 文字提示 -->
        <el-table-column v-else-if="item.type === 'tooltip'"
                         :key="item.prop"
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width">
          <template slot-scope="scope">
            <div>
              <el-tooltip v-if="scope.row[item.prop] != ''"
                          class="item"
                          effect="dark"
                          :content="scope.row[item.prop]"
                          placement="bottom-end">
                <el-button class=" init-text"
                           type="text">
                  <span class="el-icon-warning-outline"
                        style="font-size:24px"></span>
                </el-button>
              </el-tooltip>
              <span v-else>
                -
              </span>
            </div>
          </template>
        </el-table-column>
        <!-- 星级评分 -->
        <el-table-column v-else-if="item.type === 'Rate'"
                         :key="item.prop"
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width">
          <template slot-scope="scope">
            <div>
              <el-rate v-model="scope.row[item.prop]"
                       :colors="colors"
                       v-if="scope.row[item.prop] != ''"
                       disabled></el-rate>
              <span v-else>
                -
              </span>
            </div>
          </template>
        </el-table-column>
        <!--插槽slot-->
        <el-table-column v-else-if="item.type === 'slot_check'"
                         :key="item.prop"
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width">
          <template slot-scope="scope">
            <!-- <span>--{{scope.row[item.prop]}}-</span> -->
            <span v-if="scope.row[item.prop]=== '1'">
              <div class="slot-check">
                <span class="el-icon-check"></span>
              </div>
            </span>
            <span v-if="scope.row[item.prop] ==='0'">
              <div class="slot-close">
                <span class="el-icon-close"></span>
              </div>
            </span>
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
        <!--纯文本渲染-->
        <el-table-column v-else
                         :sortable="item.sortable"
                         :key="item.prop"
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width">
          <template slot-scope="scope">
            <span v-if="scope.row[item.prop] != ''">{{
              scope.row[item.prop]
            }}</span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <views-photo :isVisible="isVisible"
                 @closeViews="getclose"></views-photo>
  </div>
</template>

<script>
import viewsPhoto from '@/components/dialog/viewsPhoto'
export default {
  data () {
    return {
      // 加载提示
      isVisible: false,
      loading_table: true,
      // tableData
      // 绑定数据
      table_data: [],
      table_config: {
        // 表头
        thead: [],
        // 绑定数据
        data: {}
      },
      colors: ['#FB4702', '#FB4702', '#FB4702'],
      form_data: {}
    }
  },
  components: {
    viewsPhoto
  },
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    clickrow (row, event, column) {
      console.log('当前选中行')
      console.log(row)
      this.$emit('clickrow', row)

    },
    // 查看图片
    getPhotos () {
      this.isVisible = true
    },
    // 监听图片组件关闭事件
    getclose () {
      this.isVisible = false
    },
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
    loadData () {
      // let requestData = {
      //   url: this.table_config.url,
      //   data: this.table_config.data
      // }
      // this.loading_table = true
      // GetTableData(requestData)
      //   .then(response => {
      //     const data = response.data
      //     // 判断数据是否存在
      //     if (data) {
      //       this.table_data = data.data
      //     }
      //     // 页码
      //     this.$nextTick(() => {
      //       // 考虑到DOM元素渲染完成时候
      //     })
      //     this.total = data.total
      //     this.loading_table = false
      //   })
      //   .catch(error => {
      //     this.loading_table = false
      //   })
      // console.log(this.config.table_data)
      this.table_data = this.config.table_data
    }
  },
  watch: {
    config: {
      handler (newValue) {
        this.initConfig()
        // console.log('------ table')
        // console.log(newValue)
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.slot-check,
.slot-close {
  cursor: pointer;
  width: 18px;
  height: 18px;
  color: white;
  text-align: center;
  line-height: 18px;
  font-size: 18px;
  font-weight: 600;
}
.slot-check {
  background: #39b54a;
}
.slot-close {
  background: #ff6969;
}
</style>
