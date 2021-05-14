import service from '../utils/request'
import requestUrl from './requestUrl'

//supplierManagement供应商
export function shopSupplierInsert(data){
    return service.request({
        method:'POST',
        url:'shop/supplier/insert',
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