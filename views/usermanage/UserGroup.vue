<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="分组数量" content="4个" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="用户总数" content="18个" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="代理端异常" content="0个" :bordered="true"/>
        </a-col>
      </a-row>
    </a-card>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="分组列表">
      
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="角色/角色组">
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
      
      <a-alert message="dev_admin/job_admin/audit 用户组不可删除" type="info" show-icon />
      <a-alert message="组内用户dev_admin/job_admin/audit可删除,但必须保留至少一个可用账户" type="info" show-icon />
      <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="$refs.createForm.add()">添加用户组</a-button>
      </div>
      <a-table 
      :columns="columns" 
      :data-source="data" 
      class="components-table-demo-nested"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="roles" slot-scope="roles">
              <a-tag
                v-for="tag in roles"
                :key="tag"
                :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
        <a slot="operation" slot-scope="text">
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="$refs.adduserForm.add()">添加用户</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="$refs.createForm.add()">修改组属性</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm @confirm="remove(record.id)">
                  <template slot="title">
                    <p>是否要禁用该空间？</p>
                    <p>禁用该用户组将影响所有与组内用户相关的作业！</p>
                    <a-checkbox>
                        确认禁用
                    </a-checkbox>
                  </template>
                  <a>禁用分组</a>
                </a-popconfirm>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm @confirm="remove(record.id)">
                  <template slot="title">
                    <p>是否要删除该空间？</p>
                    <p>删除该用户组将影响所有与组内用户相关的作业！</p>
                    <a-checkbox>
                        确认删除
                    </a-checkbox>
                  </template>
                  <a>删除分组</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
            <a> 更多<a-icon type="down" /> </a>
          </a-dropdown>
          </a>
        <a-table
          slot="expandedRowRender"
          slot-scope="text"
          :columns="innerColumns"
          :data-source="innerData"
          :pagination="false"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
        <span slot="pool" slot-scope="pool">
              <a-tag
                v-for="tag in pool"
                :key="tag"
                :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
          <span slot="status" slot-scope="text"> <a-badge status="success" />运行中</span>
          <span slot="operation" slot-scope="text" class="table-operation">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="$refs.adduserForm.add()">修改</a>
                  <a @click="showModal">移动</a>
                  <a-modal v-model="visible" title="更改所属分组" on-ok="handleOk">
                        <a-form :form="form">
                          <a-form-item
                            label="移动至"
                            :labelCol="labelCol"
                            :wrapperCol="wrapperCol"
                          >
                              <a-select>
                                <a-select-option :value="0">dev_admin组</a-select-option>
                                <a-select-option :value="1">job_admin组</a-select-option>
                                <a-select-option :value="1">user组</a-select-option>
                              </a-select>
                            </a-form-item>
                          </a-form>
                      </a-modal>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm @confirm="remove(record.id)">
                    <template slot="title">
                      <p>是否要禁用该空间？</p>
                      <p>禁用该空间将影响所有使用该共建的作业，请先停止相关作业后再执行！</p>
                      <a-checkbox>
                          确认禁用
                      </a-checkbox>
                    </template>
                    <a>禁用</a>
                  </a-popconfirm>
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm @confirm="remove(record.id)">
                    <template slot="title">
                      <p>是否要删除该空间？</p>
                      <p>删除该空间将影响所有使用该共建的作业，请先停止相关作业后再执行！</p>
                      <a-checkbox>
                          确认删除
                      </a-checkbox>
                    </template>
                    <a>删除</a>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
              <a> 更多<a-icon type="down" /> </a>
            </a-dropdown>
          </span>
        </a-table>
      </a-table>
    </a-card>
    
   <create-form ref="createForm"  />
    <add-user-form ref="adduserForm"  />
    <!-- <step-by-step-modal ref="modal" /> -->
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import CreateForm from './modules/CreateForm'
import AddUserForm from './modules/AddUserForm'
// import AddSpaceForm from './modules/AddSpaceForm'

import moment from 'moment'
import { ChartCard,Trend} from '@/components'
import { mixinDevice } from '@/utils/mixin'
const columns = [
  { title: '用户组', dataIndex: 'name', key: 'name' },
  { title: '组角色', dataIndex: 'roles', key: 'roles',scopedSlots: { customRender: 'roles' } },
  { title: '备注', dataIndex: 'describe', key: 'describe' },
  { title: '状态', dataIndex: 'status', key: 'status' ,scopedSlots: { customRender: 'status' } },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } },
];

const data = [
  {
    key: 1,
    name: 'dev_admin',
    roles: ['dev_admin'],
    describe: '系统管理员',
    status: '2'
  },
  {
    key: 2,
    name: 'job_admin',
    roles: ['job_admin'],
    describe: '安全保密管理员',
    status: '2'
  },
  {
    key: 3,
    name: 'audit',
    roles: ['audit'],
    describe: '审计用户组',
    status: '2'
  },
  {
    key: 4,
    name: 'show_api',
    roles: ['api_user'],
    describe: 'API 接口用户组',
    status: '1'
  },
  {
    key: 5,
    name: '数据保护用户组',
    roles: ['user'],
    describe: '产品拓展部用户组',
    status: '2'
  }
  ];

const innerColumns = [
  { title: '用户名称', dataIndex: 'username', key: 'username' },
  { title: '设备组', dataIndex: 'pool', key: 'pool' , scopedSlots: { customRender: 'pool' } },
  { title: '状态', key: 'state', scopedSlots: { customRender: 'status' } },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

const innerData = [];
for (let i = 0; i < 3; ++i) {
  innerData.push({
    key: i,
    username: 'test1',
    pool: ['所有节点','高级备份存储组', 'CDP 存储组'],
  });
}
const statusMap = {
  0: {
    status: 'default',
    text: '禁用'
  },
  1: {
    status: 'processing',
    text: '部分禁用'
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
    CreateForm,
    AddUserForm,
    Trend,
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
      innerColumns,
      innerData,
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
