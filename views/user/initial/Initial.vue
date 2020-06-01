<template>
  <a-card :bordered="false">
    <a-steps class="steps" :current="currentTab">
      <a-step title="输入注册码" />
      <a-step title="系统参数设置" />
      <a-step title="系统服务设置" />
      <a-step title="管理网口IP设置" />
      <a-step title="系统时间设置" />
      <a-step title="完成" />
    </a-steps>
    <div class="content">
      <step1 v-if="currentTab === 0" @nextStep="nextStep"/>
      <step2 v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep"/>
      <step3 v-if="currentTab === 2" @nextStep="nextStep" @prevStep="prevStep"/>
      <step4 v-if="currentTab === 3" @nextStep="nextStep" @prevStep="prevStep"/>
      <step5 v-if="currentTab === 4" @nextStep="nextStep" @prevStep="prevStep"/>
      <step6 v-if="currentTab === 5" @prevStep="prevStep" @finish="finish"/>
    </div>
  </a-card>
</template>

<script>
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'

export default {
  name: 'StepForm',
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6
  },
  data () {
    return {
      description: '将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。',
      currentTab: 0,

      // form
      form: null
    }
  },
  methods: {

    // handler
    nextStep () {
      if (this.currentTab < 5) {
        console.log(this.currentTab)
        this.currentTab += 1
      }
    },
    prevStep () {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish () {
      this.currentTab = 0
    }
  }
}
</script>

<style lang="less" scoped>
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
</style>
