<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="Samba服务"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-switch checked-children="开" un-checked-children="关" default-checked />
      </a-form-item>
      <a-alert message="Samba服务器开启的时候显示设置Samba版本" type="warning" show-icon />
      <a-form-item
        label="Samba版本"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-select default-value="3.0" style="width: 100%" @change="handleChange">
          <a-select-option value="3.0">3.0</a-select-option>
          <a-select-option value="2.1">2.1</a-select-option>
          <a-select-option value="2.0">2.0</a-select-option>
          <a-select-option value="1.0">1.0</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="NFS服务"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-switch checked-children="开" un-checked-children="关" default-checked />
      </a-form-item>
      <a-alert message="NFS服务器开启的时候显示设置NFS版本" type="warning" show-icon />
      <a-form-item
        label="NFS版本"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-select default-value="4.0" style="width: 100%" @change="handleChange">
          <a-select-option value="4.0">4.0</a-select-option>
          <a-select-option value="3.0">3.0</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="SSH服务"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-switch checked-children="开" un-checked-children="关" default-checked />
      </a-form-item>
      <a-form-item
        label="Initiator服务"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-switch checked-children="开" un-checked-children="关" default-checked />
      </a-form-item>
      <a-form-item
        label="MBA服务"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-switch checked-children="开" un-checked-children="关" default-unchecked />
      </a-form-item>
      <a-alert message="在初始设置时,选择开启MBA服务则同步开启:主控制器,数据迁移器,设备控制器,文件代理,PostgreSQL代理" type="warning" show-icon />
      <a-alert message="在开启MBA服务时,强制开启系统数据库服务" type="warning" show-icon />
      <a-form-item
        label="系统数据库"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-switch checked-children="开" un-checked-children="关" default-unchecked />
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
