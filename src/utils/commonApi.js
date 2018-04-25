import fly from '@/utils/request'
import $api from '@/api'

const api = {
    getSalt:()=>fly.request($api+'smart/users/salt',null,{method:'GET'}),
    getConfig:()=>fly.request($api+'smart/misc/config',null,{method:'GET'}),
    login:(obj)=>fly.request($api+'smart/users/login',obj,{method:'POST'}),
    pintuan_share_detail:(orderId)=>fly.request($api+'smart/pintuan/share_detail?orderId='+orderId,null,{method:'GET'}),
    cent_share_detail:(orderId)=>fly.request($api+'smart/draw/order_share_detail?orderId='+orderId,null,{method:'GET'})
}
export default api
