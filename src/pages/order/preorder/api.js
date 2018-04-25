import fly from '@/utils/request'
import $api from '@/api'
const api = {
  get_pre_order : (obj)=>fly.request($api+'smart/orders/pre_order',obj,{method:'POST'}),
  get_address_list:()=>fly.request($api+'smart/users/address/list',null,{method:"GET"}),
  create_order:(obj)=>fly.request($api+'smart/orders/create',obj,{method:'POST'}),
  pre_payment:(obj)=>fly.request($api+'smart/orders/pre_payment',obj,{method:'POST'}),
  order_pay:(obj)=>fly.request($api+'smart/orders/pay',obj,{method:'POST'}),
  pay_result:(obj)=>fly.request($api+'smart/orders/pay_result',obj,{method:'GET'}),
  add_new_address:(obj)=>fly.request($api+'smart/users/address/edit',obj,{method:"POST"})
}

export default api
