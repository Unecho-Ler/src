<template>
  <a-modal :width="640" :visible="visible" title="任务添加" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="节点名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['taskName', {rules:[{required: true, message: '请输入节点名称'}]}]" />
      </a-form-item>
      <a-form-item
        label="IP地址"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['taskName', {rules:[{required: true, message: '请输入节点IP地址'}]}]" />
      </a-form-item>
      
      <a-alert message="新添加的管理节点默认就是备用节点" type="warning" show-icon />
      <a-alert message="存储节点默认添加时,类型即为存储节点" type="warning" show-icon />
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'AddNodeForm',
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
      form: this.$form.createForm(this)
    }
  },
  methods: {
    add () {
      this.visible = true
    },
    edit (record) {
      const { form: { setFieldsValue } } = this
      this.visible = true
      this.$nextTick(() => {
        setFieldsValue({ taskName: 'test' })
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.visible = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
        }
      })
    }
  }
}
</script>
