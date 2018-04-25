<template lang="pug">
.container
  img.home_banner(:src='adQueryImg',mode='widthFix')
  .home_view_ul
    homeItem(
      v-for='(item,index) in pintuanData',
      :item = 'item',
      :key='index',:dataInfo='item')
</template>

<script>
import { mapState, mapActions } from 'vuex'
import global from '@/global'
import homeItem from '@/components/home-item'
import request from '@/utils/request'
import api from './api'
export default {
  data(){
    return{
      suolun:'suolun',
      pintuanData : [],
      currentPage:1,
      isCurrentPage:1,
      pageCount:1,
      adQueryImg:'',
    }
  },
  components: {
    homeItem,
  },
  computed: {
    ...mapState([
      
    ]),
  },
  onShow(){
    //禁止分享
    wx.hideShareMenu();
     this.getPintuanList(this.currentPage);
    this.getQuery(13);
  },
  mounted () {
   
  },
  onReachBottom () {
    if(this.currentPage==this.isCurrentPage && this.currentPage<=this.pageCount){
      this.getPintuanList(this.currentPage);
    }
  },
  methods: {
    ...mapActions([
      
    ]),
    async getPintuanList(currentPage){
      let pintuanListData  = await api.getPintuanList(currentPage);
      this.pintuanData.push(...pintuanListData.value.values);
      this.pageCount = pintuanListData.value.pageCount;
      this.currentPage++;
      this.isCurrentPage = this.currentPage;
      // console.log(pintuanListData.value)
    },
    //广告位
    async getQuery(positionId){
      const res = await api.get_query(positionId);
      let wip = JSON.parse(res.value.values[0].data);
      this.adQueryImg = global.imgUrlPrefix+ wip.img +'@!1200'
    }

  }
}
</script>

<style lang="less">
.container{
  width: 375px;
  .home_banner{
    width: 100%;
  }
  .home_view_ul{
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    background: #f7f8fa;
  }
}

</style>
