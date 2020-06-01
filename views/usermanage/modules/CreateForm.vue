<template>
  <a-modal
    title="新建分组"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="用户组名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['desc', {rules: [{required: true, min: 5, message: '请输入至少五个字符！'}]}]" />
        </a-form-item>
        <a-form-item
          label="用户角色"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-checkbox-group @change="onChange">
            <a-row>
              <a-col :span="12">
                <a-checkbox value="A">
                  系统管理员
                </a-checkbox>
              </a-col>
              <a-col :span="12">
                <a-checkbox value="B">
                  安全保密管理员
                </a-checkbox>
              </a-col>
              <a-col :span="12">
                <a-checkbox value="C">
                  审计员
                </a-checkbox>
              </a-col>
              <a-col :span="12">
                <a-checkbox value="D">
                  接口用户
                </a-checkbox>
              </a-col>
              <a-col :span="12">
                <a-checkbox value="E">
                  普通用户
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item
          label="备注"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input/>
        </a-form-item>
        <a-form-item
          label="状态"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-switch checked-children="启用" un-checked-children="禁用" undefault-checked />
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
