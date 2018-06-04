global = extend({
    requestHeaderInfo:{
        version:'v1',
        deviceID:'',
        salt:'',
        sign:'',
        token:'',
    },
    code:'',
    skuDataList:[],
    smartId:'',
    loginBackUrl:'',
    imgUrlPrefix:'',
    tuanId : 0,
    payId : 0,
    serviceTel:'022-85190438',
    //我的订单列表state.tab的值
    myorder_state_tab:1,
    reFreshSmartCount:5,
    centDrawOnline:false
},global)


function extend(destination, source) {
    for (var property in source)
        destination[property] = source[property];
    return destination;
}

export default global;
