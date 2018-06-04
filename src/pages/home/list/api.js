import fly from '@/utils/request'
import $api from '@/api'
const api = {
  getPintuanList:(groupName,currentPage)=>fly.get($api+'smart/pintuan/item_list',{
    groupName:groupName,
    pageSize:3,
    currentPage:currentPage
  }),
  get_query:(positionId)=>fly.get($api+'smart/ads/query',{
      'positionId':positionId,
      'pageSize':10,
      'currentPage':1
  }),
  getPintuanGroups:()=>fly.get($api+'smart/pintuan/groups',null)
}

export default api
