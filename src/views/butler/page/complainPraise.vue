<style scoped>
.tips {
    margin: 20px;
    height: 38px;
    line-height: 38px;
    background: #fafafa;
    border-radius: 4px;
    opacity: 0.8;
    border: 1px solid #e8e8e8;
}
</style>
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>投诉表扬</span>
    </div>
    <div class="tips">
      <p>
        <span class="el-icon-warning-outline"
              style="margin:0 12px"></span>
        温馨提示：今日新增投诉
        <span style="color:rgba(251, 71, 2, 1)">{{countComplaintNew}}</span>
        条，表扬 <span style="color:rgba(251, 71, 2, 1)">{{countPraiseNew}}</span>条
      </p>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <VueTable ref="table"
                :config='config'
                @tableCheck="tableCheck">
        <template v-slot:score="slotData">
          <div>
            <el-rate :value="slotData.data.score/2"
                     :colors="colors"
                     disabled></el-rate>
          </div>
        </template>
        <template slot="footer">
          <div class="table-footer">
            <button @click="details(table_row)">详情</button>
            <button @click="details(table_row)">回复</button>
            <button @click="del(table_row)">删除</button>
          </div>
        </template>
      </VueTable>
    </div>
    <!-- 详情 -->
    <drawerDetails :drawerVrisible='drawer_details'
                   :suggestId='suggestId'
                   @handleClose='getClose'></drawerDetails>
  </div>
</template>

<script>
import drawerDetails from '@/views/butler/components/complainPraise/details.vue'
// adviceCountComplaintNew
import { adviceCountComplaintNew, adviceCountPraiseNew } from '@/api/butler'
export default {
    data() {
        return {
            table_row: [],
            countComplaintNew: 0,
            countPraiseNew: 0,
            colors: ['#FB4702', '#FB4702', '#FB4702'],
            suggestId: null,
            drawer_details: false,
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '内容', prop: 'content', width: '350' },
                    {
                        label: '类型',
                        prop: 'type',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.type) {
                                case 1:
                                    return '咨询'
                                    break
                                case 2:
                                    return '建议'
                                    break
                                case 3:
                                    return '投诉'
                                    break
                                case 4:
                                    return '表扬'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    { label: '发布人', prop: 'releaseName', width: 'auto' },
                    { label: '发布时间', prop: 'releaseDate', width: 'auto' },
                    {
                        label: '状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '未反馈'
                                case 2:
                                    return '反馈中'
                                    break
                                case 3:
                                    return '已反馈'
                                    break

                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '星级',
                        prop: 'score',
                        width: '180',
                        type: 'slot',
                        slotName: 'score'
                    },
                    {
                        label: '最后一次回复/提问时间',
                        prop: 'lastFeedBackDate',
                        width: '280'
                    }
                ],
                url: 'complaintPraiseList',
                table_data: [],
                search_item: [
                    {
                        type: 'startDate',
                        label: '发布开始时间',
                        placeholder: '请选择开始日期',
                        prop: 'releaseDateStart'
                    },
                    {
                        type: 'endDate',
                        label: '发布结束时间',
                        placeholder: '请选择结束时间',
                        prop: 'releaseDateEnd'
                    },
                    {
                        type: 'select',
                        label: '类型',
                        placeholder: '请选择',
                        prop: 'type',
                        options: [
                            { value: 3, label: '投诉' },
                            { value: 4, label: '表扬' }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '发布人',
                        placeholder: '请选择',
                        prop: 'releaseName'
                    },
                    {
                        type: 'select',
                        label: '状态',
                        placeholder: '请选择',
                        prop: 'status',
                        options: [
                            { value: 1, label: '未反馈' },
                            { value: 2, label: '反馈中' },
                            { value: 3, label: '已反馈' }
                        ]
                    }

                    // {
                    //   type: 'Input',
                    //   label: '评分',
                    //   placeholder: '单元/楼栋/房号',
                    //   prop: 'score',
                    // },
                ],
                data: {
                    pageNum: 1,
                    size: 10
                }
            }
        }
    },
    components: {
        drawerDetails
    },
    created() {
        this.getTipsData()
    },
    methods: {
        getTipsData() {
            //  查询今日咨询条数
            adviceCountComplaintNew().then((result) => {
                console.log(result)
                this.countComplaintNew = result.countComplaintNew
            })
            adviceCountPraiseNew().then((result) => {
                console.log(result)
                this.countPraiseNew = result.countPraiseNew
            })
            //
        },
        tableCheck(arr) {
            this.table_row = arr
        },
        details(data) {
            if (data.length) {
                if (data.length > 1) {
                    this.$message({
                        message: '只能操作单个数据',
                        type: 'error'
                    })
                    return
                }
                this.suggestId = data[0].id
                this.drawer_details = true
            } else {
                this.$message({
                    message: '请选择需要操作的数据',
                    type: 'error'
                })
            }
        },
        // 删除
        del(data) {
            if (data.length) {
                let arr = []
                for (let i = 0; i < this.table_row.length; i++) {
                    arr.push(this.table_row[i].id)
                }
                this.$confirm('是否确认删除？删除不可恢复', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    confirmButtonClass: 'confirmButton',
                    cancelButtonClass: 'cancelButton'
                })
                    .then(() => {
                        this.$refs.table.tableDelete(arr)
                    })
                    .catch((action) => {})
            } else {
                this.$message.error('请选中需要删除的数据')
            }
        },
        // 关闭抽屉
        getClose(data) {
            this.drawer_details = false
            this.suggestId = null
            this.getTipsData()
        }
    }
}
</script>
