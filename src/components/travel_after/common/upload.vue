<template>
  <div>
    <div>
      <el-upload
        :multiple="multiple"
        action="/uploadPics"
        list-type="picture-card"
        :auto-upload="false"
        :http-request="uploadFile"
        ref="uploadPic"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <div>
      <center>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleAddSomePicsInfo = false">取 消</el-button>
                <el-button type="primary" @click="addSomePeoplePicsForm">下一步</el-button>
            </span>
      </center>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        multiple: true,
      }
    },
    methods: {
      uploadFile(file) {
        this.formData.append('file', file.file);
      },
      addSomePeoplePicsForm: function () {
        let self = this;
       // this.formPicsData = new FormData();
        this.$refs.uploadPic.submit();
        this.modalStatus2=false;
        /*var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.post("/scenic/upload", qs.stringify(self.formPicsData), config)
          .then(successReqponse => {
            alert("保存成功");
            this.$router.replace("/scenicList");
          })
          .catch(failRespose => {
            console.log("系统错误");
          })
        //this.$ajax.post这个地方需要在main.js进行简单配置
        this.$ajax.post("/uploadPics", this.formPicsData, config).then(res => {
          //TODO：具体自己逻辑部分
        }).catch(res => {
          this.$message.info("服务器走丢了!");
        });*/
      },
    }
  }
</script>

<style scoped>

</style>
