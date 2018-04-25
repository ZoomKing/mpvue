import fly from '@/utils/request'
import $api from '@/api'

const api = {
    get_order_detail: (id)=>fly.get($api+'smart/orders/detail',{'orderId':id}),
    cancel_order:(orderId)=>fly.request($api+'smart/orders/cancel?orderId='+orderId,null,{method:'POST'}),
    pre_payment:(obj)=>fly.request($api+'smart/orders/pre_payment',obj,{method:'POST'}),
    order_pay:(obj)=>fly.request($api+'smart/orders/pay',obj,{method:'POST'}),
    confirm_receipt:(orderId)=>fly.request($api+'smart/orders/confirm?orderId='+orderId,null,{method:'POST'})
}

export default api
