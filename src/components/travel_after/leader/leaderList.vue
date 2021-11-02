<template>
<div>
  <VNav :currentNav="6" :currentStr="1" ></VNav>
  <section class="rt_wrap content mCustomScrollbar">
    <div class="rt_content">
      <div class="page_title">
        <h2 class="fl">导游列表</h2>
      </div>
      <section class="mtb">

        <input type="text" id="title" v-model="searchDate.searchTitle" class="textbox textbox_225" placeholder="输入标题查询..." />
        <input type="button" value="查询" class="group_btn" @click="subForm()"/>
      </section>
      <div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
           aria-hidden="true" style="width: 900px;height: auto">
        <div class="modal-dialog" style="width:900px;height: auto">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" id="myModalLabe3">查看主题</h4>
            </div>
            <div class="modal-body">

              <form  method="post" name="travel-cus" class="cusForm" >
                <h1>主题</h1>
                <ul class="cus-table">
                  <li style="margin-top: 2%">
                    <label style="width: 98px">旅行团名称：</label>
                    <div class="cus-mold">
                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="group.groupName"></el-input>
                    </div>
                  </li>
                  <li style="margin-top: 2%">
                    <label style="width: 98px">旅行团名称：</label>
                    <div class="cus-mold">
                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="group.groupDes"></el-input>
                    </div>
                  </li>

                </ul>


              </form>

            </div>
            <div class="modal-footer">

              <el-button  class="btn btn-default" data-dismiss="modal">关闭</el-button>

            </div>
            <!-- /.modal-content -->
          </div><!-- /.modal -->
        </div>
      </div>
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>全选<input type="checkbox" name="id"></th>
          <th>导游用户名</th>
          <th>导游姓名</th>
          <th>密码</th>
          <th>性别</th>
          <th>年龄</th>
          <th>联系电话</th>
          <th>所属旅行团</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody id="showtable" v-for="(leader,index) in leaderList">
       <tr>
         <th><input type="checkbox" name="id" ></th>
         <td style="padding-left: 20px;max-width: 200px;">{{leader.leaderNumber}}</td>
         <td style="padding-left: 20px;max-width: 200px;">{{leader.leaderName}}</td>
         <td style="padding-left: 20px;max-width: 200px;">{{leader.leaderPassword}}</td>
         <td style="padding-left: 20px;max-width: 200px;"><span v-if="leader.leaderSex===1">女</span>
           <span v-if="leader.leaderSex===2">男</span></td>
         <td style="padding-left: 20px;max-width: 200px;">{{leader.leaderAge}}</td>
         <td style="padding-left: 20px;max-width: 200px;">{{leader.leaderTel}}</td>
         <td style="padding-left: 20px;">
           <a  title="查看" data-toggle="modal"
               data-target="#myModal3" class="iconfont travel-iconchakan"  style="color: #ff79c6;font-size: 29px"  @click="getGroup(leader)"></a></td>

        <td class="center"><router-link :to="{path:'leaderUpdate',query:{leaderId:leader.leaderId}}" title="编辑" class="iconfont travel-iconedit" style="color: #c12e2a;font-size: 25px"></router-link>
          <a  title="删除" class="iconfont travel-iconshanchu"  style="color: #00a0e9;font-size: 25px"  @click="del(leader.leaderId)"></a>
          <a  title="查看" data-toggle="modal"
              data-target="#seeScenic" class="iconfont travel-iconchakan"  style="color: #ff79c6;font-size: 29px"  @click="getScenic(leader)"></a></td>
       </tr>
        </tbody>


      </table>
      <div class="modal fade" id="seeScenic" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
           aria-hidden="true" style="width: 800px;height: auto">
        <div class="modal-dialog" style="width: 658px;height: auto">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h3 class="modal-title" id="seeScenicLabel">查看导游</h3>
            </div>
            <div class="modal-body">
              <form  method="post" name="travel-cus" class="cusForm">

                <ul class="cus-table">
                  <li style="margin-top: 2%">
                    <label style="width: 98px">用户名：</label>

                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="leader.leaderNumber" ></el-input>
                  </li>
                  <li style="margin-top: 2%">
                    <label style="width: 98px">导游姓名：</label>
                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="leader.leaderName"></el-input>

                  </li>

                  <li style="margin-top: 2%">
                    <label style="width: 98px">密码：</label>
                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="leader.leaderPassword"></el-input>

                  </li>
                  <li style="margin-top: 2%">
                    <label style="width: 98px">  性别：</label>
                    <span v-if="leader.leaderSex===1"> <el-input style="font-weight: 100;width: 60%;" readonly="readonly" value="女"></el-input></span>
                    <span v-if="leader.leaderSex===2"> <el-input style="font-weight: 100;width: 60%;" readonly="readonly" value="男"></el-input></span>

                  </li>
                  <li style="margin-top: 2%">
                    <label style="width: 98px">  年龄：</label>
                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="leader.leaderAge"></el-input>
                  </li>

                  <li style="margin-top: 2%">
                    <label style="width: 98px">联系电话：</label>
                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="leader.leaderTel"></el-input>

                  </li>
                  <li style="margin-top: 2%">
                    <label style="width: 98px">所属旅行团：</label>
                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="leader.groupName"></el-input>

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
        name: "lineList",
      components:{
          VNav
      },
      data(){
          return{
            modalStatus2: false,
            m_title: "添加景点图片",
            m_content: "我是首页的内容",
            searchDate:{
              searchTitle:'',
              pageIndex:1,
              size:10
            },
            group:'',
            leader:'',
            ImageList:[],
            leaderList:'',
            total:'',
            pageCount:'',
            totalData:'',
            all: 10, //总页数
            cur: 1,//当前页码
            totalPage: 0,//当前条数
            totalCount:124
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
        getScenic(leader){
          this.leader=leader;
        },
        getGroup(leader){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.get("group/getgroup?groupId="+leader.groupId,config)

            .then(result=>{
              var data = result.data;
              this.group=[];
              this.group=data.group;

            })
            .catch(failResponse=>{
              alert('数据加在错误...正在重新载入')
            })

        },
        dataListFn: function(index){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.searchDate.pageIndex=index;
          this.$axios.post("leader/list",qs.stringify(this.searchDate),config)

            .then(result=>{
              var data = result.data;
              this.leaderList=[];
              this.leaderList=data.leadersList;
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
          this.$axios.post("leader/list",qs.stringify(this.searchDate),config)

            .then(result=>{
              var data = result.data;
              this.leaderList=[];
              this.leaderList=data.leadersList;
              this.all =data.pageCount;//总页数
              this.totalCount = data.total;
              this.searchDate.searchTitle=data.searchTitle;
            })
            .catch(failResponse=>{
              alert('数据加在错误...正在重新载入')
            })

        },

        del(leaderId) {

          if(confirm("确实要删除吗？")){
            var qs=require('querystring')
            let config={
              header:{'Content-type':'application/x-www-form-urlencoded'}
            };
            this.$axios.post("leader/del?leaderId="+leaderId,config)
              .then(successResponse=>{
                if(successResponse.data==="noLogin"){
                  alert("没有登录")
                  this.$router.push({path:'/adminLogin'})
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
          this.$axios.post("leader/list",qs.stringify(this.searchDate),config)

            .then(result=>{
              var data = result.data;
              this.leaderList=[];
              this.leaderList=data.leadersList;
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

<style lang="less">
  .modal {
    width: 1000px;
    top: 50%;
    left: 50%;
    margin-toP: -250px;
    margin-left: -400px;
    border: 1px solid #666;

  .header {
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #666;
    border-bottom: 1px solid #000;
    box-sizing: border-box;
  }

  .content {
    background: orange;
    height: 290px;

  }

  .footer {
    height: 50px;
    line-height: 50px;

  button {
    vertical-align: middle;
    display: inline-block;
    width: 80px;
    height: 40px;
    line-height: 40px;
    color: #fff;

  &
  .danger {
    background: red;


  }

  &
  .default {
    background: #ddd;
  }

  }

  }
  }
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

  .disabled .el-upload--picture-card {
    display: none !important;
  }
</style>
