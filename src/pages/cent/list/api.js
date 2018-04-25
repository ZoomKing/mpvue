import fly from '@/utils/request'
import $api from '@/api'
const api = {
  getCentDrawList:(id,currentPage)=>fly.get($api+'smart/draw/item_list',{
    'id':id,
    'pageSize':5,
    'currentPage':currentPage
  }),
  getCurrentDraw:()=>fly.get($api+'smart/draw/current_draw',null),
  get_query:(positionId)=>fly.get($api+'smart/ads/query',{
    'positionId':positionId,
    'pageSize':1,
    'currentPage':1
})
}

export default api
