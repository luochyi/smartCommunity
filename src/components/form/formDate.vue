<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    highlight-current-row
    :header-cell-style="{ background: '#F5F5F6', color: '#999999' }"
  >
    <el-table-column type="expand">
      <template>
        <div class="shop_table_box" style="margin-left:32px">
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
          <tableData :config="table_config" @clickrow="tableRow"></tableData>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="商品 ID" prop="id"> </el-table-column>
    <el-table-column label="商品名称" prop="name"> </el-table-column>
    <el-table-column label="描述" prop="desc"> </el-table-column>
  </el-table>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.shop_table {
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  background: #f5f5f6;
  justify-content: space-around;
}
</style>

<script>
export default {
  data() {
    return {
      table_config: {
        thead: [
          { label: '拼团ID', prop: 'table1', width: 'auto' },
          { label: '商品ID', prop: 'table2', width: 'auto' },
          { label: '商品名称', prop: 'table3', width: 'auto' },
          { label: '状态 ', prop: 'table4', width: 'auto' }
        ],
        table_data: [
          {
            table1: '20200001',
            table2: '3187873204',
            table3:
              '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
            table4: '拼团成功-已发货 ',
            table5: '100/100',
            table6: '2020-08-20 09:00',
            table7: '2020-10-19 09:00'
          },
          {
            table1: '20200001',
            table2: '3187873204',
            table3:
              '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
            table4: '拼团成功-已发货 ',
            table5: '100/100',
            table6: '2020-08-20 09:00',
            table7: '2020-10-19 09:00'
          },
          {
            table1: '20200001',
            table2: '3187873204',
            table3:
              '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
            table4: '拼团成功-已发货 ',
            table5: '100/100',
            table6: '2020-08-20 09:00',
            table7: '2020-10-19 09:00'
          },
          {
            table1: '20200001',
            table2: '3187873204',
            table3:
              '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
            table4: '拼团成功-已发货 ',
            table5: '100/100',
            table6: '2020-08-20 09:00',
            table7: '2020-10-19 09:00'
          },
          {
            table1: '20200001',
            table2: '3187873204',
            table3:
              '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
            table4: '拼团成功-已发货 ',
            table5: '100/100',
            table6: '2020-08-20 09:00',
            table7: '2020-10-19 09:00'
          }
        ]
      },
      table_data: [
        {
          table1: '20200001',
          table2: '3187873204',
          table3:
            '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
          table4: '拼团成功-已发货 ',
          table5: '100/100',
          table6: '2020-08-20 09:00',
          table7: '2020-10-19 09:00'
        },
        {
          table1: '20200001',
          table2: '3187873204',
          table3:
            '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
          table4: '拼团成功-已发货 ',
          table5: '100/100',
          table6: '2020-08-20 09:00',
          table7: '2020-10-19 09:00'
        },
        {
          table1: '20200001',
          table2: '3187873204',
          table3:
            '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
          table4: '拼团成功-已发货 ',
          table5: '100/100',
          table6: '2020-08-20 09:00',
          table7: '2020-10-19 09:00'
        },
        {
          table1: '20200001',
          table2: '3187873204',
          table3:
            '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
          table4: '拼团成功-已发货 ',
          table5: '100/100',
          table6: '2020-08-20 09:00',
          table7: '2020-10-19 09:00'
        },
        {
          table1: '20200001',
          table2: '3187873204',
          table3:
            '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
          table4: '拼团成功-已发货 ',
          table5: '100/100',
          table6: '2020-08-20 09:00',
          table7: '2020-10-19 09:00'
        }
      ],
      tableData: [
        {
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        },
        {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }
      ]
    }
  }
}
</script>
