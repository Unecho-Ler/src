<template>
  <a-modal
    title="删除XX节点存储池"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
        <a-alert message="新建卷组时仅显示未使用的磁盘" type="warning" show-icon />
        <a-form :form="form" >
          <a-form-item
            label="卷组名称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            style="margin-left: -85px;"
          >
           <a-input v-decorator="['desc', {rules: [{required: true, min: 5, message: '请输入至少五个字符！'}]}]" />
          </a-form-item>
          <a-form-item
            label="RAID模式"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            style="margin-left: -85px;"
          >
           <a-select defaultValue="RAID5" style="width: 220px;">
             <a-select-option value="RAID0">RAID0</a-select-option>
             <a-select-option value="RAID1">RAID1</a-select-option>
             <a-select-option value="RAID5">RAID5</a-select-option>
             <a-select-option value="RAID6">RAID6</a-select-option>
             <a-select-option value="RAID5+0">RAID5+0</a-select-option>
             <a-select-option value="RAID6+0">RAID6+0</a-select-option>
             <a-select-option value="三倍校验">三倍校验</a-select-option>
           </a-select>
          </a-form-item>
          <a-form-item
            label="选择磁盘"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            style="margin-left: -85px;"
          >
           <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="add_columns" :dataSource="replace_data"  />
          
          </a-form-item>
        </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  name: 'CreatePoolModal',
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
       add_columns:[
         {
           title: '磁盘名',
           dataIndex: 'disk_name',
         },
         {
           title: '位置',
           dataIndex: 'disk_loc',
         },
         {
           title: '容量',
           dataIndex: 'disk_vol',
         },
         {
           title: '接口',
           dataIndex: 'disk_inte',
         }
       ],
       replace_data:[
         {
           key: '1',
           disk_inte:'SATA',
           disk_vol:'6TB',
           disk_name: 'c0tAD00000500D60000d0',
           disk_loc: 'host-1-1'
         },
         {
           key: '2',
           disk_inte:'SATA',
           disk_vol:'6TB',
           disk_name: 'c0t50F000000C621972d0',
           disk_loc: 'Host-1-2'
         },
         {
           key: '3',
           disk_inte:'SATA',
           disk_vol:'6TB',
           disk_name: 'c0t500C500129730ABd0',
           disk_loc: 'JBod-1-1'
         },
         {
           key: '4',
           disk_inte:'SATA',
           disk_vol:'6TB',
           disk_name: 'c0t5000CCA224D3FF2Ed0',
           disk_loc: 'JBod-1-2'
         },
         {
           key: '5',
           disk_inte:'SATA',
           disk_vol:'6TB',
           disk_name: 'c0t5001CDB224D3FC2Ed0',
           disk_loc: 'JBod-2-1'
         }
       ],
      
      selectedRowKeys: [],
      selectedRows: [],
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
    onSelectChange (selectedRowKeys) {
          console.log('selectedRowKeys changed: ', selectedRowKeys);
          this.selectedRowKeys = selectedRowKeys
        },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
