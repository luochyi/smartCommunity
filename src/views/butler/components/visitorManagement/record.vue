<template>
  <div>
    <el-drawer title="我是标题"
               :visible.sync="drawerVrisible"
               size="58%"
               :before-close="handleClose"
               :with-header="false">
      <div class="drawer-box">
        <div class="dra-header">
          <span>出入记录</span>
        </div>
        <div class="dra-body">
          <div class="dra-content">
            <div class="content-titel">
              <span>出入记录</span>
            </div>
            <div class="">
              <el-form label-width="120px">
                <el-form-item label=""
                              style="width:100%">
                  <tableData :config="table_config"></tableData>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div class="dra-footer">
          <div class="dra-footer-content">
            <button class="dra-submit el-icon-circle-check"
                    @click="handleClose('ruleForm')"><span>关闭</span></button>
          </div>
        </div>
      </div>

    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      isVisibleDrawe: false,
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '110' },
          { label: '进入时间', prop: 'table2', width: '180' },
          { label: '出去时间', prop: 'table3', width: ' 180' },
        ],
        table_data: [
          {
            table1: '4',
            table2: '',
            table3: '2020-08-16 12:30:00',
          },
          {
            table1: '3',
            table2: '2020-08-16 12:30:00',
            table3: '',
          },
          {
            table1: '2',
            table2: '',
            table3: '2020-08-16 12:30:00',
          },
          {
            table1: '1',
            table2: '2020-08-16 12:30:00',
            table3: '',
          },
        ]
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose', "Close")
    }
  },
  drawerVrisible: {
    handler (newValue) {
      this.isVisibleDrawe = newValue
      console.log(newValue)
    },
    immediate: true
  },
}
</script>

<style scoped>
</style>
