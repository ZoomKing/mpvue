<template lang="pug">
.container
  //- 顶部banner图
  //- normal 下单情况
  view(v-if='!can_tuan_id&&baseDetailInfo')
      .detailbox
        swiper.slider-wrap(autoplay, indicator-dots, circular)
          swiper-item(v-for="(slide,index) of baseDetailInfo.picInfo.picList",:key="index")
              img.slider-img(:src="slide+'@!1200'", mode="aspectFill")
        //- 专场名和倒计时信息
        //- detailboxBottom(v-if='baseDetailInfo.sessionInfo',:dataInfo='baseDetailInfo.basicInfo')
      //- 商品展示的一些信息
      dataInfo(v-if='baseDetailInfo.basicInfo',:servicePromiseList='baseDetailInfo.servicePromiseList',:basicInfo='baseDetailInfo.basicInfo',:sessionInfo='baseDetailInfo.sessionInfo',:pintuanInfo='baseDetailInfo.pintuanInfo')
      //- 拼团列表
      pintuanContainer(v-if='showPintuanStatus==1',:dataInfo='pintuan_list')
      pintuanNullUser(v-else-if='showPintuanStatus==2')
      //- 商品规则
      rule(:dataInfo='ruleText',v-if='ruleText')
      //- 商品详情图片
      goodsDetail(:dataInfo='baseDetailInfo.detailInfo')
      //-  priceDescription
      img(class='priceDescription',mode='widthFix',v-if='baseDetailInfo.basicInfo' :src="baseDetailInfo.basicInfo.priceDescription+'@!1200'")
  //- 分享进来情况
  view.share_detail(v-else-if='baseDetailInfo')
    .detail(@click='backToNormalGoods')
        img(:src="baseDetailInfo.picInfo.picList[0]+'@!400'")
        view.detail_right
            view
                view {{baseDetailInfo.basicInfo.title}}
                text(v-if='baseDetailInfo.basicInfo.itemType==4') {{'已拼'+num+'件'}}
            view
                view.detail_price
                    view {{'¥'+pintuanPriceCentShow}}
                    view {{'¥'+originalPriceCent}}
                //- view.goToPintuan {{'去拼团'}}
    .pintuan_info(v-if='tuan_detail')
        view(v-if='tuan_detail.leftQuota>0')
            text {{'还差'}}
            text {{tuan_detail.leftQuota}}
            text {{'人拼团成功'}}
        view(v-else-if='tuan_detail.leftQuota>=0')
          text {{'已拼团成功啦'}}
        view.pintuan_users_list
            view.existing(v-for='(item,index) in tuan_detail.members',:key='index')
                img(:src="item.avatar?(item.avatar+'@!400'):'/static/assets/usercenter_avatar_default_active@3x.png'")
                //- img(src='https://img-daily.pinkumall.com/a8f163c6_825d_4c39_b702_f1815ad11400.jpeg@!400')
                view(v-if='item.role==1') {{'团长'}}
            view(v-for='(item,index) in tuan_detail.leftQuota',:key='index') {{'?'}}
 
  //- 底部
  .detailFooter(v-if='baseDetailInfo&&baseDetailInfo.pintuanInfo&&!can_tuan_id')
    view.singleBuy(@click='statusInfo.canBuy&&callSku("singleBuy")',:class="{invilid:cantClick}")
      text {{'¥'+normalPriceCent}}
      text {{'单独购买'}}
    view.pintuanBuy(@click='statusInfo.canBuy&&callSku("pintuanBuy")',:class="{invilid:cantClick}")
      text {{'¥'+pintuanPriceCentShow}}
      text {{'发起拼团'}}
  .detailFooter(v-else-if='baseDetailInfo&&baseDetailInfo.centDrawInfo&&!can_tuan_id')
    view.centDraw(@click='statusInfo.canBuy&&callSku("centDraw")',:class="{invilid:cantClick}")
      //- text {{'¥0.01 一分抽'}}
      text {{btnContent}}
  .detailFooter(v-if='can_tuan_id&&!isTuanFull',)
    view.invalid(v-if='Invalid',@click='backToHome')
      text {{'该团已失效点击回到首页'}}
    view.centDraw(@click='statusInfo.canBuy&&callSku("pintuanBuy","can")',v-else-if='orderType==4',:class="{invilid:cantClick}")
      //- text {{'我要参团'}}
      text {{btnContent}}
    view.centDraw(@click='statusInfo.canBuy&&callSku("centDraw","can")',v-else-if='orderType==5',:class="{invilid:cantClick}")
      //- text {{'我要参团'}}
      text {{btnContent}}
  .detailFooter(v-if='isTuanFull',)
    view.fullTuan(@click='backToNormalGoods')
      text {{'团已满请重新开团'}}
  //- 参与Ta的拼团false
  participatePintuan(v-if='detail.participatePintuan',:type='type',@listenFromChild='listenFromChild',)
  //- 更多拼团列表
  morePintuan(v-if='detail.showMorePintuanState',:dataInfo='pintuan_list')
  //- 呼起SKU
  detailSku(v-if='detail.detail_sku_status',:isPintuan='detail.isPintuan_state',:skuListDate='skuListDate',:orderType='orderType')

  //- 回到首页
  view.backToHome(@click.stop='backToHome')
    img(src='/static/assets/Bottom_label_icon_home_onclick_@3x.png')
    text {{'首页'}}
</template>

<script>
import { mapState,mapMutations,actions} from 'vuex';
import api from './api'
import dataInfo from './components/detail-info'
import pintuanContainer from './components/pintuan-container'
import pintuanNullUser from './components/pintuan-null-user'
import goodsDetail from './components/goods-detail'
import participatePintuan from './components/participate-pintuan'
import morePintuan from './components/more-pintuan'
import detailSku from './components/detail-sku'
import detailboxBottom from './components/detail-session'
import rule from './components/rule'
import global from '@/global'
export default {
  components: {
    dataInfo,pintuanContainer,goodsDetail,participatePintuan,morePintuan,detailSku,detailboxBottom,rule,pintuanNullUser
  },
  data () {
    return {
        // status:{
        //   // detailSku:false,
        //   // isPintuan:true
        // },
        baseDetailInfo:null,
        skuListDate:{
          itemTitle:'',
          mainPic:'',
          // normal 为sku展示的列表
          // normal:{},
          // // skuData 为整个sku库
          // skuData:{},
          // //展示的信息，默认为返回结果的第一个
          // showInfo:{}
        },
        pintuan_list:{},
        // 分享内容
        shareInfo:{},
        orderType:1,
        showPintuanStatus:false,
        //参与拼团的类型
        type:1,
        // pintuanPriceCent:0.01,
        // salePriceCent:0.01,
        // 分享进来的时候多出一个can_tuan_id和其他字段
        can_tuan_id:null,
        num:0,
        pintuanPriceCentShow:0,
        originalPriceCent:0,
        tuan_detail:null,
        // 团是否满了
        isTuanFull:false,
        itemType:1,
        Invalid: false,
        ruleText:null,
        //正常商品价格
        normalPriceCent:0.01,
        // 商品状态
        statusInfo:{
           addToCart:true,
           canBuy:true
        }
    }
  },
  computed: {
      ...mapState(["detail"]),
      imgUrlPrefix(){
          return global.imgUrlPrefix
      },
      cantClick(){
          if(this.statusInfo.canBuy){
              return false
          }else{
              return true
          }
      },
      btnContent(){
          if(this.statusInfo.code == -2){
              return '已下架'
          }else if(this.statusInfo.code == -3){
              return '已抢光'
          }else if(this.orderType == 4){
              return '我要参团'
          }else if(this.orderType ==5){
              return '¥0.01 一分抽'
          }
      }
  },
  created(){
    
  },
  onShow(){
    // console.log(this.$root.$mp.query)
   
    // 每次进入详情页清除之前的sku列表数据
    this.changeSkuDataList([]);
    this.changeSkuNormal({})
    this.changeDetailSkuStatus(false);
    this.changeMorPintuan(false);

    this.baseDetailInfo = null;
    // wx.redirectTo   '/pages/home/detail'  时候data的数据已经修改数据并不会初始化，需要的初始化的需要在onShow里面操作
    this.isTuanFull = false;
    //清除团信息
    this.tuan_detail = null;
    this.ruleText = null;
    // showPintuanStatus 由于存在一分抽，故目前分为3种状态。1 存在拼团信息，展示拼团列表，2 拼团，暂无人员拼团 3 一分抽，什么都不显示
    this.showPintuanStatus = 3;
    // this.$root.$mp.query.id = 140;
    // this.$root.$mp.query.tuan_id = 135;
    this.can_tuan_id = this.$root.$mp.query.tuan_id;
    this.getGoodsDetail(this.$root.$mp.query.id);
    // this.getSkuList({'itemId':this.$root.$mp.query.id,'channel':0});
  },
  mounted () {
    console.log(this.detail)
  },
  onUnload () {
  },
  destroyed(){
   
  },
  methods: {
    ...mapMutations([  
        'changeShowInfo','changeSkuDataList','changeSkuNormal','changeDetailSkuStatus','changeIsPintuan_state','changeCreatePintuanId','changeCreatePintuanId','changeMorPintuan'
    ]),
    callSku(str,can){
      // wx.showLoading({
      //   title: '加载中',
      // })
      this.changeDetailSkuStatus(true)
      this.changeIsPintuan_state(str);
      this.changeCreatePintuanId(null);
      if(str =='pintuanBuy'){
        this.getSkuList({'itemId':this.$root.$mp.query.id,'channel':1});
        this.orderType = 4;
      }else if(str == 'singleBuy'){
        this.getSkuList({'itemId':this.$root.$mp.query.id,'channel':0});
        this.orderType = 1;
      }else if(str == 'centDraw'){
       this.getSkuList({'itemId':this.$root.$mp.query.id,'channel':1});
        this.orderType = 5;
      }
      if(can){
         this.changeCreatePintuanId(this.can_tuan_id)
      }
    },
    backToHome(){
        wx.reLaunch({
           url: '/pages/home/list'
        })
    },
    backToNormalGoods(){
        wx.redirectTo({
           url: '/pages/home/detail?id='+this.$root.$mp.query.id,
        })
    },
    listenFromChild(msg){
      this.getSkuList({'itemId':this.$root.$mp.query.id,'channel':1});
      this.orderType = 4;
    },
    async getGoodsDetail(id){
      
      const goodsDetail = await api.getGoodsDetail(id);
      this.baseDetailInfo = goodsDetail.value;
      
      //  console.log(this.baseDetailInfo);
      if(goodsDetail.value){
        this.normalPriceCent = parseFloat(goodsDetail.value.basicInfo.salePriceCent/100).toFixed(2);
        //获取分享信息
        this.shareInfo = goodsDetail.value.shareInfo;
        // 判断当前商品的状态  addToCart canBuy
        this.statusInfo = goodsDetail.value.statusInfo;
        //判断是分期购商品还是一分购商品 4为分期购商品，5为一分抽商品
        if(this.baseDetailInfo.basicInfo.itemType == 4){
          this.itemType = 4;
           this.type = 4;
          this.orderType = 4;
          this.getPintuanList(this.$root.$mp.query.id);
          //若是带tuanid进来，获取团详情
          if(this.$root.$mp.query.tuan_id){
            this.getTuanDetail(this.$root.$mp.query.tuan_id);
          }
          this.num = this.baseDetailInfo.pintuanInfo.soldNum;
          this.pintuanPriceCentShow = parseFloat(this.baseDetailInfo.pintuanInfo.pintuanPriceCent/100).toFixed(2);
          this.originalPriceCent  = parseFloat(this.baseDetailInfo.basicInfo.originalPriceCent/100).toFixed(2);
          if(!this.baseDetailInfo.pintuanInfo){
            this.Invalid = true;
          }
        }else if(this.baseDetailInfo.basicInfo.itemType==5){
          this.itemType = 5;
          this.type = 5;
          this.orderType = 5;
          //若是带tuanid进来，获取团详情
          if(this.$root.$mp.query.tuan_id){
              this.getCentDetail(this.$root.$mp.query.tuan_id);
          }
          this.ruleText = this.baseDetailInfo.centDrawInfo?this.baseDetailInfo.centDrawInfo.rule:'';
          this.num = this.baseDetailInfo.centDrawInfo?this.baseDetailInfo.centDrawInfo.pinQuota:'0';
          this.pintuanPriceCentShow  = '0.01';
          this.originalPriceCent  = parseFloat(this.baseDetailInfo.basicInfo.originalPriceCent/100).toFixed(2);
          if(!this.baseDetailInfo.centDrawInfo){
              this.Invalid = true;
          }
      }
      }

    },
    async getSkuList(itemId){
       //清除skulist缓存
      try {
          wx.setStorageSync('skuDataList', [])
      } catch (e) {    
      }
      const wipSkuListDate =await api.getSkuList(itemId);
      // wx.hideLoading();
      // console.log(wipSkuListDate.value);
      //这里声明一下数据格式
      // skuListData:{
      //   itemTitle:'',
      //   mainPic:'',
      // }
      //遍历取出所有的规格
      this.skuListDate.itemTitle = wipSkuListDate.value.itemTitle;
      this.skuListDate.mainPic   = wipSkuListDate.value.mainPic;
      //注意，这里所有的skuData若是存放到vuex里面会存在高度耦合，每当detail-sku-item组件修改attrbutelist的时候,会直接把skudataList里面的数据给替换掉(尝试采用global去处理，因为vuex的原理也是global，结局是一样的，故这里采用缓存的方式去处理)
      wx.setStorage({
        key:"skuDataList",
        data:wipSkuListDate.value.skuList
      })
      // console.log(this.detail.skuDataList)
      this.changeShowInfo(wipSkuListDate.value.skuList[0])
      let arr = [];
      wipSkuListDate.value.skuList.forEach((item,index)=>{
          item.attributeList.forEach((attributeList_item,v)=>{
            // console.log(arr.indexOf(attributeList_item.name))
             if(arr.indexOf(attributeList_item.name)==-1){
               arr.push(attributeList_item.name)
             }
          })
      })
      // console.log(this.skuListDate);
      arr.forEach((item,index)=>{
        this.detail.skuNormal[item]= [];
      })
      // console.log(this.skuListDate)
      //查出skuNormal的数据
      wipSkuListDate.value.skuList.forEach((item,index)=>{
          item.attributeList.forEach((attributeList_item,v)=>{
              //skuNormal数据，找出对应name，放入对应value
             for(let key in this.detail.skuNormal){
              //找到name一致的，放到对应的数组，并去重
               if(key==attributeList_item.name&&this.detail.skuNormal[key].indexOf(attributeList_item.value)==-1){
                  this.detail.skuNormal[key].push(attributeList_item.value)
               }
             }
          })
      })
      // console.log(this.skuListDate)
      // console.log(this.detail)
    },
    async getPintuanList(itemId){
      const wip_pintuan_list = await api.getPintuanList(itemId);
      // console.log(wip_pintuan_list)
      this.showPintuanStatus = wip_pintuan_list.value.values.length <=0 ? 2 : 1 ;
      this.pintuan_list = wip_pintuan_list.value;
    },
    async getTuanDetail(id){
      const wipData = await api.get_tuan_detail(id);
      // console.log(wipData);
      this.tuan_detail = wipData.value;
      if(wipData.value.leftQuota==0){
        this.isTuanFull = true;
      }
    },
    async getCentDetail(id){
      const wipData = await api.get_cent_detail(id);
      // console.log(wipData);
      this.tuan_detail = wipData.value;
      if(wipData.value.leftQuota==0){
        this.isTuanFull = true;
      }
    },
  },
  onShareAppMessage(res){
    // console.log(this.shareInfo);
    let path;
    if(this.$root.$mp.query.tuan_id){
      path = '/pages/home/detail?id='+this.$root.$mp.query.id+'&tuan_id='+this.$root.$mp.query.tuan_id
    }else {
      path = '/pages/home/detail?id='+this.$root.$mp.query.id
    }
    return {
      title:this.shareInfo.title,
      imageUrl:global.imgUrlPrefix+this.shareInfo.picUrl+'@!800',
      path: path
    }
  },
  destroyed () {
     
  }
}
</script>

<style lang="less" scoped>
@import url('~@/styles/init');
.detailbox{
  position: relative;
}
.slider-wrap {
  width: 375px;
  height: 375px;
    img{
      width: 375px;
      height: 375px;
      object-fit: cover;
    }
}
.priceDescription{
  width: 100%;
  padding-bottom: 49px;
}
.detailFooter{
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  text-align: center;
  >view{
    display: flex;
    flex-direction: column;
    color: white;
    flex:1;
    height: 49px;
    box-sizing: border-box;
    padding: 5px;
    text:nth-child(1){
      font-size: 18px;
      line-height: 20px;
      font-weight: bold;
    }
    text:nth-child(2){
      font-size: 12px;
    }
  }
  .singleBuy{
    background: @normalFontColor;
  }
  .pintuanBuy{
    background: @bgColor;
  }
  .invilid{
      background: #666 !important;
  }
  .centDraw{
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: @bgColor;
  }
  .invalid{
    line-height: 49px;
    background: orange;
  }
  .fullTuan{
    line-height: 49px;
    background: @normalFontColor;
  }
}
.share_detail{
  width:100%;
    .detail{
        width: 100%;
        height: 160px;
        margin:  0 auto;
        display: flex;
        box-sizing: border-box;
        padding: 5px 20px;
        border-bottom: 10px solid #f7f8fa;
        >img{
            width: 140px;
            height: 140px;
            object-fit: cover;
        }
        .detail_right{
            flex:1;
            font-size: 14px;
            padding-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            >view:nth-child(1){
                >view{
                    height: 40px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                >text{
                    color: @bgColor;
                    font-size: 12px;
                    line-height: 40px;
                }
            }
            >view:nth-child(2){
                margin-top: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .detail_price{
                    >view:nth-child(1){
                        font-size: 18px;
                        color: @bgColor;
                    }
                    >view:nth-child(2){
                        font-size: 10px;
                        color: #b2b2b2;
                        text-decoration: line-through;
                    }
                }
                .goToPintuan{
                    width: 90px;
                    height: 30px;
                    background: @bgColor;
                    color: white;
                    text-align: center;
                    line-height: 30px;
                    border-radius: 5px;
                }
            }
        }
    }
    .pintuan_info{
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;
        >view:nth-child(1){
            font-size: 20px;
            padding: 30px 0;
            line-height: 20px;
            >text:nth-child(2){
                color: @bgColor;
            }
        }
        .pintuan_users_list{
            width: 280px;
            display: flex;
            flex-wrap: wrap;
            padding: 0px 0 20px;
            justify-content: flex-start;
            >view{
                width: 44px;
                height: 44px;
                border-radius: 50%;
                border: 1px dashed #b2b2b2;
                color: #b2b2b2;
                line-height: 44px;
                text-align: center;
                margin: 5px;
            }
            .existing{
                border:1px solid @bgColor;
                position: relative;
                >view{
                    position: absolute;
                    color:@bgColor;
                    top: -5px;
                    left: -10px;
                    font-size: 10px;
                    width: 32px;
                    height: 16px;
                    border-radius: 16px;
                    border: 1px solid @bgColor;
                    background: #fceded;
                    line-height: 16px;
                }
                img{
                    width: 44px;
                    height: 44px;
                    object-fit: cover;
                    border-radius: 50%;
                }
            }
        }
    }
    #goto_pintuan_btn{
        width: 100%;
        height: 48px;
        position: absolute;
        bottom: 0;
        background: @bgColor;
        line-height: 48px;
        text-align: center;
        color: white;
    }
}
.backToHome{
  width: 40px;
  height: 40px;
  position: fixed;
  border-radius: 50%;
  bottom: 100px;
  right:20px;
  background: rgba(256, 256, 256, 1);
  border: 1px solid #b2b2b2;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 5px;
  img{
    width: 16px;
    height: 16px;
    
  }
}
</style>
