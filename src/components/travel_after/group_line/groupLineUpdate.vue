<template>
  <div >
    <VNav></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">新增旅行团路线</h2>

        </div>
        <div style="border: gainsboro 1px solid;margin-top: 2%;margin-bottom: 2%">
          <h2 style="margin-left: 2%">路线信息</h2>
          <table style="width: 100%;margin-left: 2%">
            <tr>
              <td style="width: 50%">
                <label style="width: 90px">线路名称: &nbsp;</label>
                <el-input type="text" style="width: 60%"  v-model="lineName" v-on:focus="lineName1" v-on:input="lineName1"></el-input>
                <div style="margin-top: 1%" v-show="lineShow">
                  <div class="el-select-dropdown el-popper"
                       style="min-width: 195.6px; position: absolute; transform-origin: center top 0px; z-index: 2007;"
                       x-placement="bottom-start">
                    <div class="el-scrollbar" style="">
                      <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
                        <ul class="el-scrollbar__view el-select-dropdown__list"><!---->
                          <li class="el-select-dropdown__item" v-for="(item,index) in selectLine" :key="index" v-on:click="setLineVal(item)">{{item.lineTitle}}</li>
                        </ul>
                      </div>
                      <div class="el-scrollbar__bar is-horizontal">
                        <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
                      </div>
                      <div class="el-scrollbar__bar is-vertical">
                        <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
                      </div>
                    </div><!---->
                    <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
                  </div>
                </div>
              </td>
              <td style="width: 50%" >
                <label style="width: 90px">目的景点: &nbsp;</label>
                <el-input  type="text" style="width: 60%"  readonly="readonly" v-model="lines.scenicName"></el-input>
              </td>
            </tr>
            <tr style="">
              <td>
                <label style="width: 90px">目的城市: &nbsp;</label>
                <el-input type="text" style="width: 60%;margin-top: 2%"  readonly="readonly" v-model="lines.cityName"></el-input>
              </td>
              <td>
                <label style="width: 90px">旅行时间: &nbsp;</label>

                <el-input type="text" style="width: 60%;margin-top: 2%"  readonly="readonly" v-model="lines.lineTotalTime" ></el-input>
              </td>
            </tr>
            <tr>
              <td>
                <label style="width: 90px">价&nbsp;&nbsp;&nbsp;&nbsp;格: &nbsp;</label>
                <el-input type="text" style="width: 60%;margin-top: 2%"  readonly="readonly" v-model="lines.linePrice"></el-input>
              </td>
              <td>
                <label style="width: 90px">描述</label>
                <el-input type="text" style="width: 60%;margin-top: 2%" readonly="readonly" v-model="lines.lineDescription"></el-input>
              </td>
            </tr>
            <tr>
              <td>
                <label style="width: 90px">主题</label>
                <el-input type="text" style="width: 60%;margin-top: 2%" v-model="lines.themeName" readonly="readonly"></el-input>
              </td>
              <td>
                <label style="width: 90px">创建时间</label>
                <el-input  prop="lineCreatTime" style="width: 60%;margin-top: 2%" readonly="readonly" v-model="lines.lineCreatTime"  ></el-input>
              </td>
            </tr>
          </table>
          <p>&nbsp;</p>
        </div>
        <div style="border: gainsboro 1px solid;margin-top: 2%">
          <h2 style="margin-left: 2%">旅行团信息</h2>
          <table style="width: 100%;margin-left: 2%">
            <tr>
              <td style="width: 50%">
                <label style="width: 90px">旅行团</label>
                <el-input type="text" style="width: 60%;margin-top: 2%"  v-model="groupName" v-on:focus="groupName1" v-on:input="groupName1"></el-input>
                <div style="margin-top: 1%" v-show="groupShow">
                  <div class="el-select-dropdown el-popper"
                       style="min-width: 195.6px; position: absolute; transform-origin: center top 0px; z-index: 2007;"
                       x-placement="bottom-start">
                    <div class="el-scrollbar" style="">
                      <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
                        <ul class="el-scrollbar__view el-select-dropdown__list"><!---->
                          <li class="el-select-dropdown__item" v-for="(item,index) in selectGroup" :key="index" v-on:click="setGroupVal(item)">{{item.groupName}}</li>
                        </ul>
                      </div>
                      <div class="el-scrollbar__bar is-horizontal">
                        <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
                      </div>
                      <div class="el-scrollbar__bar is-vertical">
                        <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
                      </div>
                    </div><!---->
                    <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
                  </div>
                </div>
              </td>
              <td style="width: 50%">
                <label style="width: 90px">旅行团名称</label>
                <el-input type="text" style="width: 60%;margin-top: 2%" v-model="groups.groupName" readonly="readonly"></el-input>
              </td>
            </tr>
            <tr>
              <td>
                <label style="width: 90px">旅行团描述</label>
                <el-input type="text" style="width: 60%;margin-top: 2%" readonly="readonly" v-model="groups.groupDes"></el-input>
              </td>
              <td>
                <label style="width: 90px">创建时间</label>
                <el-input type="text" style="width: 60%;margin-top: 2%" readonly="readonly" v-model="groups.groupCeatetime"></el-input>
              </td>
            </tr>
          </table>
          <p>&nbsp;</p>
        </div>
        <div style="border: gainsboro 1px solid;margin-top: 2%">
          <h2 style="margin-left: 2%">导游信息</h2>
          <table style="width: 100%;margin-left: 2%">
            <tr>
              <td style="width: 50%">
                <label style="width: 90px">导游</label>
                <el-input type="text" style="width: 60%;margin-top: 2%" v-model="leaderName" v-on:focus="leaderName1" v-on:input="leaderName1"></el-input>
                <div style="margin-top: 1%" v-show="leaderShow">
                  <div class="el-select-dropdown el-popper"
                       style="min-width: 195.6px; position: absolute; transform-origin: center top 0px; z-index: 2007;"
                       x-placement="bottom-start">
                    <div class="el-scrollbar" style="">
                      <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
                        <ul class="el-scrollbar__view el-select-dropdown__list"><!---->
                          <li class="el-select-dropdown__item" v-for="(item,index) in selectLeader" :key="index" v-on:click="setLeaderVal(item)">{{item.leaderName}}</li>
                        </ul>
                      </div>
                      <div class="el-scrollbar__bar is-horizontal">
                        <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
                      </div>
                      <div class="el-scrollbar__bar is-vertical">
                        <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
                      </div>
                    </div><!---->
                    <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
                  </div>
                </div>
              </td>
              <td style="width: 50%">
                <label style="width: 90px">年龄</label>
                <el-input readonly="readonly" style="width: 60%;margin-top: 2%" type="text" v-model="leaders.leaderAge"></el-input>
              </td>
            </tr>
            <tr>
              <td>
                <label style="width: 90px">性别</label>
                <span v-if="leaders.leaderSex===1"> <el-input style="font-weight: 100;width: 60%;margin-top: 2%" readonly="readonly" value="女"></el-input></span>
                <span v-else-if="leaders.leaderSex===2"> <el-input style="font-weight: 100;width: 60%;margin-top: 2%" readonly="readonly" value="男"></el-input></span>
                <span v-else> <el-input style="font-weight: 100;width: 60%;margin-top: 2%" readonly="readonly" value=""></el-input></span>

              </td>
              <td>
                <label style="width: 90px">联系方式</label>
                <el-input type="text" readonly="readonly" style="width: 60%;margin-top: 2%" v-model="leaders.leaderTel"></el-input>
              </td>
            </tr>
          </table>
          <p>&nbsp;</p>
        </div>
        <form style="margin-top: 2%;border: gainsboro 1px solid" class="form-horizontal" role="form" onsubmit="return false;" id="form1">
          <div style="margin-left: 15%;">
            <div class="form-group" style="margin-top: 2%">
              <label class="col-sm-2 control-label">出发日期</label>
              <div class="col-sm-10">
                <el-date-picker type="datetime"  v-model="lineGroup.lineStartTime" placeholder="选择出发时间" value-format="yyyy-MM-dd HH:mm:ss"    style="width: 60%;"></el-date-picker>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">价格</label>
              <div class="col-sm-3">
                <el-input type="text" style="width: 60%" id="price" name="price" placeholder="产品价格" v-model="lineGroup.linePrice"
                          required="required"/>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label"> 限制人数</label>
              <div class="col-sm-10">
                <el-input type="text" style="width: 60%" name="description" v-model="lineGroup.linePeople" placeholder="限制人数" required="required" ></el-input>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <input type="submit" class="btn btn-default" @click="sub()">
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  import VNav from "@/components/travel_after/common/nav";

  export default {
    name: "line_groupAdd",
    data() {

      return {
        formData: "",
        isSelectFile: false,
        imgUrl: "",
        photo: '',
        modalStatus2: false,
        modalStatus: false,
        m_title: "添加景点图片",
        m_content: "我是首页的内容",
        lineGroup:[],
        travelTimes:[],
        groupList:[],
        LineList:[],
        leaderList:[],
        lines:[],
        leaders:[],
        groups:[],
        lineName:'',
        lineShow:false,
        selectLine:[],
        groupName:'',
        groupShow:false,
        selectGroup:[],
        leaderName:'',
        leaderShow:false,
        selectLeader:[],
        ImageList:[],
        isshow: false,
        cityShow: false,
        selectCitys: [],
        selectProvince: [],
        provinceName: '',
        provinceList: [],
        cityList: [],
        cityName: '',
        line_groupId:'',
        btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
      }

    },
    components: {
      VNav
    },
    mounted:function(){
      this.getThemes();
    },
    watch:{

    },
    methods: {
      provinceName1: function () {
        this.isshow = true;
        if (this.provinceName.length === 0) {
          this.selectProvince = this.provinceList
        } else {

          var citys = []
          this.provinceList.forEach((item, index) => {
            if (item.provinceName.indexOf(this.provinceName) >= 0) {
              citys.unshift(item)
            }
          })
          this.selectProvince = citys;
        }
      },
      setVal(item) {
        this.provinceId=item.provinceId
        this.provinceName = item.provinceName;
        this.isshow = false;
        this.changeCity();
      },
      setCityVal(item) {
        this.lineGroup.cityId = item.cityId;
        this.cityName = item.cityName;
        this.cityShow = false
      },
      cityName1: function () {
        this.cityShow = true;
        if (this.cityName.length === 0) {
          this.selectCitys =  this.cityList;
        } else {

          var citys = [];
          this.cityList.forEach((item, index) => {
            if (item.cityName.indexOf(this.cityName) >= 0) {
              citys.unshift(item)
            }
          })
          this.selectCitys = citys;
        }
      },
      lineName1(){
        this.lineShow = true;
        if (this.lineName.length === 0) {
          this.selectLine = this.lineList
        } else {
          this.lineShow = true;
          var citys = [];
          this.lineList.forEach((item, index) => {
            if (item.lineTitle.indexOf(this.lineName) >= 0) {
              citys.unshift(item)
            }
          })
          this.selectLine = citys;
        }
      },
      groupName1(){
        this.groupShow = true;
        if (this.groupName.length === 0) {
          this.selectGroup=this.groupList
        } else {
          var citys = [];
          this.groupList.forEach((item, index) => {
            if (item.groupName.indexOf(this.groupName) >= 0) {
              citys.unshift(item)
            }
          })
          this.selectGroup = citys;
        }
      },
      leaderName1(){
        this.leaderShow = true;
        if (this.leaderName.length === 0) {
          this.selectLeader=this.leaderList;
        } else {
          var citys = [];
          this.leaderList.forEach((item, index) => {
            if (item.leaderName.indexOf(this.leaderName) >= 0) {
              citys.unshift(item)
            }
          })
          this.selectLeader = citys;
        }
      },
      setLineVal(item) {
        this.lineGroup.lineId = item.lineId;
        this.lineName = item.lineTitle;
        this.lines=item;
        this.lineShow = false
      },
      setGroupVal(item) {
        this.lineGroup.groupId = item.groupId;
        this.groupName = item.groupName;
        this.groups=item;
        this.groupShow = false;
        this.changeGroup();
      },
      setLeaderVal(item) {
        this.lineGroup.leaderId = item.leaderId;
        this.leaderName = item.leaderName;
        this.leaders=item;
        this.leaderShow = false
      },
      getThemes:function(){
        this.line_groupId=this.$route.query.line_groupId;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/line_group/update_init?line_groupId="+this.line_groupId)
          .then(successReqponse => {
            this.lineList=successReqponse.data.lineList;
            this.groupList=successReqponse.data.groupList;
            this.lineGroup=successReqponse.data.line_group;
            this.lines=successReqponse.data.lines;
            this.groups=successReqponse.data.groups;
            this.leaders=successReqponse.data.leaders;
            this.lineName=this.lines.lineTitle;
            this.groupName=this.groups.groupName;
            this.leaderName=this.leaders.leaderName;
            this.provinceList=successReqponse.data.provinceList;
            this.provinceName=this.lineGroup.provinceName;
            this.cityName=this.lineGroup.cityName;

          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
           // this.$router.replace({path:"/groupLineUpdate",query:{line_groupId:this.line_groupId}});
          })

      },
      changeGroup(){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/line_group/getgroup?groupId="+this.lineGroup.groupId)
          .then(successReqponse => {
            if(successReqponse.data.Message==="error"){
              alert(successReqponse.data.ERROR);

            }
            else{
              if(successReqponse.data.leaderList.length===0){
                alert("没有数据！");
              }
              else {
                this.leaderList=[];
                this.leaderList=successReqponse.data.leaderList;
                this.groups=successReqponse.data.group;
              }
            }
          })
          .catch(failRespose => {
            console.log("数据加载错误！正在重新载入...");
            this.$router.replace("/line_groupAdd");
          })
      },

      sub() {

        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.post("/line_group/update", qs.stringify(this.lineGroup), config)
          .then(successReqponse => {
            alert("保存成功");
            this.$router.replace("/groupLineList");
          })
          .catch(failRespose => {
            console.log("系统错误");
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
