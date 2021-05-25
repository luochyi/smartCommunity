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
//shop/refund/examine
export function shopRefundExamine(data){
    return service.request({
        method:'POST',
        url:'shop/refund/examine',
        data: data
    })
}