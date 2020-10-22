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
      <span>评价管理</span>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <!-- 头部输入框 -->
        <div>
          <input-form :formItem="input_form"></input-form>
        </div>
        <div class="content-table">
          <div>
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
              <div class="shop_th box">
                商品名称：<span style="color:rgba(251, 71, 2, 1)">俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食</span>
              </div>
            </div>
            <div class="shop_row">
              <div class="shop_col">
                <div>
                  <span class="title">买家评价</span>
                </div>
                <div>
                  <p>很好吃，会继续回购的</p>
                  <div>
                    <img src="https://img1.360buyimg.com/n6/jfs/t1/135509/31/11898/171118/5f81192bE569c3f51/dc4d5e0ac7b051b7.jpg"
                         alt=""
                         style="width:100px;height:100px;" />
                  </div>
                </div>
              </div>
              <div class=""
                   style="flex:1;padding:0px 20px">
                <div class="txt">
                  <span class="title">卖家回复</span>
                  <span class="hf">您已回复</span>
                </div>
                <div>
                  <p>感谢您的支持，祝您生活愉快</p>
                </div>
              </div>
            </div>
          </div>
          <div>
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
              <div class="shop_th box">
                商品名称：<span style="color:rgba(251, 71, 2, 1)">俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食</span>
              </div>
            </div>
            <div class="shop_row">
              <div class="shop_col">
                <div>
                  <span class="title">买家评价</span>
                </div>
                <div>
                  <p>默认好评</p>
                </div>
              </div>
              <div class=""
                   style="flex:1;padding:0px 20px">
                <div class="txt">
                  <span class="title">卖家回复</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table-pagination></table-pagination>
      </div>
    </div>
    <!-- 详情 -->
    <drawerDetails :drawerVrisible="drawer_details"
                   @handleClose="getClose"></drawerDetails>
    <!-- 删除 提示弹窗-->
    <Dialog :dialogVisible="dialog_visible"
            :dialog_config="dialog_config"
            @cancel="cancel"
            @confirm="confirm">
    </Dialog>
  </div>
</template>

<script>
import drawerDetails from '@/views/butler/components/suggestConsultation/details.vue'
import Dialog from '@/components/dialog/Dialog.vue'

export default {
  data () {
    return {
      input_form: [
        {
          type: 'Input',
          label: '商品编号',
          placeholder: '请输入商品编号',
          prop: 'p1'
        },
        {
          type: 'select',
          label: '商品名称',
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
          label: '订单号',
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
          label: '用户/ID',
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
          label: '评价等级',
          placeholder: '请输入商品编号',
          prop: 'p5'
        },
        {
          type: 'select',
          label: '是否回复',
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
          label: '是否有图',
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
          label: '追评',
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
        }
      ],
      // 控制dialog显示隐藏
      dialog_visible: false,
      // 传入dialog的参数
      dialog_config: {
        title: '',
        content: ''
      },
      // drawerDetails
      drawer_details: false
    }
  },
  components: {
    drawerDetails,
    Dialog
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    // table选中行
    tableRow (data) {
      this.table_row = data
    },
    // 监听子组件取消事件
    cancel (data) {
      this.dialog_visible = false
    },
    // 监听子组件确认事件
    confirm (data) {
      this.dialog_visible = false
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    // 删除
    del (data) {
      console.log(this.table_row.table6 + '0000')
      if (JSON.stringify(data) != '{}') {
        this.dialog_config.title = '删除提示'
        if (this.table_row.table6 != '已反馈') {
          this.dialog_config.content = '该条信息，还为回复是否确认删除？'
        } else {
          this.dialog_config.content = '是否确认删除该信息？'
        }
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据')
      }
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
  height: 44px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background: #f5f5f6;
  justify-content: space-between;
}
.shop_th.box {
  width: 100%;
}
.shop_row {
  padding: 20px;
  display: flex;
}
.title {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 30px;
}
p {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 30px;
}
.txt {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.hf {
  font-size: 16px;

  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0091ff;
  line-height: 22px;
}
.shop_col {
  width: 80%;
  border-right: 1px solid #f5f5f6;
}
</style>
