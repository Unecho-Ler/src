<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="系统参数"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input default-value="marserver" />
      </a-form-item>
      <a-form-item
        label="访问端口"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input default-value="80" />
      </a-form-item>
      <a-form-item
        label="系统保留内存"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input-number id="inputNumber" :default-value="1" :min="1" :max="10" @change="onChange" />
            GB
      </a-form-item>
      <a-form-item
        label="运行模式"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-select default-value="请选择运行模式" style="width: 100%" @change="handleChange">
              <a-select-option value="singl">
                单机运行
              </a-select-option>
              <a-select-option value="cluster_master">
                集群管理节点
              </a-select-option>
              <a-select-option value="cluster_storage">
                集群存储节点
              </a-select-option>
            </a-select>
            </a-select>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button  @click="prevStep">上一步</a-button>
        <a-button :loading="loading" type="primary" @click="nextStep" style="margin-left: 8px">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Step2',
  data () {
    return {
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      timer: 0
    }
  },
  methods: {
    nextStep () {
      this.$emit('nextStep')
    },
    prevStep () {
      this.$emit('prevStep')
    },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  }
}
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }

</style>
