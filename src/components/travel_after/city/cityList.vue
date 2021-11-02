<template>
<div id="app">
  <VNav :currentNav="13-1"></VNav>
  <section class="rt_wrap content mCustomScrollbar">
    <div class="rt_content">
      <div class="page_title">
        <h2 class="fl">城市列表</h2>
      </div>
      <section class="mtb">

        <input type="text" id="title" v-model="searchDate.searchTitle" class="textbox textbox_225" placeholder="输入标题查询..." />
        <input type="button" value="查询" class="group_btn" @click="subForm()"/>
      </section>
      <table class="table table-bordered">
        <thead>
        <tr>
          <th><input type="checkbox" name="id" ></th>
          <th>城市名称</th>
          <th>所属省份</th>

          <th>操作</th>
        </tr>
        </thead>
        <tbody id="showtable" v-for="(city,index) in cityList">
       <tr>
         <th><input type="checkbox" name="id" :value="city.cityId"></th>
         <td style="padding-left: 20px;max-width: 200px;">{{city.cityName}}</td>
         <td style="padding-left: 20px;">{{city.provinceName}}</td>
        <td class="center"><router-link :to="{path:'cityUpdate',query:{cityId:city.cityId}}" title="编辑" class="link_icon">&#101;</router-link><a  title="删除" class="link_icon"  @click="del(city.cityId)">&#100;</a>
        </td>
       </tr>
        </tbody>


      </table>

      <div id="pags">
        <!-- 分页  -->
        <div id="pagination" style="float:left;"></div>
        <div class="pageNum" style="margin-left:30%" >
          <!--分页-->

          <ul>
            <li style="width: 80px"><div class="row" style="margin-top: 2%;font-size: 10px;color: #cecece">共{{all}}页/{{totalCount}}条</div></li>
            <li style="font-size: 12px" class="threeword"><a href="">首页</a></li>
            <li style="font-size: 12px" class="threeword" v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
            <li style="font-size: 12px" class="threeword" v-if="cur===1"><a class="banclick">上一页</a></li>
            <li style="font-size: 12px" v-for="index in indexs" v-bind:class="{ 'header_active': cur === index}">
              <a v-on:click="btnClick(index)">{{index}}</a>
            </li>
            <li style="font-size: 12px" class="threeword" v-if="cur!==all"><a v-on:click="cur++,pageClick()">下一页</a></li>
            <li style="font-size: 12px" class="threeword" v-if="cur === all"><a class="banclick">下一页</a></li>
          </ul>
        </div>
      </div>


    </div>
  </section>
</div>
</template>

<script>
  import $ from 'jquery'
  import VNav from "@/components/travel_after/common/nav";
    export default {
        name: "lineList",
      components:{
          VNav
      },
      data(){
          return{
            modal1Status2: false,
            m_title: "添加景点图片",
            m_content: "我是首页的内容",
            searchDate:{
              searchTitle:'',
              pageIndex:1,
              size:10
            },
            all: 10, //总页数
            cur: 1,//当前页码
            totalPage: 0,//当前条数
            totalCount:124,
            ImageList:[],
            cityList:[],
            total:'',
            pageCount:'',
            totalData:'',
            btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
          }
      },
      created: function () {
          this.init();
      },
      computed:{
        indexs: function(){
          var left = 1;
          var right = this.all;
          var ar = [];
          if(this.all>= 5){
            if(this.cur > 3 && this.cur < this.all-2){
              left = this.cur - 2
              right = this.cur + 2
            }else{
              if(this.cur<=3){
                left = 1
                right = 5
              }else{
                right = this.all
                left = this.all -4
              }
            }
          }
          while (left <= right){
            ar.push(left)
            left ++
          }
          return ar
        }
      },
      methods:{
      dataListFn: function(index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=index;
        this.$axios.post("city/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.cityList=[];
            this.cityList=data.cityList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
          })
          .catch(failResponse=>{

            //隐藏分页div块
            $("#pags").css("display", "none");
          })
      },
//分页
      btnClick: function(data){//页码点击事件
        if(data != this.cur){
          this.cur = data
        }
//根据点击页数请求数据
        this.dataListFn(this.cur.toString());
      },
      pageClick: function(){
//根据点击页数请求数据
        this.dataListFn(this.cur.toString());
      },
        init() {
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.searchDate.pageIndex=this.cur;
          this.$axios.post("city/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.cityList=[];
            this.cityList=data.cityList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
          })
          .catch(failResponse=>{

            //隐藏分页div块
            $("#pags").css("display", "none");
          })

        },

        del(cityId) {

          if(confirm("确实要删除吗？")){
            var qs=require('querystring')
            let config={
              header:{'Content-type':'application/x-www-form-urlencoded'}
            };
            this.$axios.post("city/del?cityId="+cityId,config)
              .then(successResponse=>{
                if(successResponse.data==="noLogin"){
                  alert("没有登录")
                  this.$router.replace({path:'/adminLogin'})
                }
                else {
                  alert("删除成功")
                  this.$router.go(0)
                }
              })
              .catch(failResponse=>{
                alert("响应异常")
              })
          }else {
            alert("已经取消了删除操作");
          }

        },
        subForm(){
          //获取输入框值
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.searchDate.pageIndex=1;
          this.$axios.post("city/list",qs.stringify(this.searchDate),config)
            .then(result=>{
              var data = result.data;
              this.cityList=[];
              this.cityList=data.cityList;
              this.all =data.pageCount;//总页数
              this.cur = data.pageIndex;
              this.totalCount = data.total;
            })
            .catch(failResponse=>{

              //隐藏分页div块
              $("#pags").css("display", "none");
            })
        }
      }
    }

</script>

<style scoped>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateY(-10px);
    opacity: 0;
  }
</style>
