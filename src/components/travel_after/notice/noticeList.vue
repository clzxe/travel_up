<template>
  <div >
    <VNav :currentNav="9" :currentStr="1"></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">公告列表</h2>
        </div>
        <section class="mtb">

          <input type="text" id="title" v-model="searchDate.searchTitle" class="textbox textbox_225" placeholder="输入标题查询..." />
          <input type="button" value="查询" class="group_btn" @click="subForm()"/>
          <input type="button" value="增加" data-toggle="modal" data-target="#myModal3" class="group_btn"  @click="addGroup()" />
        </section>
        <table class="table table-bordered">
          <thead>
          <tr>
            <th><input type="checkbox" name="id"></th>
            <th>公告标题</th>
            <th>公告内容</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody id="showtable" v-for="(notice,index) in noticeList">
          <tr>
            <th><input type="checkbox" name="id" ></th>
            <td style="padding-left: 20px;max-width: 200px;">{{notice.noticeTitle}}</td>
            <td style="padding-left: 20px;max-width: 200px;">{{notice.noticeContent}}</td>
            <td style="padding-left: 20px;max-width: 200px;">{{notice.createTime}}</td>
            <td class="center">
              <a  title="修改" data-toggle="modal" data-target="#myModal3" class="iconfont travel-iconedit"  style="color: #c12e2a;font-size: 25px" @click="update(notice)" ></a>
              <a  title="删除"  class="iconfont travel-iconshanchu"  style="color: #00a0e9;font-size: 25px"  @click="del(notice.noticeId)"></a>
              <a  title="查看" data-toggle="modal" data-target="#myModal3"  class="iconfont travel-iconchakan"  style="color: #ff79c6;font-size: 29px"  @click="getView(notice)"></a>
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
              <li style="font-size: 12px" class="threeword" ><a v-on:click="cur=1,pageClick()">首页</a></li>
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
      <div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
           aria-hidden="true" style="width: 900px;height: auto">
        <div class="modal-dialog" style="width:900px;height: auto">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" id="myModalLabe3">查看公告</h4>
            </div>
            <div class="modal-body">
              <form class="form-horizontal" role="form" onsubmit="return false;" id="form1" v-show="themeStatus===4">
                <div class="form-group">
                  <label class="col-sm-2 control-label">公告标题</label>
                  <div class="col-sm-10">
                    <el-input type="text"  style="width: 60%" v-model="noticeUpdate.noticeTitle"
                              name="scenicName" placeholder="公告标题" required="required"></el-input>
                  </div>
                  <label class="col-sm-2 control-label">公告内容</label>
                  <div class="col-sm-10">
                    <el-input type="text"  style="width: 60%" v-model="noticeUpdate.noticeContent"
                              name="scenicName" placeholder="公告内容" required="required"></el-input>
                  </div>
                </div>
              </form>
              <form  method="post" name="travel-cus" class="cusForm" v-show="themeStatus===3">
                <h1>公告</h1>
                <ul class="cus-table">
                  <li style="margin-top: 2%">
                    <label style="width: 98px">公告标题：</label>

                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="noticeView.noticeTitle"></el-input>

                  </li>
                  <li style="margin-top: 2%">
                    <label style="width: 98px">公告内容：</label>

                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="noticeView.noticeContent"></el-input>

                  </li>

                </ul>


              </form>

              <form  method="post" name="travel-cus" class="cusForm" v-show="themeStatus===2">
                <h1>主题</h1>
                <ul class="cus-table">
                  <li style="margin-top: 2%">
                    <label style="width: 98px;margin-left: 10%">公告标题：</label>

                    <el-input style="font-weight: 100;width: 60%;"  v-model="noticeMessage.noticeTitle"></el-input>

                  </li>
                  <li style="margin-top: 2%">
                    <label style="width: 98px;margin-left: 10%">公告内容：</label>

                    <el-input style="font-weight: 100;width: 60%;"  v-model="noticeMessage.noticeContent"></el-input>

                  </li>
                </ul>


              </form>
            </div>
            <div class="modal-footer">

              <el-button  class="btn btn-default" data-dismiss="modal">关闭</el-button>
              <el-button  class="btn btn-default"data-dismiss="modal"  @click="sub()" v-show="themeStatus===2">保存</el-button>
              <el-button  class="btn btn-default"data-dismiss="modal"  @click="subupdate()" v-show="themeStatus===4">保存</el-button>

            </div>
            <!-- /.modal-content -->
          </div><!-- /.modal -->
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
        themeStatus:1,
        modalStatus2: false,
        m_title: "添加景点图片",
        m_content: "我是首页的内容",
        searchDate:{
          searchTitle:'',
          pageIndex:1,
          size:10
        },
        noticeMessage:{
          noticeTitle:'',
          noticeContent:''
        },
        ImageList:[],
        noticeUpdate:'',
        noticeView:'',
        noticeList:'',
        total:'',
        pageCount:'',
        totalData:'',
        all: 10, //总页数
        cur: 1,//当前页码
        totalPage: 0,//当前条数
        totalCount:124,
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
      dateFormat:function(dateT){
        var date = new Date(dateT);
        var str=date.getFullYear()+'-';
        str+=date.getMonth()+1+'-';
        str+=date.getDate()+' ';
        str+=date.getHours()+':';
        str+=date.getMinutes()+':';
        str+=date.getHours();
        return str;
      },
      addGroup(){
        this.themeStatus=2;
      },
      update(notice){
        this.noticeUpdate=notice;
        this.themeStatus=4;
      },
      getView(notice){
        this.noticeView=notice;
        this.themeStatus=3;

      },
      subupdate() {

        if (this.noticeUpdate.noticeTitle === "") {
          alert("公告标题不能为空");
          return ;
        }
        if (this.noticeUpdate.noticeContent === "") {
          alert("公告内容不能为空");
          return ;
        }
//			alert(editor.txt.html());

        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };

        this.$axios.post("/notice/update", qs.stringify(this.noticeUpdate), config)
          .then(successReqponse => {
            if(successReqponse.data.message==='OK'){
              alert("保存成功！");
              this.$router.go(0)
            }else {
              alert(successReqponse.data.message);
            }


          })
          .catch(failRespose => {
            console.log("系统错误");
          })


      },
      sub() {


        if (this.noticeMessage.noticeTitle === "") {
          alert("公告标题不能为空");
          return false;
        }
        if (this.noticeMessage.noticeContent === "") {
          alert("公告内容不能为空");
          return false;
        }

//			alert(editor.txt.html());
        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.post("/notice/save", qs.stringify(this.noticeMessage), config)
          .then(successReqponse => {
            alert("保存成功");
            this.$router.go(0)
          })
          .catch(failRespose => {
            alert("系统错误");
          })


      },
      dataListFn: function(index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=index;
        this.$axios.post("notice/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.noticeList=[];
            this.noticeList=data.noticeList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchDate;
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
        if(this.cur===1||this.cur===this.all){

        }
        else{
          this.dataListFn(this.cur.toString());
        }

      },
      init() {
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=this.cur;
        this.$axios.post("notice/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.noticeList=[];
            this.noticeList=data.noticeList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })

      },

      del(noticeId) {

        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.post("notice/del?noticeId="+noticeId,config)
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
        this.$axios.post("notice/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.noticeList=[];
            this.noticeList=data.noticeList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchDate;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })
      }
    }
  }

</script>

<style lang="less">
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-10px);
    opacity: 0;
  }
  .disabled .el-upload--picture-card {
    display: none !important;
  }
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

  &.danger {
     background: red;


   }

  &.default {
     background: #ddd;
   }

  }

  }
  }
</style>
