<template>
  <div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <div>
          <input-form :formItem="input_form"
                      :btnWidth="btnWidth"></input-form>
        </div>
        <div style="margin-bottom:20px">
          <el-radio-group v-model="radio1"
                          size="small">
            <el-radio-button label="审核中"></el-radio-button>
            <el-radio-button label="审核通过"></el-radio-button>
            <el-radio-button label="审核不通过"></el-radio-button>
          </el-radio-group>
          <span style="margin-left:20px; color: #999999;">排队审核中，审核结果将在提交后1-2个工作日内反馈</span>
        </div>
        <tableData :config="table_config">
          <template v-slot:table1="slotData">
            <div class="img">
              <div>
                <el-image style="width: 80px; height: 80px"
                          :src="slotData.data.table1[0].url"></el-image>
              </div>
              <div>
                <span>{{ slotData.data.table1[0].span }}</span>
              </div>
            </div>
          </template>
          <template v-slot:table5="slotData">
            <div>
              <div>
                <span style="padding-right:61px">{{
                  slotData.data.table5[0].time
                }}</span>
                <span> {{ slotData.data.table5[0].status }}</span>
              </div>
            </div>
          </template>
        </tableData>
        <div class="table-footer">
          <button>详情</button>
          <button>查看驳回原因</button>
        </div>
        <table-pagination :pageSize="10"
                          :totalNumber="100"></table-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      radio1: '审核不通过',
      table_config: {
        thead: [
          {
            label: '商品信息',
            prop: 'table1',
            width: '450',
            type: 'slot',
            slotName: 'table1'
          },
          { label: '审核状态', prop: 'table2', width: '280' },
          {
            label: '发布时间',
            prop: 'table3',
            width: '180'
          },
          { label: '审核时间', prop: 'table4', width: 'auto' }
        ],
        table_data: [
          {
            table1: [
              {
                span:
                  ' 俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
                url:
                  'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2222110592,1898022873&fm=26&gp=0.jpg'
              }
            ],

            table2: '审核不通过',
            table3: '2020-08-09 12:10:22 ',
            table4: '2020-08-10 12:31:29'
          },
          {
            table1: [
              {
                span:
                  ' 俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
                url:
                  'https://img.alicdn.com/imgextra/i1/777170039/O1CN01yJFxH61C9u4gfyzTT_!!0-saturn_solar.jpg_220x220.jpg_.webp'
              }
            ],

            table2: '审核不通过',
            table3: '2020-08-09 12:10:22 ',
            table4: '2020-08-10 12:31:29'
          }
        ]
      },
      btnWidth: '30%',
      input_form: [
        {
          type: 'Input',
          label: '商品编号',
          placeholder: '请输入商品编号',
          prop: 'p1'
        },
        {
          type: 'Input',
          label: '商品名称',
          placeholder: '请输入',
          prop: 'p2'
        }
      ]
    }
  },

  computed: {},
  methods: {
    submitForm (formName) { },
    resetForm (formName) { },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>
.img {
  display: flex;
}
.img div {
  margin-right: 23px;
}
.img span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
}
</style>
