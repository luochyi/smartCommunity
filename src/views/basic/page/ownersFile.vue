<template>
  <div class="main-content">
    <div class="main-titel">
      <span>业主档案</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="addOwnerDrawer()"
                   icon="el-icon-plus">新增业主</el-button>
      </div>
      <VueTable ref="table"
                :config='config'
                @tableCheck="tableCheck">
        <template slot="footer">
          <div class="table-footer">
            <button @click="detailsOwnerDrawer(table_row)">详情</button>
            <button @click="reviseOwnerDrawer(table_row)">修改</button>
            <button @click="del(table_row)">删除</button>
            <!-- <button @click="linkHouseDrawer(table_row)">关联房屋</button>
            <button @click="linkParkDrawer(table_row)">关联车位</button> -->
          </div>
        </template>
      </VueTable>
    </div>
    <addOwner drawerTitle="添加业主"
              @handleClose="addOwnerClose"
              :drawerVrisible='add_vrisible'></addOwner>

    <detailsOwner drawerTitle="业主详情"
                  :owerId="owerId"
                  @handleClose="detailsOwnerClose"
                  :drawerVrisible='details_vrisible'></detailsOwner>
    <reviseOwner drawerTitle="修改业主"
                 :owerId="reviseOwerId"
                 @handleClose="reviseOwnerClose"
                 :drawerVrisible='revise_vrisible'></reviseOwner>
    <linkHouse drawerTitle="关联房屋"
               :owerId="linkHouseOwerId"
               @handleClose="linkHouseClose"
               :drawerVrisible='linkHouse_vrisible'></linkHouse>
    <linkParking drawerTitle="关联车位"
                 @handleClose="linkParkClose"
                 :owerId="linkParkOwerId"
                 :drawerVrisible='linkPark_vrisible'></linkParking>
  </div>
</template>
<script>
import addOwner from '@/views/basic/components/ownersFile/addOwner'
import detailsOwner from '@/views/basic/components/ownersFile/detailsOwner'
import reviseOwner from '@/views/basic/components/ownersFile/reviseOwner'
import linkParking from '@/views/basic/components/ownersFile/linkParking'
import linkHouse from '@/views/basic/components/ownersFile/linkHouse'
import {
    findParkingSpaceType,
    findParkingSpaceStatus,
    cpmParkingSpaceFindById
} from '@/api/basic'
export default {
    components: {
        addOwner,
        detailsOwner,
        reviseOwner,
        linkParking,
        linkHouse
    },
    data() {
        return {
            owerId: null,
            reviseOwerId: null,
            linkHouseOwerId: null,
            linkParkOwerId: null,
            // 抽屉标题
            drawerTitle: '',
            // 是否通过校验
            // 抽屉显示隐藏
            drawer_vrisible: false,
            add_vrisible: false,
            details_vrisible: false,
            revise_vrisible: false,
            linkHouse_vrisible: false,
            linkPark_vrisible: false,
            table_row: [],

            parkType: [],
            parkStatus: [],
            config: {
                // 搜索
                search_item: [
                    {
                        type: 'Input',
                        label: '业主姓名',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                    {
                        type: 'Input',
                        label: '业主手机号',
                        placeholder: '请选择',
                        prop: 'tel'
                    },
                    {
                        type: 'Input',
                        label: '业主证件号',
                        placeholder: '请输入',
                        prop: 'idNumber'
                    }
                ],
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '姓名', prop: 'name', width: 'auto' },
                    { label: '手机号', prop: 'tel', width: 'auto' },
                    {
                        label: '证件类型',
                        prop: 'idType',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            if (row.idType === 1) {
                                return '身份证'
                            } else if (row.idType === 2) {
                                return '营业执照'
                            }
                        }
                    },
                    { label: '证件号码', prop: 'idNumber', width: 'auto' }
                ],
                url: 'ownerList',
                data: {
                    pageNum: 1,
                    size: 10
                }
            }
        }
    },

    methods: {
        linkParkDrawer(data) {
            if (data.length) {
                if (data.length > 1) {
                    this.$message.error('只能选择一条数据')
                    return
                }
            } else {
                this.$message.error('请选中一条数据')
                return
            }
            this.linkParkOwerId = data[0].id
            this.linkPark_vrisible = true
        },
        linkParkClose() {
            this.linkPark_vrisible = false
        },
        linkHouseDrawer(data) {
            if (data.length) {
                if (data.length > 1) {
                    this.$message.error('只能选择一条数据')
                    return
                }
            } else {
                this.$message.error('请选中一条数据')
                return
            }
            this.linkHouseOwerId = data[0].id
            this.linkHouse_vrisible = true
        },
        linkHouseClose() {
            this.linkHouse_vrisible = false
        },
        reviseOwnerDrawer(data) {
            if (data.length) {
                if (data.length > 1) {
                    this.$message.error('只能选择一条数据')
                    return
                }
            } else {
                this.$message.error('请选中一条需修改的数据')
                return
            }
            this.reviseOwerId = data[0].id
            this.revise_vrisible = true
        },
        reviseOwnerClose() {
            this.revise_vrisible = false
        },
        detailsOwnerDrawer(data) {
            if (data.length) {
                if (data.length > 1) {
                    this.$message.error('只能选择一条数据')
                    return
                }
            } else {
                this.$message.error('请选中一条需要查看的数据')
                return
            }
            this.owerId = data[0].id
            this.details_vrisible = true
        },

        detailsOwnerClose() {
            this.details_vrisible = false
        },
        addOwnerDrawer() {
            this.add_vrisible = true
        },
        addOwnerClose() {
            this.add_vrisible = false
        },
        add() {
            this.drawer_vrisible = true
        },
        handleClose() {
            this.drawer_vrisible = false
        },
        tableCheck(arr) {
            this.table_row = arr
        },
        getData() {
            // 调用子组件的方法
            this.$refs.table.loadData()
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
        }
    }
}
</script>
<style scoped lang='scss'>
</style>
