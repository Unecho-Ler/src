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
          label="选择节点"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
         <a-select style="width: 220px">
           <a-select-option :value="0">存储节点1</a-select-option>
           <a-select-option :value="1">存储节点2</a-select-option>
         </a-select>
        </a-form-item>
        <a-form-item
          label="所属功能"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
         <a-select style="width: 220px">
           <a-select-option :value="0">CDM 高级备份</a-select-option>
           <a-select-option :value="1">CDP 持续保护</a-select-option>
           <a-select-option :value="1">SAN 存储</a-select-option>
           <a-select-option :value="1">NAS 存储</a-select-option>
           <a-select-option :value="1">VTL 存储</a-select-option>
         </a-select>
        </a-form-item>
        <a-alert message="所属功能的下拉框内容应与授权中可用部分相同" type="info" show-icon />
        <a-form-item
          label="分配容量"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
        <a-input-number id="inputNumber" default-value="30" :min="1" :max="10" @change="onChange" />
         GB
        </a-form-item>
        <a-form-item
          label="启用容量"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
        <a-switch checked-children="启用" un-checked-children="禁用" undefault-checked />
        </a-form-item>
        <a-alert message="无论是否启用,后台容量均已同步分配" type="info" show-icon />
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
