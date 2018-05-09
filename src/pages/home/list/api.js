import fly from '@/utils/request'
import $api from '@/api'
const api = {
  getPintuanList:(currentPage)=>fly.get($api+'smart/pintuan/item_list',{
    pageSize:5,
    currentPage:currentPage
  }),
  get_query:(positionId)=>fly.get($api+'smart/ads/query',{
      'positionId':positionId,
      'pageSize':10,
      'currentPage':1
  })
}

export default api
