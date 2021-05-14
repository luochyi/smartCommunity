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