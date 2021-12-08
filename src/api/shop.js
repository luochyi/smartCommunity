import service from '../utils/request'
import requestUrl from './requestUrl'

//supplierManagement供应商 shop/supplier/list
export function shopSupplierInsert(data){
    return service.request({
        method:'POST',
        url:'shop/supplier/insert',
        data: data
    })
}
//shop/goods/insert
export function shopGoodsInsert(data){
    return service.request({
        method:'POST',
        url:'shop/goods/insert',
        data: data
    })
}
export function shopSupplierList(data){
    return service.request({
        method:'GET',
        url:'shop/supplier/list',
        params: data
    })
}
//到货order/arrivalGoods
export function orderArrivalGoods(data){
    return service.request({
        method:'POST',
        url:'shop/order/arrivalGoods',
        data: data
    })
}
//分类'shop/category/list'
export function shopCategoryList(data){
    return service.request({
        method:'GET',
        url:'shop/category/list',
        params: data
    })
}
export function jcookCategoryListAll(data){
    return service.request({
        method:'GET',
        url:'jcookCategory/listAll',
        params: data
    })
}
export function jcookCategoryListByParentId(data){
    return service.request({
        method:'GET',
        url:'jcookCategory/listByParentId',
        params: data
    })
}
export function jcookCategoryShow(data){
    return service.request({
        method:'GET',
        url:'jcookCategory/show',
        params: data
    })
}
export function jcookCategoryHide(data){
    return service.request({
        method:'GET',
        url:'jcookCategory/hide',
        params: data
    })
}
//shop/category/update
export function shopCategoryUpdate(data){
    return service.request({
        method:'POST',
        url:'shop/category/update',
        data: data
    })
}
// shop/category/delete shop/category/insert
export function shopCategoryDelete(data){
    return service.request({
        method:'GET',
        url:'shop/category/delete',
        params: data
    })
}
export function shopCategoryInsert(data){
    return service.request({
        method:'POST',
        url:'shop/category/insert',
        data: data
    })
}

//商品管理 上架shop/goods/loading 下架shop/goods/unloading
export function shopGoodsLoading(data){
    return service.request({
        method:'GET',
        url:'shop/goods/loading',
        params: data
    })
}
export function shopGoodsUnloading(data){
    return service.request({
        method:'GET',
        url:'shop/goods/unloading',
        params: data
    })
}
//shop/order/deliverGoods 发货
export function shopOrderDeliverGoods(data){
    return service.request({
        method:'POST',
        url:'shop/order/deliverGoods',
        data: data
    })
}
//shop/refund/exchangeGoods
export function refundExchangeGoods(data){
    return service.request({
        method:'GET',
        url:'shop/refund/exchangeGoods',
        params:data
    })
}
//shop/refund/examine
export function shopRefundExamine(data){
    return service.request({
        method:'POST',
        url:'shop/refund/examine',
        data: data
    })
}
//商城评价回复 shop/evaluation/reply
export function shopEvaluationReply(data){
    return service.request({
        method:'POST',
        url:'shop/evaluation/reply',
        data: data
    })
}
// Jcook 商品
export function jcookGoodsOnShelf(data){
    return service.request({
        method:'POST',
        url:'jcookGoods/onShelf',
        data: data
    })
}
export function jcookGoodsOffShelf(data){
    return service.request({
        method:'POST',
        url:'jcookGoods/offShelf',
        data: data
    })
}
export function jcookGoodsFindDetailById(data){
    return service.request({
        method:'GET',
        url:'jcookGoods/findDetailById',
        params:data
    })
}
export function jcookGoodsFindGoodsDetailBigInfo(data){
    return service.request({
        method:'GET',
        url:'jcookGoods/findGoodsDetailBigInfo',
        params:data
    })
}
export function jcookGoodsUpdatePrice(data){
    return service.request({
        method:'POST',
        url:'jcookGoods/updatePrice',
        data: data
    })
}
// jcook订单
export function jcookOrderCancel(data){
    return service.request({
        method:'GET',
        url:'jcookOrder/cancel',
        params:data
    })
}
export function jcookOrderFindDetail(data){
    return service.request({
        method:'GET',
        url:'jcookOrder/findDetail',
        params:data
    })
}
export function jcookCategoryUpdateCategoryImg(data){
    return service.request({
        method:'POST',
        url:'jcookCategory/updateCategoryImg',
        data: data
    })
}
// 商城配置
export function jcookRotationFindRotationList(data){
    return service.request({
        method:'GET',
        url:'jcookRotation/findRotationList',
        params:data
    })
}
export function jcookRotationInsert(data){
    return service.request({
        method:'POST',
        url:'jcookRotation/insert',
        data: data
    })
}
export function jcookRotationUpdate(data){
    return service.request({
        method:'POST',
        url:'jcookRotation/update',
        data: data
    })
}
export function jcookRotationDelete(data){
    return service.request({
        method:'GET',
        url:'jcookRotation/delete',
        params:data
    })
}