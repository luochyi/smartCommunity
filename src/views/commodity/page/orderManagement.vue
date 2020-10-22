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
      <span>订单管理</span>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <!-- 头部输入框 -->
        <div>
          <input-form :formItem="input_form"
                      :btnWidth="'20%'"> </input-form>
        </div>
        <div>
          <el-button type="init-button2"
                     plain>下载查询到的订单（10）</el-button>
          <el-button type="init-button2"
                     plain>下载可发货的订单</el-button>
        </div>
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="全部"
                       name="first"></el-tab-pane>
          <el-tab-pane label="待确认"
                       name="second"></el-tab-pane>
          <el-tab-pane label="待支付"
                       name="third"></el-tab-pane>
          <el-tab-pane label="备货中"
                       name="fourth"></el-tab-pane>
          <el-tab-pane label="已发货"
                       name="tab5"></el-tab-pane>
          <el-tab-pane label="已完成"
                       name="tab6"></el-tab-pane>
          <el-tab-pane label="已关闭"
                       name="tab7"></el-tab-pane>
          <el-tab-pane label="未发货退款"
                       name="tab8"></el-tab-pane>
          <el-tab-pane label="已发货退款"
                       name="tab9"></el-tab-pane>
          <el-tab-pane label="退款中"
                       name="tab10"></el-tab-pane>
          <el-tab-pane label="24h内需发货"
                       name="tab11"></el-tab-pane>
          <el-tab-pane label="超时未发货"
                       name="tab12"></el-tab-pane>
          <el-tab-pane label="催发货"
                       name="tab13"></el-tab-pane>
        </el-tabs>
        <div class="content-table">
          <div class="shop_table">
            <div class="shop_th column1">
              <span>子订单编号</span>
            </div>
            <div class="shop_th column2">
              <span>商品</span>
            </div>
            <div class="shop_th column3">
              <span>单价</span>
            </div>
            <div class="shop_th column4">
              <span>数量</span>
            </div>
            <div class="shop_th column5">
              <span>备注</span>
            </div>
            <div class="shop_th column6">
              <span>售后</span>
            </div>
            <div class="shop_th column7">
              <span>供应商</span>
            </div>
            <div class="shop_th column8">
              <span>收货信息</span>
            </div>
            <div class="shop_th column9">
              <span>订单状态</span>
            </div>
            <div class="shop_th column10">
              <span>实收款</span>
            </div>
          </div>
          <div class="shop_table">
            <div class="shop_th"><span>主订单编号：323534520359</span></div>
            <div class="shop_th"><span>订单类型：零售订单</span></div>
            <div class="shop_th">
              <span>下单时间：2020-08-12 17:14:39</span>
            </div>
            <div class="shop_th">
              <span>支付方式：在线支付-微信支付</span>
            </div>
            <div class="shop_th">
              <span>操作： <span>联系买家</span></span>
            </div>
          </div>
          <div class="shop_row">
            <div class="shop_td column1">
              <div class="shop_cell">
                <span>23452478352</span>
                <p style="color:rgba(251, 71, 2, 1)">详情</p>
              </div>
            </div>
            <div class="shop_td column2">
              <div class="shop_cell">
                <div class="shop_imgbox">
                  <img src="https://img1.360buyimg.com/n6/jfs/t1/135509/31/11898/171118/5f81192bE569c3f51/dc4d5e0ac7b051b7.jpg"
                       alt=""
                       style="width:80px;height:80px;" />
                  <span style="color:#0091FF">俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食</span>
                </div>
              </div>
            </div>
            <div class="shop_td column3">
              <div class="shop_cell">
                <p>¥28.8</p>
                <p style="color:#666666">规格:200g</p>
              </div>
            </div>
            <div class="shop_td column4">
              <div class="shop_cell">
                <span>1</span>
              </div>
            </div>
            <div class="shop_td column5">
              <div class="shop_cell">
                <p>买家留言</p>
                <p>商家留言</p>
                <p style="color:rgba(251, 71, 2, 1)">添加</p>
              </div>
            </div>
            <div class="shop_td column6">
              <div class="shop_cell">
                <p>-</p>
              </div>
            </div>
            <div class="shop_td column7">
              <div class="shop_cell">
                <p>左家右厨</p>
              </div>
            </div>

            <div class="shop_td column8">
              <div class="shop_cell">
                <p>夏萍</p>
                <p>18923459944</p>
                <p>浙江省宁波市鄞州区宁兴城市花园A座606</p>
              </div>
            </div>
            <div class="shop_td column9">
              <div class="shop_cell">
                <p>已完成</p>
                <p style="color:rgba(251, 71, 2, 1)">物流信息</p>
              </div>
            </div>
            <div class="shop_td column10">
              <div class="shop_cell">
                <p>¥28.8</p>
              </div>
            </div>
          </div>
          <div class="shop_table">
            <div class="shop_th"><span>主订单编号：323534520359</span></div>
            <div class="shop_th"><span>订单类型：零售订单</span></div>
            <div class="shop_th">
              <span>下单时间：2020-08-12 17:14:39</span>
            </div>
            <div class="shop_th">
              <span>支付方式：在线支付-微信支付</span>
            </div>
            <div class="shop_th">
              <span>操作： <span>联系买家</span></span>
            </div>
          </div>
          <div class="shop_row">
            <div class="shop_td column1">
              <div class="shop_cell">
                <span>23452478352</span>
                <p style="color:rgba(251, 71, 2, 1)">详情</p>
              </div>
            </div>
            <div class="shop_td column2">
              <div class="shop_cell">
                <div class="shop_imgbox">
                  <img src="https://img.alicdn.com/imgextra/i2/31943424/O1CN01eGHSSD1bAEl6J1bVH_!!0-saturn_solar.jpg_220x220.jpg_.webp"
                       alt=""
                       style="width:80px;height:80px;" />
                  <span style="color:#0091FF">【三只松鼠_零食大礼包】休闲食品饼干整箱吃货情人节七夕送礼</span>
                </div>
              </div>
            </div>
            <div class="shop_td column3">
              <div class="shop_cell">
                <p>¥28.8</p>
                <p style="color:#666666">规格:200g</p>
              </div>
            </div>
            <div class="shop_td column4">
              <div class="shop_cell">
                <span>1</span>
              </div>
            </div>
            <div class="shop_td column5">
              <div class="shop_cell">
                <p>买家留言</p>
                <p>商家留言</p>
                <p style="color:rgba(251, 71, 2, 1)">添加</p>
              </div>
            </div>
            <div class="shop_td column6">
              <div class="shop_cell">
                <p>-</p>
              </div>
            </div>
            <div class="shop_td column7">
              <div class="shop_cell">
                <p>左家右厨</p>
              </div>
            </div>
            <div class="shop_td column8">
              <div class="shop_cell">
                <p>夏萍</p>
                <p>18923459944</p>
                <p>浙江省宁波市鄞州区宁兴城市花园A座606</p>
              </div>
            </div>
            <div class="shop_td column9">
              <div class="shop_cell">
                <p>已完成</p>
                <p style="color:rgba(251, 71, 2, 1)">物流信息</p>
              </div>
            </div>
            <div class="shop_td column10">
              <div class="shop_cell">
                <p>¥28.8</p>
              </div>
            </div>
          </div>

        </div>
        <table-pagination></table-pagination>
      </div>
    </div>
    <!-- 详情 -->
  </div>
</template>

<script>
import Dialog from '@/components/dialog/Dialog.vue'
export default {
  data () {
    return {
      input_form: [
        {
          type: 'Input',
          label: '订单编号',
          placeholder: '请输入商品编号',
          prop: 'p1'
        },
        {
          type: 'select',
          label: '订单状态',
          placeholder: '请选择',
          prop: 'p2',
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
          label: '售后状态',
          placeholder: '请选择',
          prop: 'p3',
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
          label: '业务类型',
          placeholder: '请选择',
          prop: 'p4',
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
          type: 'Input',
          label: '商品名称',
          placeholder: '请输入商品编号',
          prop: 'p5'
        },
        {
          type: 'select',
          label: '商品类型',
          placeholder: '请选择',
          prop: 'p6',
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
          label: '是否预售',
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
          label: '供应商',
          placeholder: '请选择',
          prop: 'p8',
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
          label: '下单时间',
          prop: 'p9',
          startPlaceholder: '请选择开始时间',
          rangeSeparator: ' ～',
          endPlaceholder: '结束时间'
        },
        {
          type: 'Input',
          label: '收货人姓名',
          placeholder: '请输入',
          prop: 'p10',
          value: ''
        },
        {
          type: 'Input',
          label: '收货人手机',
          placeholder: '请选择输入',
          prop: 'p11',
          value: '全部'
        },
        {
          type: 'select',
          label: '支付方式',
          placeholder: '请选择',
          prop: 'p12',
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
          label: '快递公司',
          placeholder: '请选择',
          prop: 'p13',
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
          type: 'Input',
          label: '快递单号',
          placeholder: '请选择输入',
          prop: 'p14',
          value: ''
        }
      ],
      // 控制dialog显示隐藏

      // 传入dialog的参数
      dialog_config: {
        title: '',
        content: ''
      },
      activeName: 'first',
      // drawerDetails

      table_config: {
        thead: [
          { label: '拼团ID', prop: 'table1', width: '120' },
          { label: '商品ID', prop: 'table2', width: '120' },
          { label: '商品名称', prop: 'table3', width: '580' },
          { label: '状态 ', prop: 'table4', width: '180' },
          { label: '已买/总需', prop: 'table5', width: '120' },
          { label: '开团时间', prop: 'table6', width: '180' },
          { label: '到期时间', prop: 'table7', width: '180' }
        ]
      }
    }
  },

  methods: {
    handleClick (row) {
      console.log(row)
    },
    // table选中行
    tableRow (data) {
      this.table_row = data
    },

    // 关闭抽屉
    getClose (data) {
      this.drawer_details = false
    }
  }
}
</script>
<style scoped>
.shop_table {
  margin-top: 20px;
  height: 44px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  align-items: center;
  background: #f5f5f6;
  justify-content: space-between;
}
.shop_row {
  display: flex;
  justify-content: space-between;
}
.shop_td {
  padding: 12px 0;
}
.shop_cell {
  padding: 0 10px;
}
.shop_imgbox {
  display: flex;
}
.shop_imgbox img {
  margin-right: 10px;
}
.column1,
.column3,
.column4,
.column5,
.column6,
.column7,
.column9 {
  width: 100px;
}
.column8 {
  width: 140px;
}
.column2 {
  width: 220px;
}
.shop_td {
  line-height: 20px;
}
/* .column* {
  [abc^="def"] 选择dao abc 属性值以 "def" 开头的所zhi有元dao素版
} */
</style>
