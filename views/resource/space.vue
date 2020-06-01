<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="6" :xs="24">
          <head-info title="分组数量" content="8个" :bordered="true"/>
        </a-col>
        <a-col :sm="6" :xs="24">
          <head-info title="划分空间" content="18个" :bordered="true"/>
        </a-col>
        <a-col :sm="6" :xs="24">
          <head-info title="已分配容量" content="2044GB"/>
        </a-col>
        <a-col :sm="6" :xs="24">
          <head-info title="待分配容量" content="24GB"/>
        </a-col>
      </a-row>
    </a-card>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="分组列表">
      
      <div slot="extra">
        <span>
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
        </span>
        <a-radio-group>
          <a-radio-button>全部</a-radio-button>
          <a-radio-button>运行中</a-radio-button>
          <a-radio-button>已禁用</a-radio-button>
          <a-radio-button>故障</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>
      
      <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="$refs.createModal.add()">添加</a-button>
      </div>
      <a-table 
      :columns="columns" 
      :data-source="data" 
      class="components-table-demo-nested"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <a slot="operation" slot-scope="text" @click="$refs.addspaceForm.add()">添加</a>
        <a-table
          slot="expandedRowRender"
          slot-scope="text"
          :columns="innerColumns"
          :data-source="innerData"
          :pagination="false"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <span slot="status" slot-scope="text"> <a-badge status="success" />运行中</span>
          <span slot="operation" slot-scope="text" class="table-operation">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="showModal">移动</a>
                  <a-modal v-model="visible" title="更改所属分组" on-ok="handleOk">
                        <a-form :form="form">
                          <a-form-item
                            label="移动至"
                            :labelCol="labelCol"
                            :wrapperCol="wrapperCol"
                          >
                              <a-select>
                                <a-select-option :value="0">高级备份存储组</a-select-option>
                                <a-select-option :value="1">CDP 存储组</a-select-option>
                                <a-select-option :value="1">SAN 存储组</a-select-option>
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
    
    <create-form ref="createModal"  />
    <add-space-form ref="addspaceForm"  />
    <step-by-step-modal ref="modal" />
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import CreateForm from './modules/CreateForm'
import AddSpaceForm from './modules/AddSpaceForm'

import moment from 'moment'
import { ChartCard,Trend} from '@/components'
import { mixinDevice } from '@/utils/mixin'
const columns = [
  { title: '分组名称', dataIndex: 'name', key: 'name' },
  { title: '组内数量', dataIndex: 'num', key: 'num' },
  { title: '备注', dataIndex: 'describe', key: 'describe' },
  { title: '状态', dataIndex: 'status', key: 'status' ,scopedSlots: { customRender: 'status' } },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } },
];

const data = [
  {
    key: 1,
    name: '高级备份存储组',
    num: '3',
    describe: '用于XX部门备份使用',
    status: '2'
  },
  {
    key: 2,
    name: 'CDP 存储组',
    num: '4',
    describe: '用于XX部门CDP使用',
    status: '2'
  },
  {
    key: 3,
    name: 'SAN存储组',
    num: '2',
    describe: '用于XX部门SAN存储使用',
    status: '3'
  }
  ];

const innerColumns = [
  { title: '节点名称', dataIndex: 'node', key: 'node' },
  { title: '存储池', dataIndex: 'pool', key: 'pool' },
  { title: '分配容量', dataIndex: 'space', key: 'space' },
  { title: '所属功能', dataIndex: 'function', key: 'function' },
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
    node: '存储节点1',
    pool: 'SYSVOL',
    space: '30GB',
    function: 'CDM 高级备份',
  });
}
const statusMap = {
  0: {
    status: 'default',
    text: '无节点'
  },
  1: {
    status: 'processing',
    text: '有异常'
  },
  2: {
    status: 'success',
    text: '运行中'
  },
  3: {
    status: 'error',
    text: '故障'
  }
}
export default {
  name: 'SpaceManager',
  components: {
    HeadInfo,
    CreateForm,
    ChartCard,
    AddSpaceForm,
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
