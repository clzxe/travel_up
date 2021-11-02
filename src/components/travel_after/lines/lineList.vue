<template>
<div >
  <VNav :currentNav="2" :currentStr="1"></VNav>
  <section class="rt_wrap content mCustomScrollbar">
    <div class="rt_content">
      <div class="page_title">
        <h2 class="fl">路线列表</h2>
      </div>
      <section class="mtb">

        <input type="text" id="title" v-model="searchDate.searchTitle" class="textbox textbox_225" placeholder="输入标题查询..." ></input>
        <input type="button" value="查询" class="group_btn" @click="subForm()"/>
      </section>
      <table class="table table-bordered">
        <thead>
        <tr>
          <th><input type="checkbox" name="id" ></th>
          <th>标题</th>
          <th>封面照片</th>
          <th>活动天数</th>
          <th>目的地</th>
          <th>包含景点</th>
          <th>主题</th>
          <th>包含的酒店及房间名</th>
          <th width="20%">简介</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody id="showtable" v-for="(item,index) in lineList">
       <tr>
         <th><input type="checkbox" name="id" :value=item.lineId></th>
         <td style="padding-left: 20px;max-width: 200px;">{{item.lineTitle}}</td>
         <td style="padding-left: 20px;">
           <a  title="查看更多景点图片"   @click="getImage(item.lineId)" data-toggle="modal"
               data-target="#myModal"> <ul class="el-upload-list el-upload-list--picture-card" style="width: 50px;height: 50px" >
             <li class="el-upload-list__item is-success" style="width: 50px;height: 50px" >
               <img style="width: 100%; height: 100%" :src="item.linePhoto" />

             </li>
           </ul></a>
         </td>

         <td style="text-align: center;">{{item.lineTotalTime}}</td>

         <td style="text-align: center;">{{item.cityName}}</td>
         <td style="text-align: center;"><p v-for="scenic in item.scenicList">{{scenic.scenicName}}</p></td>

         <td style="text-align: center;">{{item.themeName}}</td>
         <td style="text-align: center;">{{item.hotel.hotelName}}{{item.hotel_room.hotelRoomName}}</td>
         <td style="text-align: center;">{{item.lineDescription}}</td>

         <td style="text-align: center;">{{ item.lineCreatTime}}</td>
         <td class="center">
           <router-link :to="{path:'linesUpdate',query:{lineId:item.lineId}}" title="编辑" class="iconfont travel-iconedit" style="color: #c12e2a;font-size: 25px"></router-link>
           <a  title="删除" class="iconfont travel-iconshanchu"  style="color: #00a0e9;font-size: 25px"  @click="del(item.lineId)"></a>
           <a  title="查看" data-toggle="modal"
               data-target="#seeScenic" class="iconfont travel-iconchakan"  style="color: #ff79c6;font-size: 29px"  @click="getLine(item)"></a>
           <a  title="查看旅行时间" data-toggle="modal"
               data-target="#myModal2" class="iconfont travel-iconchakan"  style="color: #ff79c6;font-size: 29px"  @click="getTravel(item)"></a></td>
       </tr>
        </tbody>


      </table>
      <div class="modal fade" id="seeScenic" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
           aria-hidden="true" style="width: 800px;height: auto">
        <div class="modal-dialog" style="width: 658px;height: auto">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h3 class="modal-title" id="seeScenicLabel">查看路线</h3>
            </div>
            <div class="modal-body">
              <form  method="post" name="travel-cus" class="cusForm">

                <ul class="cus-table">
                  <li style="margin-top: 2%">
                    <label style="width: 98px">线路名称：</label>

                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="line.lineTitle" ></el-input>
                  </li>
                  <li style="margin-top: 2%">
                    <label style="width: 98px">线路描述：</label>
                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="line.lineDescription"></el-input>

                  </li>
                  <li style="margin-top: 2%">
                    <label style="width: 98px">目的城市：</label>
                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="line.cityName"></el-input>

                  </li>

                  <li style="margin-top: 2%">
                    <label style="width: 98px">景点：</label>
                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" v-for="(scenic,index) in line.scenicList" :key="index" :value="scenic.scenicName"></el-input>

                  </li>

                  <li style="margin-top: 2%">
                    <label style="width: 98px">  旅游时间：</label>
                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="line.lineTotalTime"></el-input>
                  </li>

                  <li style="margin-top: 2%">
                    <label style="width: 98px">主题：</label>
                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="line.themeName"></el-input>

                  </li>

                  <li style="margin-top: 2%">
                    <label style="width: 98px">创建时间：</label>
                    <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="line.lineCreatTime"></el-input>

                  </li>
                  <li style="margin-top: 2%">
                    <label style="width: 98px">是否包含酒店：</label>
                    <span v-if="line.isIncludeHotel===1"><el-input style="font-weight: 100;width: 60%;" readonly="readonly" value="是"></el-input></span>
                    <span v-if="line.isIncludeHotel===0"><el-input style="font-weight: 100;width: 60%;" readonly="readonly" value="否"></el-input></span>

                  </li>
                  <div v-if="line.isIncludeHotel===1">
                    <li style="margin-top: 2%" >
                      <label style="width: 98px">酒店名：</label>
                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="line.hotel.hotelName"></el-input>

                    </li>
                    <li style="margin-top: 2%" >
                      <label style="width: 98px">房间名：</label>
                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="line.hotel_room.hotelRoomName"></el-input>

                    </li>
                  </div>

                  <li style="margin-top: 2%">
                    <label>景点图片：</label>
                    <label> <ul class="el-upload-list el-upload-list--picture-card" >
                      <li class="el-upload-list__item is-success"  style="width: 146px" >
                        <img style="width: 100%; height: 100%" :src="line.linePhoto" />
                      </li>
                      <li class="el-upload-list__item is-success" style="width: 146px"  v-for="(item,index) in ImageList">
                        <img style="width: 100%; height: 100%" :src="item.filePath" />
                      </li>
                    </ul></label>

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
      <!-- 模态框（Modal） -->
      <div class="modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
           aria-hidden="true" style="width: 900px;height: auto">
        <div class="modal-dialog" style="width:900px;height: auto">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" id="myModal2Label">查看行程</h4>
            </div>
            <div class="modal-body">

              <div class="tableDate">
                <div class="button" style="width:6%;float:right;">
                  <P>
                    <el-button class="el-icon-plus" @click.prevent="addRow()"></el-button>
                  </P>
                  <p>
                    <el-button class="el-icon-minus" @click.prevent="delData()"></el-button>
                  </p>
                </div>
                <div class="table">
                  <el-table
                    :data="tableData"
                    ref="table"
                    tooltip-effect="dark"
                    border
                    stripe
                    style="width: 93%"
                    @selection-change='selectRow'>
                    <el-table-column type="selection" width="45" align="center"></el-table-column>
                    <el-table-column label="序号" prop="rowNum" type="index" width="60" align="center"></el-table-column>
                    <el-table-column label="时间" align="center">
                      <template slot-scope="scope">
                        <el-input prop="travelTimeTime" type="textarea" class="post_name"
                                  v-model="scope.row.travelTimeTime"></el-input>
                        <!--<el-input v-model="scope.row.post_id"></el-input>-->
                      </template>
                    </el-table-column>
                    <el-table-column label="餐饮">
                      <template slot-scope="scope">
                        <el-input prop="travelTimeFood" class="require_des" type="textarea" v-model="scope.row.travelTimeFood"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="活动">
                      <template slot-scope="scope">
                        <el-input prop="travelTimeActivity" type="textarea" class="remark"
                                  v-model="scope.row.travelTimeActivity"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="住宿">
                      <template slot-scope="scope">
                        <el-input prop="travelTimeHotel" type="textarea" class="remark" v-model="scope.row.travelTimeHotel"></el-input>
                      </template>
                    </el-table-column>


                  </el-table>

                  <div>
                    <div style="text-align: center;margin-top: 3%;">
            <span slot="footer" class="dialog-footer" style="margin-top: 2%">
               <el-button class="btn btn-primary" @click="setData()">保存数据</el-button>
                <el-button type="button" class="btn btn-default" data-dismiss="modal">关闭</el-button>
            </span>
                    </div>
                  </div>
                </div>

              </div><!-- /.modal-content -->
            </div><!-- /.modal -->
          </div>
        </div>
      </div>
      <!-- 模态框（Modal） -->
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
           aria-hidden="true" style="width: 800px;height: auto">
        <div class="modal-dialog" style="width: 658px;height: auto">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" id="myModalLabel">查看图片</h4>
            </div>
            <div class="modal-body">
              <div>
                <ul class="el-upload-list el-upload-list--picture-card" v-for="(item,index) in ImageList">
                  <li class="el-upload-list__item is-success"  >
                    <img style="width: 100%; height: 100%" :src="item.filePath" />
                    <span class="el-upload-list__item-actions" @click="delImg(item,index)"><!----><span class="el-upload-list__item-delete"><i class="el-icon-delete"></i></span></span>
                  </li>
                </ul>
              </div>
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
            tableData: [],
            selectlistRow: [],
            rowNum:1,
            oldNum:1,
            isSelectFile: false,
            searchDate:{
              searchTitle:'',
              pageIndex:1,
              size:10
            },
            lineList:[],
            total:'',
            pageCount:'',
            totalData:'',
            ImageList:[],
            line:[],
            all: 10, //总页数
            cur: 1,//当前页码
            totalPage: 0,//当前条数
            totalCount:124,
            travelTimesList:[],
            lineMessage:'',
          }
      },
      mounted: function () {
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
      methods: {
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
        selectRow (val) {
          this.selectlistRow = val
        },
        // 增加行
        addRow () {
          var list = {
            rowNum:this.rowNum,
            travelTimeId:0,
            travelTimeLineId:this.lineMessage.lineId,
            travelTimeTime:'',
            travelTimeFood: '',
            travelTimeActivity:'',
            travelTimeHotel:''
          };
          this.tableData.push(list)
          this.rowNum += 1;
        },
        // 删除方法
        // 删除选中行
        delData () {
          for (let i = 0; i < this.selectlistRow.length; i++) {
            alert('111')
            let val = this.selectlistRow;
            console.log(val)
            // 获取选中行的索引的方法
            // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
            // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
            val.forEach((val, index) => {
              this.tableData.forEach((v, i) => {
                if (val.rowNum === v.rowNum) {
                  // i 为选中的索引

                  if(confirm("确实要删除吗？")){
                    if(val.travelTimeId===0){
                      this.tableData.splice(i, 1);
                    }
                    else {
                      var qs=require('querystring')
                      let config={
                        header:{'Content-type':'application/x-www-form-urlencoded'}
                      };
                      this.$axios.post("line/delTime?travelTimeId="+val.travelTimeId,config)
                        .then(successResponse=>{
                          if(successResponse.data==="OK") {
                            alert("删除成功")
                            this.tableData.splice(i, 1);
                          }
                          else {
                            alert(successResponse.data);
                          }
                        })
                        .catch(failResponse=>{
                          alert("响应异常")
                        })
                    }


                  }else {
                    alert("已经取消了删除操作");
                  }
                  //删除的方法
                }
              })
            })
          }
          // 删除完数据之后清除勾选框
          this.$refs.table.clearSelection()
        },
        setData () {
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.tableData.forEach((v, i) => {
            this.travelTimesList.push({"rowNum":v.rowNum,"travelTimeId":v.travelTimeId,"travelTimeLineId":this.lineMessage.lineId,"travelTimeTime":v.travelTimeTime,"travelTimeFood":v.travelTimeFood,"travelTimeActivity":v.travelTimeActivity,"travelTimeHotel":v.travelTimeHotel});
            console.log(this.travelTimesList)
          //  alert(this.lineMessage.lineId)

          });
          for(var i=0;i<this.travelTimesList.length;i++){
            alert(this.travelTimesList.length)
            console.log(JSON.stringify(this.travelTimesList[i]))
            this.$axios.post("/line/update_time", qs.stringify(this.travelTimesList[i]), config)
              .then(successReqponse => {

              })
              .catch(failRespose => {
                alert("系统错误2");
              });

          }
          if (i === this.travelTimesList.length) {
            alert("保存成功");
            this.getTravel(this.lineMessage)
          }



        },

        getTravel(line){
          this.lineMessage=line;
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.get("/line/getTimes?lineId=" + line.lineId)
            .then(successReqponse => {
              this.tableData=[];
              this.tableData = successReqponse.data.travel_times;
              this.rowNum=successReqponse.data.travel_times.length+1;
              this.oldNum=successReqponse.data.rowNum;
              console.log(this.rowNum)
              console.log(successReqponse.data.travel_times)
            })
            .catch(failRespose => {
              alert("页面加载错误！正在重新载入...");
              this.getTravel(lineId)
            })
        },
        getLine(line) {
          this.line = line;
          this.getImage(line.lineId);
        },
        getImage(lineId) {
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.get("/line/getImage?lineId=" + lineId)
            .then(successReqponse => {
              this.ImageList = [];
              this.ImageList = successReqponse.data.ImageList;
            })
            .catch(failRespose => {
              alert("页面加载错误！正在重新载入...");
              this.getImage(lineId)
            })
        },
        dataListFn: function (index) {
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.searchDate.pageIndex =index;
          this.$axios.post("line/list", qs.stringify(this.searchDate), config)
            .then(result => {
              var data = result.data;
              this.lineList = [];
              this.lineList = data.lineList;
              this.all = data.pageCount;//总页数
              this.totalCount = data.total;
              this.searchDate.searchTitle=data.searchTitle;
            })
            .catch(failResponse => {
              alert('数据加在错误...正在重新载入')
            })
        },
//分页
        btnClick: function (data) {//页码点击事件
          if (data != this.cur) {
            this.cur = data
          }
//根据点击页数请求数据
          this.dataListFn(this.cur.toString());
        },
        pageClick: function () {
//根据点击页数请求数据
          console.log(this.cur.toString());
          this.dataListFn(this.cur.toString());
        },
        init() {
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.searchDate.pageIndex = this.cur;
          this.$axios.post("line/list", qs.stringify(this.searchDate), config)
            .then(result => {
              var data = result.data;
              this.lineList = [];
              this.lineList = data.lineList;
              this.all = data.pageCount;//总页数
              this.totalCount = data.total;
              this.searchDate.searchTitle=data.searchTitle;
            })
            .catch(failResponse => {
              alert('数据加在错误...正在重新载入')
            })

        },
        delImg(fileId, index) {
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.$axios.post("line/delFile?fileId=" + fileId, config)
            .then(successResponse => {
              if (successResponse.data === "noLogin") {
                alert("没有登录")
                this.$router.replace({path: '/adminLogin'})
              } else {
                alert("删除成功")
                this.ImageList.splice(index, 1);
              }
            })
            .catch(failResponse => {
              alert("响应异常")
            })
        },
        del(lineId) {

          if (confirm("确实要删除吗？")) {
            var qs = require('querystring')
            let config = {
              header: {'Content-type': 'application/x-www-form-urlencoded'}
            };
            this.$axios.post("line/del?lineId=" + lineId, config)
              .then(successResponse => {
                if (successResponse.data === "noLogin") {
                  alert("没有登录")
                  this.$router.replace({path: '/adminLogin'})
                } else {
                  alert("删除成功")
                  this.$router.go(0)
                }
              })
              .catch(failResponse => {
                alert("响应异常")
              })
          } else {
            alert("已经取消了删除操作");
          }

        },
        subForm() {
          //获取输入框值
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          this.searchDate.pageIndex = 1;
          this.$axios.post("scenic/list", qs.stringify(this.searchDate), config)
            .then(result => {
              var data = result.data;
              this.lineList = [];
              this.lineList = data.lineList;
              this.all = data.pageCount;//总页数
              this.cur = data.pageIndex;
              this.totalCount = data.total;
              this.searchDate.searchTitle=data.searchTitle;
            })
            .catch(failResponse => {
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
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateY(-10px);
    opacity: 0;
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
