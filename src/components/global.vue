<template>
<div>
  <div>
    <!--商品展示-->
    <swiper indicator-dots autoplay interval="3000">
      <swiper-item v-for="(img,iid) in ImageList" :key="iid">
        <image :src="imageUrl+img.filePath" />
      </swiper-item>
    </swiper>
    <!--商品标题价格-->
    <view class='box-demo'>
      <view class='price' style="font-size: 45rpx;">{{scenic.scenicName}}</view>
      <view class='title'>{{scenic.proviceName}}{{scenic.cityName}}{{scenic.scenicAddr}}</view>

    </view>

    <!--商品详情展示-->
    <p style="color:white">1111</p>
    <view>

      <view >
        <view   >
          <view>
            <view class='title'><text style="font-weight:bold">简介：</text><view >{{scenic.scenicDescription}}</view></view>
          </view>
          <view>
            <p style="color:white">1111</p>
            <view class='title'><text style="font-weight:bold">开放时间: </text><view >{{scenic.scenicOpenTime}}</view></view>
          </view>
          <view>
            <p style="color:white">1111</p>
            <text class='title'><text style="font-weight:bold">建议游玩时间: </text>{{scenic.scenicCostTime}}</text>
          </view>
          <view>
            <p style="color:white">1111</p>
            <text class='title'><text style="font-weight:bold">联系方式：</text>{{scenic.scenicTel}}</text>
          </view>
        </view>
      </view>
    </view>
      <view class="demo-box">

        <block v-for="(strategy,sid) in strategyList" :key="sid">
          <view class="goods-box"   >
            <image class="goods-pic" :src="imageUrl+strategy.strategyImg"></image>
            <view class="goods-title">{{strategy.strategyName}}</view>
            <view class="row">
              <view class="goods-price">{{strategy.scenicName}}</view>
              <text class="goods-btn">点击查看</text>

            </view>
          </view>

        </block>


      </view>
      <view class="demo-box" style="width:100%">
        <block>
          <view class="goods-box" @click="dataListFn">
            <text class="goods-btn2" >点击加载更多</text>
          </view>
        </block>
      </view>
      <!--底部加入购物车-->
      <view class="bottom">

        <view class="right"style=" background: #f00;" >
          <text class="textone" bindtap="addcart"  >收藏</text>
        </view>
        <view class="right" style="background-color:#ffcd26">
          <text class="textone" bindtap="addcart"  >取消收藏</text>
        </view>

      </view>

  </div>
</div>
</template>

<script>
    export default {
        name: "global",
      searchMessage:''
    }
</script>

<style scoped>

</style>
