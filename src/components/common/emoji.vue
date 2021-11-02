<template>
  <div>
    <div @click="handleShowClick" class="emotion-box">
      <slot>
        <span class="emotion">emotion</span>
      </slot>
      <div v-if="load" v-show="show" class="box">
      <span
        class="emo"
        v-for="(line, i) in emotionArr"
        :key="'emojo'+i"
        @click.stop="emoClick(line.name)"
        v-html="line.url"
      ></span>
      </div>
    </div>
  </div>

</template>

<script>
  import emotions from '@/assets/js/emotionList.js'
  export default {
    name: 'emotion-emoji',
    data() {
      return {
        show: false, // 是否展示表情框(表情盒子)
        load: false, // 是否加载了表情框
        emotionArr: null, //表情数组
      }
    },
    methods: {
      // 监听span点击来选择展示表情box
      handleShowClick() {
        // 当第一次点击展开在渲染表情盒子 懒加载
        if (this.load == false) this.loadEmotion()
        this.show = !this.show //切换表情盒子的展示状况
      },
      // 表情点击把名字发给父组件(调用者)
      emoClick(arg) {
        this.show = false // 关闭表情盒子
        let data = {
          emojiName: arg
        };
        this.$emit('emotionClick', data)
      },
      // 加载表情
      loadEmotion() {
        const list = emotions.emotionList
        let emotionArr = []
        list.map((item, index) => {
          emotionArr.push({
            name: `#${item};`,
            url: `<img style="display: inherit" title="${item}" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif">`,
          })
        })
        this.emotionArr = emotionArr
        this.load = true
        console.log('表情盒子加载完成')
      },
      processEmotion(str) {
        return str.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, (words) => {
          let word = words.replace(/\#|\;/gi, '')
          let index = emotions.emotionList.indexOf(word)
          if (index !== -1) {
            return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
          } else {
            return words
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .emotion-box {
    // 重要的就是加个相对定位
    display: inline-block;
    position: relative;
    > .emotion {
      cursor: pointer;
      height: 30px;
      user-select: none;
      line-height: 30px;
      padding: 2px 4px;
      border: 1px solid #9c9a9a;
      border-radius: 7px;
      margin-right: 5px;
      &:hover {
        background-color: aquamarine;
      }
    }
    // 重要的就是加个绝对定位 其他就是好看的
    > .box {
      z-index: 10;
      position: absolute;
      background-color: #fff;
      width: 285px;
      max-height: 150px;
      overflow: scroll;
      top: 30px;
      border: 1px solid aqua;
      // 每个span表情标签样式
      .emo {
        cursor: pointer;
      }
    }
  }
</style>
