import service from '../utils/request'
import requestUrl from './requestUrl'
// 查询所有的物业收费标准模版
export function chargesTemplateList(data) {
  return service.request({
      method: 'GET',
      url: '/chargesTemplate/list',
      params: data
  })
}