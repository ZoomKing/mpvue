import fly from '@/utils/request'
import $api from '@/api'
const api = {
  get_order_list : (obj)=>fly.request($api+'smart/orders/list',obj,{method:'GET'}),
  // get_pay_id:(obj)=>fly.request($api+'smart/orders/pay_result',obj,{method:'GET'})
}

export default api 
