import fly from '@/utils/request'
import $api from '@/api'
const api = {
  get_invoice_list : ()=>fly.request($api+'smart/users/invoice/list',null,{method:'GET'}),
  add_invoice : (obj)=>fly.request($api+'smart/users/invoice/edit',obj,{method:'POST'}),
}

export default api
