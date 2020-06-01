<template>
  <div>
    <!-- <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="分组数量" content="4个" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="代理端数量" content="18个" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="代理端异常" content="0个" :bordered="true"/>
        </a-col>
      </a-row>
    </a-card> -->
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="分组列表">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="角色ID">
                <a-input placeholder="请输入"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">启用</a-select-option>
                  <a-select-option value="2">禁用</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary">查询</a-button>
                <a-button style="margin-left: 8px">重置</a-button>
              </span>
            </a-col>
            <a-col :md="4" :sm="24">
              <template v-if="hasSelected">
                <a-radio-group>
                <a-popconfirm @confirm="remove(record.id)">
                  <template slot="title">
                    <p>是否要删除所有选中内容？</p>
                    <a-checkbox>
                        确认禁用
                    </a-checkbox>
                  </template>
                  <a-radio-button>批量删除</a-radio-button>
                </a-popconfirm>
                </a-radio-group>
                
              </template>
            </a-col>
          </a-row>
        </a-form>
        
      </div>
      
      <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="$refs.addroleForm.add()">添加</a-button>
      </div>
      <a-table 
      :columns="columns" 
      :data-source="data" 
      class="components-table-demo-nested"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
      <span slot="nodes" slot-scope="nodes">
            <a-tag
              v-for="tag in nodes"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
          <span slot="permission" slot-scope="permission">
                <a-tag
                  v-for="tag in permission"
                  :key="tag"
                  :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <a slot="operation" slot-scope="text" @click="$refs.addroleForm.add()">修改</a>
      </a-table>
    </a-card>
    
   <!-- <create-form ref="createModal"  /> -->
    <add-role-form ref="addroleForm"  />
    <!-- <step-by-step-modal ref="modal" /> -->
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
// import CreateForm from './modules/CreateForm'
import AddRoleForm from './modules/AddRoleForm'

import moment from 'moment'
import { ChartCard,Trend} from '@/components'
import { mixinDevice } from '@/utils/mixin'
const columns = [
  { title: '唯一识别码', dataIndex: 'name', key: 'name',width: '90px' },
  { title: '角色类别', dataIndex: 'user_type', key: 'user_type',width: '90px' },
  { title: '模块清单', dataIndex: 'nodes', key: 'nodes',scopedSlots: { customRender: 'nodes' } ,width: '400px'},
  { title: '操作权限', dataIndex: 'permission', key: 'permission' ,scopedSlots: { customRender: 'permission' },
    width: '90px'},
  { title: '状态', dataIndex: 'status', key: 'status' ,scopedSlots: { customRender: 'status' } ,width: '90px'},
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' },width: '90px' },
];

const data = [
  {
    key: 1,
    name: 'dev_admin',
    user_type: '系统管理员',
    nodes: ['资源管理', '账户管理', '日志管理'],
    permission: ['可操作'],
    status: '2'
  },
  {
    key: 2,
    name: 'job_admin',
    user_type: '安全保密管理员',
    nodes: ['权限管理', '账户管理', '日志管理'],
    permission: ['可操作'],
    status: '2'
  },
  {
    key: 3,
    name: 'audit_admin',
    user_type: '审计员',
    nodes: ['账户管理', '日志管理'],
    permission: ['可操作'],
    status: '2'
  },
  {
    key: 4,
    name: 'sys_admin',
    user_type: '超级用户',
    nodes: ['资源管理','权限管理', 'CDM 高级备份', 'CDP 持续数据保护', 'VTL 虚拟磁带库', 'SAN 存储', 'NAS 共享', '账户管理', '日志管理'],
    permission: ['可操作'],
    status: '2'
  },
  {
    key: 5,
    name: 'user',
    user_type: '用户',
    nodes: ['CDM 高级备份', 'CDP 持续数据保护', '账户管理', '日志管理'],
    permission: ['可操作'],
    status: '2'
  },
  {
    key: 6,
    name: 'routing',
    user_type: '巡检用户',
    nodes: ['CDM 高级备份', 'CDP 持续数据保护','账户管理', '日志管理'],
    permission: ['仅可见'],
    status: '2'
  },
  {
    key: 7,
    name: 'api_user',
    user_type: '接口账户',
    nodes: ['api访问'],
    permission: ['可操作'],
    status: '2'
  }
  ];

const statusMap = {
  0: {
    status: 'default',
    text: '禁用'
  },
  2: {
    status: 'success',
    text: '启用'
  }
}
export default {
  name: 'SpaceManager',
  components: {
    HeadInfo,
    Trend,
    AddRoleForm,
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  data() {
    return {
      data,
      columns,
      loading: false,
      visible: false,
      selectedRowKeys: [],
    };
  },
  computed: {
      hasSelected() {
        return this.selectedRowKeys.length > 0;
      },
    },
  methods: {
    showModal() {
          this.visible = true;
        },
      start() {
        this.loading = true;
        // ajax request after empty completing
        setTimeout(() => {
          this.loading = false;
          this.selectedRowKeys = [];
        }, 1000);
      },
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.selectedRowKeys = selectedRowKeys;
      },
    },
};

</script>

<style lang="less" scoped>
    .ant-avatar-lg {
        width: 48px;
        height: 48px;
        line-height: 48px;
    }

    .list-content-item {
        color: rgba(0, 0, 0, .45);
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        margin-left: 40px;
        span {
            line-height: 20px;
        }
        p {
            margin-top: 4px;
            margin-bottom: 0;
            line-height: 22px;
        }
    }
</style>
