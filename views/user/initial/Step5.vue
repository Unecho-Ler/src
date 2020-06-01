<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="NTP服务"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-switch checked-children="开" un-checked-children="关" default-unchecked />
      </a-form-item>
      <a-alert message="NTP服务器关闭的时候显示以下内容" type="warning" show-icon />
      <a-form-item
        label="系统时间"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-date-picker :default-value="moment('2020/05/30', dateFormat)" :format="dateFormat" />
        <a-time-picker :default-value="moment('12:08:23', 'HH:mm:ss')" />
    
      </a-form-item>
      <a-form-item
        label="所在时区"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-select default-value="UTC+8:00 北京" style="width: 100%" @change="handleChange">  
        <a-select-option value="UTC+4:00 莫斯科">UTC+4:00 莫斯科</a-select-option>
        <a-select-option value="UTC+5:00 伊斯兰堡">UTC+5:00 伊斯兰堡</a-select-option>
        <a-select-option value="UTC+6:00 阿斯塔纳">UTC+6:00 阿斯塔纳</a-select-option>
        <a-select-option value="UTC+7:00 曼谷">UTC+7:00 曼谷</a-select-option>
        <a-select-option value="UTC+8:00 北京">UTC+8:00 北京</a-select-option>
        <a-select-option value="UTC+9:00 东京">UTC+9:00 东京</a-select-option>
        </a-select>
      </a-form-item>
      <a-alert message="NTP服务器开启的时候显示以下内容" type="warning" show-icon />
      
      <a-form-item
        label="NTP服务器"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
      <a-input placeholder="input NTP server">
              <a-icon slot="addonAfter" type="plus" />
            </a-input>
    
        <a-textarea
                  rows="4"
                  placeholder="1.cnpool.ntp.org
1.asia.pool.net.org
0.asia.pool.net.org"
                  v-decorator="[
                    'description',
                  ]" />
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
