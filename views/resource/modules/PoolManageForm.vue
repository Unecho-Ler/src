<template>
  <a-modal :width="800" :visible="visible" title="XXX卷磁盘管理" @ok="handleSubmit" @cancel="visible = false">
     <template>
       <a-table :columns="disk_columns" :dataSource="disk_data" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
         <span slot="status" slot-scope="text">
           <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
         </span>
         <span slot="action" slot-scope="text, record">
           <span v-if="record.disk_type === '数据盘'">
              <a @click="$refs.replacediskForm.add()">替换</a>
           </span>
           <span v-else-if="record.disk_type === '热备盘'">
             <span v-if="record.id > 5 ">
                <a @click="$refs.deleteModal.del()">移除</a>
             </span>
             <span v-else>
                 <a-popconfirm title="是否要移除此热备盘？" @confirm="remove(record.id)">
                   <a>移除</a>
                 </a-popconfirm>
             </span> 
            </span> 
             <span v-else-if="record.disk_type === '读缓存'">
               <span v-if="record.id > 5 ">
                <a @click="$refs.deleteModal.del()">移除</a>
               </span>
               <span v-else>
                   <a-popconfirm title="是否要移除此读缓存盘？" @confirm="remove(record.id)">
                     <a>移除</a>
                   </a-popconfirm>
               </span> 
              </span> 
             <span v-else-if="record.disk_type === '写缓存'">
               <span v-if="record.id > 5 ">
                  <a @click="$refs.deleteModal.del()">移除</a>
               </span>
               <span v-else>
                   <a-popconfirm title="是否要移除此写缓存盘？" @confirm="remove(record.id)">
                     <a>移除</a>
                   </a-popconfirm>
               </span> 
             </span> 
           <span v-if="record.status > 2">
             <a-divider type="vertical" />
             <span v-if="record.id < 3" >
               <a @click="$refs.deleteModal.del()" disabled="true">移除</a>
             </span>
             <span v-else>
               <a-popconfirm title="是否要移除此故障盘？" @confirm="remove(record.id)">
                 <a>移除</a>
               </a-popconfirm>
             </span> 
           </span>
         </span>
       </a-table>
       <div>
         <a-alert message="点击替换时,显示以下表格,选中对应硬盘后,点击替换按钮完成替换" type="warning" show-icon />
         <a-divider />
         <a-table :columns="disk_columns" :dataSource="disk_data" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
           <span slot="action" slot-scope="text, record">
             <a-popconfirm title="是否要替换选中磁盘？" @confirm="remove(record.id)">
               <a>替换</a>
             </a-popconfirm>
             </span>
           </a-table>
       </div>
       </template>
      </a-modal>
</template>

<script>
export default {
  name: 'TaskForm',
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
      disk_columns:[
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '类别',
          dataIndex: 'disk_type'
        },
        {
          title: '磁盘名',
          dataIndex: 'disk_name'
        },
        {
          title: '位置',
          dataIndex: 'disk_loc'
        },
        {
          title: '容量',
          dataIndex: 'disk_vol'
        },
        {
          title: '接口',
          dataIndex: 'disk_inte'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      disk_data:[
        {
          key: '1',
          status: '3',
          disk_type:'数据盘',
          disk_inte:'SATA',
          disk_vol:'6TB',
          disk_name: 'c0tAD00000500D60000d0',
          disk_loc: 'host-1-1'
        },
        {
          key: '2',
          status: '1',
          disk_type:'数据盘',
          disk_inte:'SATA',
          disk_vol:'6TB',
          disk_name: 'c0t50F000000C621972d0',
          disk_loc: 'Host-1-2'
        },
        {
          key: '3',
          status: '1',
          disk_type:'数据盘',
          disk_inte:'SATA',
          disk_vol:'6TB',
          disk_name: 'c0t500C500129730ABd0',
          disk_loc: 'JBod-1-1'
        },
        {
          key: '4',
          status: '1',
          disk_type:'数据盘',
          disk_inte:'SATA',
          disk_vol:'6TB',
          disk_name: 'c0t5000CCA224D3FF2Ed0',
          disk_loc: 'JBod-1-2'
        },
        {
          key: '5',
          status: '1',
          disk_type:'热备盘',
          disk_inte:'SATA',
          disk_vol:'6TB',
          disk_name: 'c0t5001CDB224D3FC2Ed0',
          disk_loc: 'JBod-2-1'
        },
        {
          key: '6',
          status: '1',
          disk_type:'读缓存',
          disk_inte:'SSD',
          disk_vol:'480GB',
          disk_name: 'c0t5001CDB224D3FC2Ed0',
          disk_loc: 'JBod-2-1'
        },
        {
          key: '7',
          status: '1',
          disk_type:'写缓存',
          disk_inte:'SSD',
          disk_vol:'480GB',
          disk_name: 'c0t5001CDB224D3FC2Ed0',
          disk_loc: 'JBod-2-1'
        }
      ],
      
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
