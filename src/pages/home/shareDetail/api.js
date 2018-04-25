import fly from '@/utils/request'
import $api from '@/api'
const api = {
  get_good_detail : (id)=>fly.request($api+'smart/items/detail?id='+id,null,{method:'GET'}),
  get_tuan_detail:(tuanId)=>fly.request($api+'smart/pintuan/tuan_detail?id='+tuanId,null,{method:'GET'})
}

export default api 
