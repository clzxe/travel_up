<template>
  <div id="app">
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">

        </div>

        <div id="content">
          <div class="custom-made">

            <div class="cus-tourism-list">

              <div class="tourism-custom J_travel">

                <form  method="post" name="travel-cus" class="cusForm">
                  <h1>线路</h1>
                  <ul class="cus-table">
                    <li>
                      <label>线路名称：</label>
                      <div class="cus-mold">
                        <label>{{line.lineName}}</label>
                      </div>
                    </li>
                    <li>
                      <label>线路描述：</label>
                      <label>{{line.lineDescription}}</label>

                    </li>

                    <li>
                      <label>景点：</label>
                      <label>{{line.scenicName}}</label>

                    </li>
                    <li>
                      <label>  出发城市：</label>
                      <label>{{line.lineStartCity}}</label>
                    </li>
                    <li>
                      <label>  旅游时间：</label>
                      <label>{{line.lineTotalTime}}</label>
                    </li>
                    <li>
                      <label>  主题：</label>
                      <label>{{line.themeName}}</label>
                    </li>

                    <li>
                      <label>  价格：</label>
                      <label>{{line.linePrice}}</label>
                    </li>

                    <li>
                      <label>创建时间：</label>
                      <label>{{line.lineCreatTime}}</label>

                    </li>

                    <li>
                      <label>线路封面图片：</label>
                      <label> <el-image :src="require(line.linePhoto)"></el-image></label>

                    </li>
                    <li>
                      <label>线路图片：</label>
                      <label><a @click="modalStatus2=true">查看图片</a>
                        <div v-show="modalStatus2" class="form-group" style="padding-top: 40px;">
                          <transition name="slide-fade">
                            <div >
                              <slot>　　
                                <table>
                                  <thead>
                                  <tr>
                                    <td>编号</td>
                                    <td>图片</td>
                                  </tr>
                                  </thead>
                                  <tbody v-for="(lineImg,index) in ImageList">
                                  <tr>
                                    <td>
                                      {{index+1}}
                                    </td>
                                    <td>
                                      <el-image :src="require(lineImg.img)"></el-image>
                                    </td>
                                  </tr>
                                  </tbody>
                                </table>
                              </slot>
                            </div>
                          </transition>


                        </div></label>
                    </li>
                    <li>
                      <div class="form-group" style="padding-top: 40px;">
                        <label class="col-md-2 control-label">行程安排</label>
                        <transition name="slide-fade">
                          <v-modal v-show="modalStatus" :title="m_title" :btnType="btnType">
                            <slot>　　
                              <button @click="modalStatus=false"></button>
                              <div class="tableDate">
                                <div class="button" style="width:6%;float:right;">
                                  <P><el-button class="el-icon-plus" @click.prevent="addRow()"></el-button></P>
                                  <p><el-button class="el-icon-minus" @click.prevent="delData()"></el-button></p>
                                </div>
                                <div class="table">
                                  <el-table
                                    :data="tableData"
                                    ref="table"
                                    tooltip-effect="dark"
                                    border
                                    stripe
                                    style="width: 93%"
                                    @selection-change='selectRow' v-for="(time,index) in tableData">
                                    <el-table-column type="selection" width="45" align="center"></el-table-column>
                                    <el-table-column label="序号"   width="60" align="center">
                                      <el-input prop="rowNum" class="rowNum" type="hidden" v-model="time.rowNum"   ></el-input>
                                    </el-table-column>
                                    <el-table-column  label="时间" align="center">
                                      <template slot-scope="scope">
                                        <el-input prop="travelTimeId" class="travelTimeId" type="hidden" v-model="time.travelTimeId"   ></el-input>
                                        <el-input prop="travelTimeTime" class="post_name" v-model="time.travelTimeTime"   ></el-input>
                                        <!--<el-input v-model="scope.row.post_id"></el-input>-->
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="餐饮">
                                      <template slot-scope="scope">
                                        <el-input class="require_des" v-model="time.travelTimeFood"></el-input>
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="活动">
                                      <template slot-scope="scope">
                                        <el-input type="textarea" class="remark" v-model="time.travelTimeActivity"></el-input>
                                      </template>
                                    </el-table-column>
                                    <el-table-column label="住宿">
                                      <template slot-scope="scope">
                                        <el-input type="textarea" class="remark" v-model="time.travelTimeHotel"></el-input>
                                      </template>
                                    </el-table-column>

                                  </el-table>
                                  <el-button  @click="setData()"></el-button>
                                  <el-button  @click="modalStatus=false"></el-button >
                                </div>
                              </div>
                            </slot>
                          </v-modal>
                        </transition>
                        <button @click="openHomeModal()">查看行程</button>

                      </div>
                    </li>
                  </ul>


                </form>
                <span v-on:click="back">返回</span>

              </div>



            </div>

          </div>

        </div>
        <!--content end-->
      </div>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  import Modal from "@/components/travel_after/common/modal.vue";
  export default {
    name: "lineView",
    data() {

      return {
        tableData: [],
        isSelectFile: false,
        imgUrl: "",
        lineId:'',
        photo: '',
        modalStatus2: false,
        modalStatus: false,
        m_title: "添加线路图片",
        m_content: "我是首页的内容",
        travelTimes:[],
        line:[],
        ImageList:[],
        provinceList:[],
        cityList:[],
        btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
      }

    },
    components: {
      "v-modal": Modal,
      "v-upload1": upload
    },
    create:function(){
      this.getThemes();
    },
    methods: {
      getThemes:function(){
        this.lineId=this.$route.query.lineId;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/line/getline?lineId="+this.lineId)
          .then(successReqponse => {
           // this.themes=successReqponse.data.themes;
            this.line=successReqponse.data.line;
            this.imgUrl = "data:image/png;base64," + successReqponse.data.line.linePhoto;
            this.ImageList=successReqponse.data.ImageList;
            this.tableData=successReqponse.data.travelTimes;
            //this.provinceList=successReqponse.data.provinceList;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            this.$router.replace("/line/update?lineId="+this.lineId);
          })

      },
      changeCity:function(){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/line/getCityList?provinceId="+this.lineMessage.lineProvince)
          .then(successReqponse => {
            if(successReqponse.data.cityList.length===0){
              alert("没有数据！");
            }
            else {
              this.cityList=[];
              this.cityList=successReqponse.data.cityList;
            }

          })
          .catch(failRespose => {
            console.log("数据加载错误！正在重新载入...");
            this.$router.replace("/lineAdd");
          })
      },
      openImg() {
        this.$refs.input.click();
      },
      openHomeModal() {
        this.modalStatus = true;
      },
      back(){
        this.$router.go(-1);//返回上一层
      }

    }
  }

</script>

<style scoped>

</style>
