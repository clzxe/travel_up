<template>
<div >
  <VNav></VNav>
  <section class="rt_wrap content mCustomScrollbar">
    <div class="rt_content">
      <div class="page_title">
        <h2 class="fl">用户列表</h2>
      </div>
      <section class="mtb">

        <input type="text" id="title" v-model="searchDate.searchTitle" class="textbox textbox_225" placeholder="输入标题查询..." />
        <input type="button" value="查询" class="group_btn" @click="subForm()"/>
      </section>
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>全选<input type="checkbox" name="id" ></th>
          <th>用户邮箱</th>
          <th>用户名</th>
          <th>密码</th>
          <th>姓名</th>
          <th>电话</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody id="showtable" v-for="(user,index) in userList">
       <tr >
         <th><input type="checkbox" name="id" ></th>
         <td style="padding-left: 20px;max-width: 200px;">{{user.userMail}}</td>
         <td style="padding-left: 20px;">{{user.userAccount}}</td>
         <td style="text-align: center;">{{user.userPassword}}</td>
         <td style="text-align: center;">{{user.userName}}</td>
         <td style="text-align: center;">{{user.userTel}}</td>
        <td class="center">
          <a  class="iconfont travel-iconshanchu"  style="color: #00a0e9;font-size: 25px" @click="del(user.userId)">删除</a>
          <span v-if="user.isLock===0"><a  class="el-icon-lock" style="color: #5cb85c;font-size: 25px" @click="lock(user.userId)">封号</a> </span>
          <span v-if="user.isLock===1"><a  class="el-icon-unlock" style="color: #5cb85c;font-size: 25px"  @click="unlock(user.userId)">解封</a>
          </span>
          <a  title="查看" data-toggle="modal"
              data-target="#seeScenic" class="iconfont travel-iconchakan"  style="color: #ff79c6;font-size: 29px"  @click="getUser(user.userId)"></a>

        </td>
       </tr>
        </tbody>


      </table>
      <div class="modal fade" id="seeScenic" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
           aria-hidden="true" style="width: 800px;height: auto">
        <div class="modal-dialog" style="width: 658px;height: auto">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h3 class="modal-title" id="seeScenicLabel">查看用户</h3>
            </div>
            <div class="modal-body">
              <form  method="post" name="travel-cus" class="cusForm">

                <ul class="cus-table">
                  <li style="margin-top: 2%">
                    <label style="width: 98px">用户名：</label>

                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="user.userAccount" ></el-input>
                  </li>
                  <li style="margin-top: 2%">
                    <label style="width: 98px">用户邮箱：</label>
                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="user.userMail"></el-input>

                  </li>

                  <li style="margin-top: 2%">
                    <label style="width: 98px">用户密码：</label>
                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="user.userPassword"></el-input>

                  </li>
                  <li style="margin-top: 2%">
                    <label style="width: 98px">  姓名：</label>
                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="user.userName"></el-input>
                  </li>
                  <li style="margin-top: 2%">
                    <label style="width: 98px">  联系电话：</label>
                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="user.userTel"></el-input>
                  </li>

                  <li style="margin-top: 2%">
                    <label style="width: 98px">地址：</label>
                    <span v-if="user.isLock===0">
                       <el-input style="font-weight: 100;width: 60%;" readonly="readonly" value="正常"></el-input>
                    </span>
                    <span v-if="user.isLock===1">
                       <el-input style="font-weight: 100;width: 60%;" readonly="readonly" value="已锁定"></el-input>
                    </span>


                  </li>

                </ul>


              </form>
              <div>
                <center>
            <span slot="footer" class="dialog-footer">
                <el-button type="button" class="btn btn-default" data-dismiss="modal">关闭</el-button>
            </span>
                </center>
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
        name: "userList",
      components:{
          VNav
      },
      data(){
          return{
            modalStatus2: false,
            m_title: "查看用户信息",
            m_content: "我是首页的内容",
            searchDate:{
              searchTitle:'',
              pageIndex:1,
              size:10
            },
            ImageList:[],
            userList:[],
            user:'',
            total:'',
            all: 10, //总页数
            cur: 1,//当前页码
            totalPage: 0,//当前条数
            totalCount:124,}
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
        getUser(userId){
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.get("/user/getuser?userId="+userId)
            .then(successReqponse => {
              if(successReqponse.data.message==='OK'){
                this.user=successReqponse.data.user;
              }
              else{
                alert("页面加载错误！正在重新载入...");
                this.getUser(userId);
              }

            })
            .catch(failRespose => {
              alert("页面加载错误！正在重新载入...");
             // this.$router.replace("/userView?userId="+this.userId);
            })

        },
        dataListFn: function(index){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.searchDate.pageIndex=index;
          this.$axios.post("user/list",qs.stringify(this.searchDate),config)
            .then(result=>{
              var data = result.data;
              this.userList=[];
              this.userList=data.userList;
              this.all =data.pageCount;//总页数
              this.cur = data.pageIndex;
              this.totalCount = data.total;
              this.searchDate.searchTitle=data.searchTitle;
            })
            .catch(failResponse=>{
              alert('数据加在错误...正在重新载入')
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
          this.$axios.post("user/list",qs.stringify(this.searchDate),config)
            .then(result=>{
              var data = result.data;
              this.userList=[];
              this.userList=data.userList;
              this.all =data.pageCount;//总页数
              this.cur = data.pageIndex;
              this.totalCount = data.total;
              this.searchDate.searchTitle=data.searchTitle;
            })
            .catch(failResponse=>{
              alert('数据加在错误...正在重新载入')
            })

        },

        del(userId) {

          if(confirm("确实要删除吗？")){
            var qs=require('querystring')
            let config={
              header:{'Content-type':'application/x-www-form-urlencoded'}
            };
            this.$axios.post("user/del?userId="+userId,config)
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
        lock(userId) {

          if(confirm("确实要删除吗？")){
            var qs=require('querystring')
            let config={
              header:{'Content-type':'application/x-www-form-urlencoded'}
            };
            var lockdata={userId:userId,isLock:1}
            this.$axios.post("user/lock",qs.stringify(lockdata),config)
              .then(successResponse=>{
                if(successResponse.data==="noLogin"){
                  alert("没有登录")
                  this.$router.replace({path:'/adminLogin'})
                }
                else {
                  alert("锁定用户成功")
                  this.$router.go(0)
                }
              })
              .catch(failResponse=>{
                alert("响应异常")
              })
          }else {
            alert("已经取消了锁定操作");
          }

        },
        unlock(userId) {

          if(confirm("确实要删除吗？")){
            var qs=require('querystring')
            let config={
              header:{'Content-type':'application/x-www-form-urlencoded'}
            };
            var lockdata={userId:userId,isLock:0}
            this.$axios.post("user/lock",qs.stringify(lockdata),config)
              .then(successResponse=>{
                if(successResponse.data==="noLogin"){
                  alert("没有登录")
                  this.$router.replace({path:'/adminLogin'})
                }
                else {
                  alert("解封用户成功")
                  this.$router.go(0)
                }
              })
              .catch(failResponse=>{
                alert("响应异常")
              })
          }else {
            alert("已经取消了解封操作");
          }

        },
        subForm(){
          //获取输入框值
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.searchDate.pageIndex=1;
          this.$axios.post("user/list",qs.stringify(this.searchDate),config)
            .then(result=>{
              var data = result.data;
              this.userList=[];
              this.userList=data.userList;
              this.all =data.pageCount;//总页数
              this.cur = data.pageIndex;
              this.totalCount = data.total;
              this.searchDate.searchTitle=data.searchTitle;
            })
            .catch(failResponse=>{
              alert('数据加在错误...正在重新载入')
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
