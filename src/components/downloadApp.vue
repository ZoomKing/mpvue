<template lang="pug">
.downloadApp
    .alert
        .top
            view 
                text {{'请打开App Store或应用市场'}}
                text {{'下载品库App，更多惊喜等着你！'}}
            view(@click='close(false)')
                img(src='/static/assets/detail_order_delete_icon@3x.png')
        img.center(src='/static/assets/download_page_pic.png',mode='widthFix')
        .bottom(@click='close(false)') {{'好，知道了'}}
</template>

<script>
export default {
  props:{
      
  },
  computed: {
      
  },
  mounted () {
  },
 
  methods: {
      close(state){
          this.$emit('listenFromDownload',state)
      }
  },
  components:{
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.downloadApp{
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .alert{
        width: 300px;
        height: 300px;
        background: white;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 20px 0;
        align-items: center;
        .top{
            font-size: 14px;
            display: flex;
            flex-direction: column;
            // justify-content: center;
            align-items: center;
            position: relative;
            >view:nth-child(1){
                width: 240px;
                height: 40px;
                display: flex;
                flex-direction: column;
                text-align: center;
            }
            >view:nth-child(2){
                position: absolute;
                top: 0;
                right: -10px;
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: flex-end;
                img{
                    width: 16px;
                    height: 16px;
                }
            }
        }
        .center{
            width: 100%;
        }
        .bottom{
            width: 200px;
            height: 40px;
            font-size: 14px;
            border-radius: 30px;
            background: @bgColor;
            color: white;
            text-align: center;
            line-height: 40px;
        }
    }
}
</style>
