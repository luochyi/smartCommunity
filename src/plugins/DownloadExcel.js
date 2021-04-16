import JsonExcel from 'vue-json-excel'
import { GetTableData } from '@/api/basic'
export async function DownloadExcel(params, that) {
    let Excel = []
    const response = await GetTableData(params)
    Excel.push(...response.tableList)
    if (response.pageCount > 1) {
        for (let i = 1; i < response.pageCount; i++) {
            params.pageNum = i + 1
            const data = await GetTableData(params)
            that.ExcelLoading(i, response.pageCount)
            Excel.push(...data.tableList)
        }
    }
    return Excel
}
