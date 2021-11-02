<template>
    <div id="app">
      <VHeader></VHeader>
      <div class="contant">
        <div class="shaixuan">
          <span>线路名称</span>
          <input type="text">
          <span>金额</span>
          <input type="text">~<input type="text">
          <button>搜索</button>
        </div>
        <div class="list clearfix">
          <ul>
            <li>
              <span class="num one">1</span>
              <a href="route_detail.html"><img src="images/jiangxuan_4.jpg" alt=""></a>
              <h4><a href="route_detail.html">【尾单特卖】全国-曼谷6-7天自由行 泰国出境旅游 特价往6-7天自由行 泰国出境旅游 特价往..</a></h4>
              <p>
                <b class="price">&yen;<span>899</span>起</b>
                <span class="shouchang">已收藏450次</span>
              </p>
            </li>
            <li>
              <span class="num two">2</span>
              <a href="route_detail.html"><img src="images/jiangxuan_4.jpg" alt=""></a>
              <h4><a href="route_detail.html">【尾单特卖】全国-曼谷6-7天自由行 泰国出境旅游 特价往6-7天自由行 泰国出境旅游 特价往..</a></h4>
              <p>
                <b class="price">&yen;<span>899</span>起</b>
                <span class="shouchang">已收藏450次</span>
              </p>
            </li>
            <li>
              <span class="num">3</span>
              <a href="route_detail.html"><img src="images/jiangxuan_4.jpg" alt=""></a>
              <h4><a href="route_detail.html">【尾单特卖】全国-曼谷6-7天自由行 泰国出境旅游 特价往6-7天自由行 泰国出境旅游 特价往..</a></h4>
              <p>
                <b class="price">&yen;<span>899</span>起</b>
                <span class="shouchang">已收藏450次</span>
              </p>
            </li>
            <li>
              <span class="num">4</span>
              <a href="route_detail.html"><img src="images/jiangxuan_4.jpg" alt=""></a>
              <h4><a href="route_detail.html">【尾单特卖】全国-曼谷6-7天自由行 泰国出境旅游 特价往6-7天自由行 泰国出境旅游 特价往..</a></h4>
              <p>
                <b class="price">&yen;<span>899</span>起</b>
                <span class="shouchang">已收藏450次</span>
              </p>
            </li>
            <li>
              <span class="num">5</span>
              <a href="route_detail.html"><img src="images/jiangxuan_4.jpg" alt=""></a>
              <h4><a href="route_detail.html">【尾单特卖】全国-曼谷6-7天自由行 泰国出境旅游 特价往6-7天自由行 泰国出境旅游 特价往..</a></h4>
              <p>
                <b class="price">&yen;<span>899</span>起</b>
                <span class="shouchang">已收藏450次</span>
              </p>
            </li>
            <li>
              <span class="num">6</span>
              <a href="route_detail.html"><img src="images/jiangxuan_4.jpg" alt=""></a>
              <h4><a href="route_detail.html">【尾单特卖】全国-曼谷6-7天自由行 泰国出境旅游 特价往6-7天自由行 泰国出境旅游 特价往..</a></h4>
              <p>
                <b class="price">&yen;<span>899</span>起</b>
                <span class="shouchang">已收藏450次</span>
              </p>
            </li>
            <li>
              <span class="num">7</span>
              <a href="route_detail.html"><img src="images/jiangxuan_4.jpg" alt=""></a>
              <h4><a href="route_detail.html">【尾单特卖】全国-曼谷6-7天自由行 泰国出境旅游 特价往6-7天自由行 泰国出境旅游 特价往..</a></h4>
              <p>
                <b class="price">&yen;<span>899</span>起</b>
                <span class="shouchang">已收藏450次</span>
              </p>
            </li>
            <li>
              <span class="num">8</span>
              <a href="route_detail.html"><img src="images/jiangxuan_4.jpg" alt=""></a>
              <h4><a href="route_detail.html">【尾单特卖】全国-曼谷6-7天自由行 泰国出境旅游 特价往6-7天自由行 泰国出境旅游 特价往..</a></h4>
              <p>
                <b class="price">&yen;<span>899</span>起</b>
                <span class="shouchang">已收藏450次</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="pageNum">
          <ul>
            <li><a href="">首页</a></li>
            <li class="threeword"><a href="#">上一页</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">6</a></li>
            <li><a href="#">7</a></li>
            <li><a href="#">8</a></li>
            <li><a href="#">9</a></li>
            <li><a href="#">10</a></li>
            <li class="threeword"><a href="javascript:;">下一页</a></li>
            <li class="threeword"><a href="javascript:;">末页</a></li>
          </ul>
        </div>
      </div>
      <div id="footer">
        <VFooter></VFooter>
      </div>
    </div>
</template>

<script>
  import VFooter from "@/components/travel_up/common/Footer";
  import VHeader from '@/components/travel_up/common/Header'
    export default {
        name: "favoriteScenicRank",
      data(){
          return{
            bg:'url('+require('../../assets/images/5ff1cbaa8650f.jpg')+')',
          }
      },
      components:{
        VFooter,
        VHeader
      }
    }
</script>

<style scoped>

</style>
