<template>
  <div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addEvent = true"
                   icon="el-icon-plus">添加费用</el-button>
        <el-button type="init-button2"
                   icon="el-icon-folder-add"
                   plain>导出全部</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <div>
          <input-form :formItem="input_form"></input-form>
        </div>

        <div style="margin-bottom:20px">
          <el-radio-group v-model="radio1"
                          size="small">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="售卖中"></el-radio-button>
            <el-radio-button label="已下架"></el-radio-button>
            <el-radio-button label="封禁中"></el-radio-button>
          </el-radio-group>
        </div>
        <tableData :config="table_config">
          <!-- slot="test" slot-scope=“data” -->
          <!-- v-slot:status="slotData" -->
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
          <button>预览</button>
          <button>商品链接</button>
          <button>编辑</button>
          <button>下架</button>
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
      radio1: '全部',

      table_config: {
        thead: [
          {
            label: '商品信息',
            prop: 'table1',
            width: '450',
            type: 'slot',
            slotName: 'table1'
          },
          { label: '售价（元）', prop: 'table2', width: '280' },
          {
            label: '总库存',
            prop: 'table3',
            width: '180'
          },
          { label: '销量', prop: 'table4', width: '180' },
          {
            label: '创建时间',
            prop: 'table5',
            width: '450',
            type: 'slot',
            slotName: 'table5'
          }
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

            table2: '¥28.8',
            table3: '1000 ',
            table4: '24',
            table5: [
              {
                time: '2020-08-20 09:00',
                status: '售卖中'
              }
            ]
          },
          {
            table1: [
              {
                span:
                  ' 【超定制】三只松鼠 零食坚果大礼包1490g中秋节礼盒送礼9袋装',
                url:
                  'https://img.alicdn.com/imgextra/i1/777170039/O1CN01yJFxH61C9u4gfyzTT_!!0-saturn_solar.jpg_220x220.jpg_.webp'
              }
            ],

            table2: '¥128.8',
            table3: '1000 ',
            table4: '24',
            table5: [
              {
                time: '2020-05-22 12:00',
                status: '售卖中'
              }
            ]
          }
        ]
      },
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
        },
        {
          type: 'select',
          label: '商品类型',
          placeholder: '请选择',
          prop: 'p4',
          value: '全部',
          options: [
            {
              label: '全部',
              value: '1'
            },
            {
              label: '上衣',
              value: '2'
            },
            {
              label: '裙子',
              value: '3'
            },
            {
              label: '袜子',
              value: '4'
            }
          ]
        },
        {
          type: 'select',
          label: '是否预售',
          placeholder: '请选择',
          prop: 'p5',
          value: '全部',
          options: [
            {
              label: '全部',
              value: '1'
            },
            {
              label: '是',
              value: '2'
            },
            {
              label: '否',
              value: '3'
            }
          ]
        },
        {
          type: 'startEndDate',
          label: '是否预售',
          prop: 'p6',
          startPlaceholder: '请选择开始时间',
          rangeSeparator: ' ～',
          endPlaceholder: '结束时间'
        },
        {
          type: 'select',
          label: '商品类目',
          placeholder: '请选择',
          prop: 'p7',
          value: '全部',
          options: [
            {
              label: '全部',
              value: '1'
            },
            {
              label: '是',
              value: '2'
            },
            {
              label: '否',
              value: '3'
            }
          ]
        },
        {
          type: 'select',
          label: '商品状态',
          placeholder: '请选择',
          prop: 'p8',
          value: '全部',
          options: [
            {
              label: '全部',
              value: '1'
            },
            {
              label: '上衣',
              value: '2'
            },
            {
              label: '裙子',
              value: '3'
            },
            {
              label: '袜子',
              value: '4'
            }
          ]
        },
        {
          type: 'select',
          label: '支付方式',
          placeholder: '请选择',
          prop: 'p9',
          value: '全部',
          options: [
            {
              label: '全部',
              value: '1'
            },
            {
              label: '上衣',
              value: '2'
            },
            {
              label: '裙子',
              value: '3'
            },
            {
              label: '袜子',
              value: '4'
            }
          ]
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
