<template>
  <a-modal
    title="修改XX节点IP地址"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="选择网卡"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
         <a-select>
           <a-select-option :value="0">1号网口</a-select-option>
           <a-select-option :value="1">2号网口</a-select-option>
           <a-select-option :value="2">3号网口</a-select-option>
           <a-select-option :value="3">4号网口</a-select-option>
         </a-select>
        </a-form-item>
        <a-form-item
          label="IP地址"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
         <a-input v-decorator="['desc', {rules: [{required: true, min: 5, message: '请输入至少五个字符！'}]}]" />
        </a-form-item>
        <a-form-item
          label="子网掩码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
         <a-input v-decorator="['desc', {rules: [{required: true, min: 5, message: '请输入至少五个字符！'}]}]" />
        </a-form-item>
        <a-form-item
          label="启用DNS"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
        <a-switch checked-children="启用" un-checked-children="禁用" undefault-checked />
        </a-form-item>
        <a-form-item
          label="DNS地址"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
         <a-input v-decorator="['desc', {rules: [{required: true, min: 5, message: '请输入至少五个字符！'}]}]" />
         <a-alert message="多个DNS以','隔开" type="info" show-icon />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  name: 'ModifyIpForm',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,

      form: this.$form.createForm(this)
    }
  },
  methods: {
    add () {
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
