const mutations = {
   changePreOorderParameter(state,data){
        state.pre_order_parameter = data;
   },
   changeShowAddress(state,data){
        state.showAddress = data
   },
   changeImportAddressState(state,data){
        state.importAddressState = data
   },
   changeInvoice(state,data){
        state.invoiceInfo = data
   },
   //参团创建订单需要的tuanid
   changeCreatePintuanId(state,data){
        state.create_pintuanId = data;
   },
   //改变付款成功后的回调信息
   changePaySuccessInfo(state,data){
        state.paySuccessInfo = data
   }
}
export default mutations;