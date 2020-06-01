<template>
  <a-modal
    title="添加容量"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
        <a-form-item
          label="识别码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
         <a-input v-decorator="['desc', {rules: [{required: true, min: 5, message: '请输入至少五个字符！'}]}]" />
        </a-form-item>
        <a-alert message="只能创建普通用户和巡检用户的类别" type="info" show-icon />
        <a-form-item
          label="角色类别"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
         <a-select style="width: 220px">
           <a-select-option :value="0">普通用户</a-select-option>
           <a-select-option :value="1">巡检用户</a-select-option>
         </a-select>
        </a-form-item>
        <a-form-item
          label="功能范围"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
        <a-checkbox-group @change="onChange">
    <a-row>
      <a-col :span="12">
        <a-checkbox value="A">
          资源管理
        </a-checkbox>
      </a-col>
      <a-col :span="12">
        <a-checkbox value="B">
          权限管理
        </a-checkbox>
      </a-col>
      <a-col :span="12">
        <a-checkbox value="C">
          日志管理
        </a-checkbox>
      </a-col>
      <a-col :span="12">
        <a-checkbox value="D">
          CDM 高级备份
        </a-checkbox>
      </a-col>
      <a-col :span="12">
        <a-checkbox value="E">
          CDP 持续数据保护
        </a-checkbox>
      </a-col>
      <a-col :span="12">
        <a-checkbox value="E">
          VTL 持续数据保护
        </a-checkbox>
      </a-col>
      <a-col :span="12">
        <a-checkbox value="E">
          SAN 存储
        </a-checkbox>
      </a-col>
      <a-col :span="12">
        <a-checkbox value="E">
          NAS 共享存储
        </a-checkbox>
      </a-col>
    </a-row>
  </a-checkbox-group>
        </a-form-item>
        <a-form-item
          label="操作权限"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
        <a-select style="width: 220px">
          <a-select-option :value="0">可操作</a-select-option>
          <a-select-option :value="1">仅查看</a-select-option>
        </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  name: 'AddSpaceForm',
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
