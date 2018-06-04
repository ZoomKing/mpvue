import fly from '@/utils/request'
import $api from '@/api'
const api = {
  get_address_list:()=>fly.request($api+'smart/users/address/list',null,{method:"GET"}),
  add_new_address:(obj)=>fly.request($api+'smart/users/address/edit',obj,{method:"POST"})
}

export default api
