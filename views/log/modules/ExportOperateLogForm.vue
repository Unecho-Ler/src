<template>
  <a-modal
    title="导出日志"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="导出格式"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-select placeholder="请选择" default-value="0" style="width: 320px;">
            <a-select-option value="0">Text文件(*.txt)</a-select-option>
            <a-select-option value="1">CSV文件(*.csv)</a-select-option>
            <a-select-option value="2">XML文件(*.xml)</a-select-option>
            <a-select-option value="3">JSON文件(*.json)</a-select-option>
            <a-select-option value="4">Excel文件(*.xls)</a-select-option>
            <a-select-option value="5">Excel 2007 文件(*.xlsx)</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="开启加密"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-switch checked-children="开启" un-checked-children="关闭" undefault-checked />
    
        </a-form-item>
        <a-alert message="开启加密后显示输入密码的input" type="warning" show-icon />
        <a-form-item
          label="开启加密"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input type="password" placeholder="input password" />
    
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
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
