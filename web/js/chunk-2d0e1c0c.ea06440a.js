(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e1c0c"],{"7c7a":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"main-content"},[e._m(0),a("div",{staticClass:"content"},[a("div",{},[a("VueTable",{ref:"table",attrs:{config:e.config},on:{tableCheck:e.tableCheck}},[a("template",{slot:"tabs"},[a("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"全部",name:"0"}}),a("el-tab-pane",{attrs:{label:"未缴纳",name:"1"}}),a("el-tab-pane",{attrs:{label:"部分缴纳",name:"2"}})],1)],1),a("template",{slot:"footer"},[a("div",{staticClass:"table-footer"},[a("button",[e._v("退款")]),a("button",[e._v("缴费")]),a("button",[e._v("删除")]),a("button",[e._v("详情")])])])],2)],1)])])])},p=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main-titel"},[a("span",[e._v("工单费用")])])}],i={data:function(){return{activeName:"0",config:{thead:[{label:"序号",type:"index",width:"80"},{label:"费用名称",prop:"name",width:"180"},{label:"费用单号",prop:"dispatchListCode",width:"180"},{label:"交易号",prop:"orderCode",width:"180"},{label:"房屋信息",prop:"roomName",width:"180"},{label:"费用金额",prop:"costPrice",width:"180"},{label:"计费开始时间",prop:"beginDate",width:"180"},{label:"计费结束时间",prop:"endDate",width:"180"},{label:"计费单价/单位",prop:"unitPrice",width:"180"},{label:"面积/用量/数量",prop:"num",width:"180"},{label:"已缴金额",prop:"paidPrice",width:"180"},{label:"代收总计",prop:"paymentPrice",width:"180"},{label:"应收总计",prop:"totalPrice",width:"180"},{label:"状态",prop:"status",width:"180"},{label:"备注",prop:"remake",width:"280"},{label:"创建人",prop:"createName",width:"180"},{label:"更新时间",prop:"updateDate",width:"180"}],table_data:[],url:"workOrderCostList",search_item:[{type:"select",label:"费用项目名称",placeholder:"请选择",value:"",prop:"a",options:[{label:"水电费",value:1},{label:"车辆费",value:2}]},{type:"Input",label:"缴费人",placeholder:"请选择",prop:"b"},{type:"Input",label:"联系方式",placeholder:"请输入",prop:"c"},{type:"startDate",label:"计费时间",placeholder:"请选择开始日期",prop:"d"},{type:"endDate",label:"计费时间",placeholder:"请选择结束时间",prop:"e"},{type:"picker",label:"时间",placeholder:"楼栋/单元/房间号",prop:"sss",startDate:"sDate",endDate:"eDate",width:"280px",value:null}],data:{pageNum:1,size:10}}}},methods:{handleClick:function(e,t){var a=null;a=0!=this.activeName?this.activeName:null;var l={pageNum:1,size:10,status:a};this.$refs.table.requestData(l)},tableCheck:function(e){this.table_row=e}}},r=i,o=a("2877"),n=Object(o["a"])(r,l,p,!1,null,null,null);t["default"]=n.exports}}]);
//# sourceMappingURL=chunk-2d0e1c0c.ea06440a.js.map