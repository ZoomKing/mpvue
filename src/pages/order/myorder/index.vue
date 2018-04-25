<template lang="pug">
.myorder
    myorderUl(@ListenFromChild='tabChange',:dataInfo='tabArr',:tabState='state.tab',:isCurrentPage='isCurrentPage')
    .orderList(v-if='!isOrderListNull')
        orderItem(v-for='(item,index) in order.orderList',:key='index',:dataInfo='item')
    .orderListNull(v-else)
        img(src='/static/assets/order_nothing_110.png')
        text {{'没有订单哦~'}}
</template>

<script>
import { mapState,mapMutations,actions} from 'vuex';
import myorderUl from './components/myorder-ul'
import orderItem from './components/order-item'
import isLogin from '@/utils/isLogin'
import commonApi from '@/utils/commonApi'
import global from '@/global'
import api from './api'
export default {
  data(){
    return {
      tabArr:[
        {
          'title':'全部',
          'index':1
        },
        {
          'title':'待付款',
          'index':2
        },
        {
          'title':'待分享',
          'index':5
        },
        {
          'title':'待发货',
          'index':3
        },
        {
          'title':'待收货',
          'index':4
        }
        // '全部','待付款','待分享','待发货','待收货'
      ],
      state:{
        'tab':1,
        'currentPage':1,
        'pageSize':5
      },
      isCurrentPage:1,
      // orderList:[],
      pageCount:1,
      isOrderListNull:false
    }
  },
  computed: {
    ...mapState(['order'])
  },
  onLoad(){
  },
  onShow(){
    //禁止分享
    wx.hideShareMenu()
    this.state = {
        'tab':global.myorder_state_tab,
        'currentPage':1,
        'pageSize':5
      };
    this.changeOrderList([]);
    this.getOrderList(this.state);
  },
  methods:{
    ...mapMutations(['changeOrderList']),
      tabChange(index){
        this.state.tab = index;
        this.state= {
          'tab':index,
          'currentPage':1,
          'pageSize':5
        };
        this.isCurrentPage = 1;
        // this.orderList = [];
        this.changeOrderList([])
        this.getOrderList(this.state);
      },
      async getOrderList(obj){
        const res = await api.get_order_list(obj);
        let wip = this.order.orderList;
        wip.push(...res.value.values);
        this.changeOrderList(wip)
        this.pageCount = res.value.pageCount;
        this.state.currentPage++;
        this.isCurrentPage = this.state.currentPage;
        // console.log(this.order.orderList.length);
        if(this.order.orderList.length==0){
            this.isOrderListNull = true;
        }else{
          this.isOrderListNull = false;
        }
      },
      // async getShareInfo(orderType,orderId){
      //   if(orderType == 4){
      //       const res = await commonApi.pintuan_share_detail(orderId);
      //       //  console.log(res)
      //       return res;
           
      //   }else if(orderType ==5){
      //       const res = await commonApi.cent_share_detail(orderId);
      //       return res;
      //   }
      // }
  },
  mounted () {
    
  },
  onHide(){
     global.myorder_state_tab = this.state.tab;
  },
  // onShareAppMessage(res){
     
  //   if(res.from === 'button'){
  //     let title,url,imageUrl;
  //     let orderId = res.target.dataset.orderid;
  //     let orderType = res.target.dataset.ordertype;
  //     // let a = this.getShareInfo(orderType,orderId);
  //    let data = this.getShareInfo(orderType,orderId);
  //       console.log(data)
  //       title  = data.value.shareInfo.shareTitle;
  //       url = data.value.shareInfo.smartUrl;
  //       imageUrl = data.value.shareInfo.shareIcon+'@!800';
  //       // console.log(new Date().getTime())
  //       return {
  //           title: title,
  //           path:url,
  //           imageUrl:imageUrl,
  //           success: (res)=> {
  //               // 转发成功;
  //              wx.showToast({
  //                   title: '分享成功',
  //                   icon: 'none'
  //               })
  //           },
  //           fail: function(res) {
  //               // 转发失败
  //              wx.showToast({
  //                   title: '分享失败',
  //                   icon: 'none'
  //               })
  //           }
  //       } ;
  //     // })
  //     // console.log(a)
  //     // return a;
      
  //   }
      
  // },
  onReachBottom () {
    if(this.state.currentPage==this.isCurrentPage && this.state.currentPage<=this.pageCount){
      this.getOrderList(this.state);
    }
  },
  components:{
    myorderUl,orderItem
  }
}
</script>

<style lang="less">
@import url("~@/styles/init");
.orderListNull{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 375px;
  font-size: 12px;
  img{
    width: 100px;
    height: 100px;
  }
}
</style>
