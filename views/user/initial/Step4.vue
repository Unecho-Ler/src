<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="管理口IP协议"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-select default-value="IPv4" style="width: 100%" @change="handleChange">
          <a-select-option value="IPv4">IPv4</a-select-option>
          <a-select-option value="IPv6">IPv6</a-select-option>
        </a-select>
      </a-form-item>
      <a-alert message="协议选择为v4时显示:IP地址/子网掩码/DNS设置开关" type="warning" show-icon />
      <a-form-item
        label="IP 地址"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input default-value="192.168.1.100" />
      </a-form-item>
      <a-form-item
        label="子网掩码"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input default-value="255.255.255.0" />
        <a-form-item
          label="DNS设置"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          class="stepFormText"
        >
          <a-switch checked-children="开" un-checked-children="关" default-checked />
        </a-form-item>
      <a-alert message="开启DNS设置的时候显示DNS清单" type="warning" show-icon />
      </a-form-item>
      <a-form-item
              label="DNS地址"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              class="stepFormText"
            >
            <a-input placeholder="input DNS address">
                    <a-icon slot="addonAfter" type="plus" />
                  </a-input>
          
              <a-textarea
                        rows="4"
                        placeholder="202.106.0.20
8.8.8.8
114.114.114"
                        v-decorator="[
                          'description',
                        ]" />
            </a-form-item>
            <a-alert message="协议选择为v6时显示:网关地址/IPv6地址/前缀长度" type="warning" show-icon />
            <a-form-item
              label="网关地址"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              class="stepFormText"
            >
              <a-input default-value="" />
            </a-form-item>
            <a-form-item
              label="IPv6地址"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              class="stepFormText"
            >
              <a-input default-value="" />
            </a-form-item>
            <a-form-item
              label="前缀长度"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              class="stepFormText"
            >
              <a-input-number id="inputNumber" default-value="64" :min="1" :max="128" @change="onChange" />
              
            </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button  @click="prevStep">上一步</a-button>
        <a-button :loading="loading" type="primary" @click="nextStep" style="margin-left: 8px">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'Step6',
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
    moment,
    nextStep () {
      this.$emit('nextStep')
    },
    prevStep () {
      this.$emit('prevStep')
    },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
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
