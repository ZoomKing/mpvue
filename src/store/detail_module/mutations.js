const mutations = {
    //改变显示更多拼团的状态
    changeMorPintuan(state,data){
        state.showMorePintuanState = data
    },
    //详情页sku展示的信息
    changeShowInfo(state,data){
        state.showInfo = data;
    },
    //sku库
    changeSkuDataList(state,data){
        state.skuDataList = data;
    },
    //sku展示的规格
    changeSkuNormal(state,data){
        state.skuNormal = data;
    },
    //去参团
    changeParticipatePintuan(state,data){
        state.participatePintuan = data;
    },
    changeGroupItemId(state,data){
        state.groupItemId = data
    },
    changeDetailSkuStatus(state,data){
        state.detail_sku_status = data;
    },
    changeIsPintuan_state(state,data){
        state.isPintuan_state = data
    }
}
export default mutations;