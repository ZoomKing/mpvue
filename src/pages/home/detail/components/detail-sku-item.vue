<template lang="pug">
    view(:class="{active:isActive}",@click='change(dataInfo)') {{dataInfo}}
</template>

<script>
import { mapState, mapMutations, actions } from "vuex";

export default {
  data() {
    return {};
  },
  props: {
    dataInfo: {
      type: String,
      default: ""
    },
    attributeList: {
      type: Object,
      default: []
    }
  },
  computed: {
    ...mapState(["detail"]),
    isActive() {
      let state = false;
      this.detail.showInfo.attributeList.forEach((item, index) => {
        if (item.value == this.dataInfo) {
          state = true;
        }
      });
      return state;
    }
  },
  methods: {
    ...mapMutations(["changeShowInfo"]),
    change(value) {
      //在sku库里面找对应的东西，然后修改vuex的showInfo
      //找到对应的数组
      for (let key in this.detail.skuNormal) {
        if (this.detail.skuNormal[key].indexOf(value) != -1) {
          this.attributeList.forEach((item, index) => {
            if (this.detail.skuNormal[key].indexOf(item.value) != -1) {
              this.attributeList[index].value = value;
            }
          });
        }
      }
      let that = this;
      wx.getStorage({
        key: "skuDataList",
        success: function(res) {
          res.data.forEach((item, index) => {
            if (
              JSON.stringify(item.attributeList) ===
              JSON.stringify(that.attributeList)
            ) {
              that.changeShowInfo(item);
            }
          });
        }
      });
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
view {
  border: 1px solid #f4f4f4;
  border-radius: 26px;
  padding: 0 20px;
  height: 25px;
  margin: 0 10px 10px 0;
}
.active {
  color: @bgColor;
  background: #fceded;
  border: 1px solid #fceded;
}
.invalid {
  color: @lightColor;
}
</style>
