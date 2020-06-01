<template>
  <a-modal
    title="日志过滤"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="操作类型" 
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select placeholder="请选择" default-value="0">
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">登录</a-select-option>
            <a-select-option value="2">登出</a-select-option>
            <a-select-option value="3">操作-添加</a-select-option>
            <a-select-option value="4">操作-修改</a-select-option>
            <a-select-option value="4">操作-删除</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="日志类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-select placeholder="请选择" default-value="0">
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">正常</a-select-option>
            <a-select-option value="2">警告</a-select-option>
            <a-select-option value="3">错误</a-select-option>
            <a-select-option value="4">调试</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
        <a-form-item label="时间范围"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-range-picker
                :show-time="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
                :placeholder="['Start Time', 'End Time']"
                @ok="onOk"
              />
        </a-form-item>
        <a-form-item label="节点"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-tree-select
              v-model="value"
              style="width: 320px"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="treeData"
              placeholder="Please select"
              tree-default-unexpand-all
            >
            </a-tree-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  const treeData = [
    {
      title: '全部',
      value: '0-0',
      key: '0-0',
    },
    {
      title: '管理节点',
      value: '0-1',
      key: '0-1',
      children: [
        {
          value: '0-1-1',
          key: '0-1-1',
          title: '主管理节点',
        },
        {
          title: '备用管理节点-1',
          value: '0-1-2',
          key: '0-1-2',
        },
      ],
    },
    {
      title: '存储节点',
      value: '0-2',
      key: '0-2',
      children: [
        {
          value: '0-2-1',
          key: '0-2-1',
          title: '存储节点-1',
        },
        {
          title: '存储节点-2',
          value: '0-2-2',
          key: '0-2-2',
        },
      ],
    },
  ];
export default {
  data () {
    return {
      
      treeData,
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
