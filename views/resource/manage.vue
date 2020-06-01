
<template>
  <page-view title="存储节点-1:存储池配置" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">

    <!-- actions -->
    <template slot="action">
      <a-tree-select
          v-model="value"
          style="width: 220px"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="treeData"
          placeholder="请选择节点"
          tree-default-expand-all
        >
          <span v-if="key === '0-0-1'" slot="title" slot-scope="{ key, value }" style="color: #08c">
            Child Node1 {{ value }}
          </span>
        </a-tree-select>
        <a-button type="primary" style="margin-left: 15px;">
              跳转
            </a-button>
    </template>

    <!-- 操作 -->
    <a-card style="margin-top: 24px" :bordered="false" >
      <div>
          <a-row>
            <a-col :span="9">
        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="$refs.createpoolModal.add()">新建卷组</a-button>
          
          <a-dropdown >
            <a-menu slot="overlay">
              <a-menu-item key="1"><a-icon type="cloud-upload" />导入卷组配置文件</a-menu-item>
              <!-- lock | unlock -->
              <a-menu-item key="2"><a-icon type="cloud-download" />导出配置文件</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              配置文件 <a-icon type="down" />
            </a-button>
          </a-dropdown>
          <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay">
              <a-menu-item key="1"><a-icon type="interation" />清理卷</a-menu-item>
              <!-- lock | unlock -->
              <a-menu-item key="2"><a-icon type="file-search" />检查卷</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              批量操作 <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </div>
        </a-col>
        <a-col :span="15">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="48">
                <a-col :md="10" :sm="24">
                  <a-form-item label="卷组名称">
                    <a-input placeholder=""/>
                  </a-form-item>
                </a-col>
                <a-col :md="10" :sm="24">
                  <a-form-item label="卷组状态">
                    <a-select placeholder="请选择" default-value="0">
                      <a-select-option value="0">在线</a-select-option>
                      <a-select-option value="1">降级</a-select-option>
                      <a-select-option value="2">故障</a-select-option>
                      <a-select-option value="3">未导入</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="4" :sm="24">
                  <span class="table-page-search-submitButtons" style="float:right;overflow:hidden">
                    <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                  </span>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </a-col>
        </a-row>
      </div>
      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span>
      
        <span slot="action" slot-scope="text, record">
          <template>
            <a-dropdown>
                <a class="ant-dropdown-link" href="#">
                  操作 <a-icon type="down" />
                </a>
                <a-menu slot="overlay">
                  <a-menu-item @click="$refs.poolmanageForm.add()">卷磁盘管理</a-menu-item>
                  
                  <a-sub-menu title="添加功能盘" key="test">
                    <a-menu-item @click="$refs.addcachetopoolForm.add()">添加热备盘</a-menu-item>
                    <a-menu-item  @click="$refs.addcachetopoolForm.add()">添加缓存盘</a-menu-item>
                  </a-sub-menu>
                  <a-menu-item  @click="$refs.adddisktopoolForm.add()">扩容卷组</a-menu-item>
                  <a-menu-item  @click="$refs.adddisktopoolForm.add()">扩容卷组</a-menu-item>
                  <a-menu-item>
                  <span v-if="record.id < 3" >
                    <a @click="$refs.deleteModal.del()" disabled="true">删除卷组</a>
                  </span>
                  <span v-else>
                      <a-popconfirm title="是否要删除卷组此卷组？" @confirm="remove(record.id)">
                        <span>删除卷组</span>
                      </a-popconfirm>
                  </span> 
                  </a-menu-item>
                  <a-menu-item>
                  <span v-if="record.status < 1" >
                    <span v-if="record.status === 0">
                       <a @click="$refs.deleteModal.del()">导入卷组</a>
                    </span>
                    <span v-else>
                        <a-popconfirm title="是否导入卷组此卷组？" @confirm="remove(record.id)">
                          <span>导入卷组</span>
                        </a-popconfirm>
                    </span> 
                  </span>
                  <span v-else>
                    <a @click="handleEdit(record)" disabled="true">导入卷组</a>
                  </span>
                  </a-menu-item>
                   
                </a-menu>
              </a-dropdown>
              
          </template>
        </span>
      </s-table>
        <create-pool-modal ref="createpoolModal"  />
        <add-disk-to-pool-form ref="adddisktopoolForm"  />
        <add-cache-to-pool-form ref="addcachetopoolForm"  />
        <replace-disk-form ref="replacediskForm"  />
        <pool-manage-form ref="poolmanageForm"  />
    </a-card>

  </page-view>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import HeadInfo from '@/components/tools/HeadInfo'
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
// import StepByStepModal from './modules/StepByStepModal'
// import CreateForm from './modules/CreateForm'
import { getRoleList, getServiceList} from '@/api/manage'
import CreatePoolModal from './modules/CreatePoolModal'
import AddDiskToPoolForm from './modules/AddDiskToPoolForm'
import AddCacheToPoolForm from './modules/AddCacheToPoolForm'
import ReplaceDiskForm from './modules/ReplaceDiskForm'
import PoolManageForm from './modules/PoolManageForm'

const statusMap = {
  0: {
    status: 'default',
    text: '未导入卷组'
  },
  1: {
    status: 'success',
    text: '在线'
  },
  2: {
    status: 'processing',
    text: '降级'
  },
  3: {
    status: 'error',
    text: '故障'
  }
}
const DetailListItem = DetailList.Item
const treeData = [
  {
    title: '管理节点',
    value: '0-0',
    key: '0-0',
    children: [
      {
        value: '0-0-1',
        key: '0-0-1',
        title: '主管理节点',
      },
      {
        title: '备用管理节点1',
        value: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '存储节点',
    value: '0-1',
    key: '0-1',
    children: [
      {
        value: '0-0-1',
        key: '0-0-1',
        title: '存储节点1'
      },
      {
        title: '存储节点2',
        value: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
];
export default {
  name: 'Advanced',
  components: {
    PageView,
    DetailList,
    DetailListItem,
    STable,
    CreatePoolModal,
    AddDiskToPoolForm,
    AddCacheToPoolForm,
    ReplaceDiskForm,
    PoolManageForm,
    Ellipsis,
    HeadInfo
  },
  mixins: [mixinDevice],
  data () {
    return {
      columns: [
        {
          title: 'ID',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '存储卷名称',
          dataIndex: 'no'
        },
        {
          title: 'RAID组态',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '总空间',
          dataIndex: 'callNo',
          sorter: true,
          needTotal: true,
          customRender: (text) => text + ' TB'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '已用空间',
          dataIndex: 'updatedAt',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '100px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],
      value: undefined,
      treeData,
      watch: {
        value(value) {
          console.log(value);
        },
      },
      options: {
        alert: { show: false, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  methods: { 
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
  },
 }
</script>

<style lang="less" scoped>

  .detail-layout {
    margin-left: 44px;
  }
  .text {
    color: rgba(0, 0, 0, .45);
  }

  .heading {
    color: rgba(0, 0, 0, .85);
    font-size: 20px;
  }

  .no-data {
    color: rgba(0, 0, 0, .25);
    text-align: center;
    line-height: 64px;
    font-size: 16px;

    i {
      font-size: 24px;
      margin-right: 16px;
      position: relative;
      top: 3px;
    }
  }

  .mobile {
    .detail-layout {
      margin-left: unset;
    }
    .text {

    }
    .status-list {
      text-align: left;
    }
  }
</style>
