<template>
  <a-modal
      :width="660" :visible="visible" title="添加缓存盘(应自动列出同规格可用的磁盘)" @ok="handleSubmit" @cancel="visible = false">
        <template>
          <a-table :columns="replace_columns" :dataSource="cache_data">
            <span slot="action" slot-scope="text, record">
              <a-dropdown>
                  <a> 添加<a-icon type="down" /> </a>
                <a-menu>
                  <a-menu-item>
                    <a-popconfirm title="是否确定使用该硬盘作为写缓存？" >
                      <a>添加为写缓存</a>
                    </a-popconfirm>
                  </a-menu-item>
                  <a-menu-item>
                    <a-popconfirm title="是否确定使用该硬盘作为读缓存？">
                      <a>添加为读缓存</a>
                    </a-popconfirm>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </span>
          </a-table>
        </template>
      </a-modal>
</template>

<script>
export default {
  name: 'AddCacheToPoolForm',
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
      replace_columns:[
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
          width: '60px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      
      cache_data:[
        {
          key: '1',
          disk_inte:'SSD',
          disk_vol:'480GB',
          disk_name: 'c0tAD00000500D60000d0',
          disk_loc: 'host-1-1'
        },
        {
          key: '2',
          disk_inte:'SSD',
          disk_vol:'480GB',
          disk_name: 'c0t50F000000C621972d0',
          disk_loc: 'Host-1-2'
        },
        {
          key: '3',
          disk_inte:'SSD',
          disk_vol:'480GB',
          disk_name: 'c0t500C500129730ABd0',
          disk_loc: 'JBod-1-1'
        },
        {
          key: '4',
          disk_inte:'SSD',
          disk_vol:'480GB',
          disk_name: 'c0t5000CCA224D3FF2Ed0',
          disk_loc: 'JBod-1-2'
        },
        {
          key: '5',
          disk_inte:'SSD',
          disk_vol:'480GB',
          disk_name: 'c0t5001CDB224D3FC2Ed0',
          disk_loc: 'JBod-2-1'
        }
      ],
      
      selectedRowKeys: [],
      selectedRows: [],
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    add () {
      this.visible = true
    },
    onSelectChange (selectedRowKeys) {
          console.log('selectedRowKeys changed: ', selectedRowKeys);
          this.selectedRowKeys = selectedRowKeys
        },
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          alert: { show: false, clear: () => { this.selectedRowKeys = [] } },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
              props: {
                disabled: record.no === 'NO 2', // Column configuration not to be checked
                name: record.no
              }
            })
          }
        }
        this.optionAlertShow = false
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
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
