<template>
  <div id="app">
    <VNav :currentNav="13" :currentStr="1"></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">省份列表</h2>
        </div>
        <section class="mtb">

          <input type="text" id="title" v-model="searchDate.searchTitle" class="textbox textbox_225" placeholder="输入省份查询..." />
          <input type="button" value="查询" class="group_btn" @click="subForm()"/>
        </section>
        <table class="table table-bordered">
          <thead>
          <tr>
            <th><input type="checkbox" name="id" ></th>
            <th>省份名称</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody id="showtable" v-for="(province,index) in provinceList">
          <tr>
            <th><input type="checkbox" name="id" :value="province.provinceId"></th>
            <td style="padding-left: 20px;max-width: 200px;">{{province.provinceName}}</td>
            <td class="center"><a title="查看所属的城市"   data-toggle="modal" data-target="#myModal" @click="getCityByProviceId(province.provinceId,1)"><img style="width: 30px;height: 30px;    display: inherit;" src="@/assets/images/chakan.png"></a>
              <a title="添加城市"   data-toggle="modal" data-target="#myModal" @click="clickToAddCity(province.provinceId,2)"><img style="width: 25px;height: 25px;    display: inherit;" src="@/assets/images/zengjia-01.png"></a>
            </td>
          </tr>
          </tbody>


        </table>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
              </div>
              <div class="modal-body">
                <div v-show="modal1Status2===1">
                  <div v-if="cityList.length===0">
                    <p> 暂无数据</p>
                  </div>
                  <div v-else>
                    <table class="table table-bordered">
                      <thead>
                      <tr>
                        <th><input type="checkbox" name="id" ></th>
                        <th>城市名称</th>
                        <th>所属省份</th>
                        <th>操作</th>
                      </tr>
                      </thead>
                      <tbody  v-for="(city,index) in cityList">
                      <tr>
                        <th><input type="checkbox" name="id" :value="city.cityId"></th>
                        <td style="padding-left: 20px;max-width: 200px;">{{city.cityName}}</td>
                        <td style="padding-left: 20px;">{{city.provinceName}}</td>
                        <td class="center">
                          <a title="编辑" class="link_icon" @click="update(city)"><img style="width: 25px;height: 25px;    display: inherit;" src="@/assets/images/zengjia-01.png"></a>
                          <a  title="删除" class="link_icon"  @click="del(city)"><img style="width: 25px;height: 25px;    display: inherit;" src="@/assets/images/delete.png"></a>
                        </td>
                      </tr>
                      </tbody>


                    </table>
                  </div>
                </div>
                <div v-show="modal1Status2===2">
                  <form class="form-horizontal" role="form" onsubmit="return false;" id="form1">
                  <div class="form-group">
                    <label class="col-sm-2 control-label">城市名称</label>
                    <div class="col-sm-10">
                      <el-input type="text"  v-model="city.cityName" style="width:60%" id="cityName" name="cityName" placeholder="城市名称" required="required"></el-input>
                    </div>
                  </div>
                  <!--<div class="form-group">
                    <label class="col-sm-2 control-label">城市封面</label>
                    <div class="col-sm-10" style="max-width: 300px;">
                      <input v-show="false" type="file" accept="image/*" @change="getFiles($event)" ref="input" ></input>
                      <div style="width:200px;height:200px;border: 1px solid #cecece;text-align: center;" @click="openImg">
                        <span style="margin-top: 25px" v-if="imgUrl==''">点击上传</span>
                        <el-image style="height:100%;width:100%;" v-if="imgUrl!=''" :src="imgUrl" @click="openImg" ></el-image>
                      </div>

                    </div>
                  </div>-->

                  <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">

                    </div>
                  </div>
                  </form>
                </div>
                <form class="form-horizontal" role="form" onsubmit="return false;"  v-show="modal1Status2===3">
                  <div class="form-group">
                    <label class="col-sm-2 control-label">城市名称</label>
                    <div class="col-sm-10">
                      <el-input type="text"  v-model="cityUpdate.cityName" style="width:60%"  name="cityName" placeholder="城市名称" required="required"></el-input>
                    </div>
                  </div>
                  <!--<div class="form-group">
                    <label class="col-sm-2 control-label">城市封面</label>
                    <div class="col-sm-10" style="max-width: 300px;">
                      <input v-show="false" type="file" accept="image/*" @change="getFiles($event)" ref="input" ></input>
                      <div style="width:200px;height:200px;border: 1px solid #cecece;text-align: center;" @click="openImg">
                        <span style="margin-top: 25px" v-if="imgUrl==''">点击上传</span>
                        <el-image style="height:100%;width:100%;" v-if="imgUrl!=''" :src="imgUrl" @click="openImg" ></el-image>
                      </div>

                    </div>
                  </div>-->

                  <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">

                    </div>
                  </div>
                </form>
                <div>
                  <div style="text-align: center;">
                    <span slot="footer" class="dialog-footer">
                         <el-button class="btn btn-default"  style="margin-left: 25%" v-show="modal1Status2===2" @click="sub()">保存</el-button>
                      <el-button class="btn btn-default"  style="margin-left: 25%" @click="subUpdate()" v-show="modal1Status2===3">保存</el-button>
                      <el-button type="button" class="btn btn-default" data-dismiss="modal">关闭</el-button>
                    </span>
                  </div>
                </div>
              </div>

            </div><!-- /.modal-content -->
          </div><!-- /.modal -->
        </div>

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
    name: "provinceList",
    components:{
      VNav
    },
    data(){
      return{
        cityUpdate:[],
        navStr:'13-1',
        modal1Status2: 1,
        title: "添加景点图片",
        m_content: "我是首页的内容",
        searchDate:{
          searchTitle:'',
          pageIndex:1,
          size:10
        },
        city:{
          cityName:'',
          provinceId:''
        },
        all: 10, //总页数
        cur: 1,//当前页码
        totalPage: 0,//当前条数
        totalCount:124,
        ImageList:[],
        provinceList:[],
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
      update(city){
        this.cityUpdate=city;
        this.modal1Status2=3;
      },
      subUpdate() {

        if (this.cityUpdate.cityName === "") {
          alert("名称不能为空");
          return false;
        }
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };

        this.$axios.post("/city/update", qs.stringify(this.cityUpdate), config)
          .then(successResponse => {
            if(successResponse.data.message==='OK'){
              alert("保存成功");
              this.getCityByProviceId(this.cityUpdate.provinceId,1);
            }
            else{
              alert(successResponse.data.message);
            }

          })
          .catch(failRespose => {
            alert("系统错误");
          })


      },
      sub() {

        if (this.city.cityName === "") {
          alert("城市名称不能为空");
          return false;
        }

//			alert(editor.txt.html());

        // var data = $("#form1").serialize();
        console.log(this.city);
        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };

        this.$axios.post("/city/save", qs.stringify(this.city), config)
          .then(successResponse => {
            if(successResponse.data.message==='OK'){
              alert("保存成功");
              //this.getCityByProviceId(this.city.provinceId,1);

            }
            else{
              alert(successResponse.data.message);
            }


          })
          .catch(failResponse => {
            alert("系统错误");
          })


      },
      getCityByProviceId(provinceId,num){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=this.cur;
        this.$axios.get("city/get_city_province?provinceId="+provinceId)
          .then(result=>{
            var data = result.data;
            this.cityList=[];
            this.cityList=data.cityList;
            this.title='查看所属城市列表';
            this.modal1Status2=1;

          })
          .catch(failResponse=>{
            alert("数据加载异常，请重新尝试...")
          })
      },
      clickToAddCity(provinceId,num){
        this.city.cityName='';
        this.city.provinceId=provinceId;
        this.title='添加所属城市';
        this.modal1Status2=num;
      },
      dataListFn: function(index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=index;
        this.$axios.post("city/province_list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.provinceList=[];
            this.provinceList=data.provinceList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
          })
          .catch(failResponse=>{

            alert("数据加载异常，请重新尝试...")
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
        this.$axios.post("city/province_list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.provinceList=[];
            this.provinceList=data.provinceList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
          })
          .catch(failResponse=>{
            alert("数据加载异常，请重新尝试...")
          })

      },

      del(city) {

        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.post("city/del?cityId="+city.cityId,config)
            .then(successResponse=>{
              if(successResponse.data==="noLogin"){
                alert("没有登录")
                this.$router.replace({path:'/adminLogin'})
              }
              else {
                alert("删除成功")
                this.getCityByProviceId(city.provinceId,1)
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
        this.$axios.post("city/province_list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.provinceList=[];
            this.provinceList=data.provinceList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
          })
          .catch(failResponse=>{

            alert("数据加载异常，请重新尝试...")
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
    opaprovince: 0;
  }

  .header_active {
    background-color: #ffd800;
    height: 37px;
  }
</style>
