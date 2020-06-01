<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="12" :xs="24">
          <chart-card  title="管理节点" total="2">
            <a-tooltip title="指标说明" slot="action">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <trend flag="down" style="margin-right: 16px;">
                <span slot="term">正常</span>
                2
              </trend>
              <trend flag="up">
                <span slot="term">异常</span>
                0
              </trend>
            </div>
          </chart-card>
        </a-col>
        <a-col :sm="12" :xs="24">
          <chart-card title="存储节点" total="12">
            <a-tooltip title="指标说明" slot="action">
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <trend flag="down" style="margin-right: 16px;">
                <span slot="term">正常</span>
                11
              </trend>
              <trend flag="up">
                <span slot="term">异常</span>
                <span style="color:red">1</span>
              </trend>
            </div>
          </chart-card>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="节点列表">

      <div slot="extra">
        <a-radio-group>
          <a-radio-button>全部</a-radio-button>
          <a-radio-button>运行中</a-radio-button>
          <a-radio-button>已禁用</a-radio-button>
          <a-radio-button>故障</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>

      <a-list size="large" >
        <a-list-item :key="index" v-for="(item, index) in data_c">
          <a-list-item-meta :description="item.description">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a  @click="$refs.taskForm.add()">添加节点</a>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <a-badge :status="item.status | statusTypeFilter" :text="item.status | statusFilter" />
            </div>
          </div>
        </a-list-item>
      </a-list>
      
      <a-table :columns="columns" :data-source="tdata" :pagination="false" style="margin-left: 50px;">
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="action" slot-scope="text">
          <a-dropdown>
            <a-menu slot="overlay">
              <a-sub-menu key="modify" title="维护">
                <a-menu-item @click="$refs.modifyipForm.add()">工作IP</a-menu-item>
                <a-menu-item @click="$refs.createpoolModal.add()">添加新池</a-menu-item>
                <a-menu-item @click="toPoolList()">其他操作</a-menu-item>
              </a-sub-menu>
              <!-- <a-menu-item>
                <a-popconfirm title="是否要禁用该空间？" @confirm="remove(record.id)">
                  <a>禁用</a>
                </a-popconfirm>
              </a-menu-item> -->
              <a-menu-item>
                <a @click="showModal">切换</a>
                <a-modal v-model="visible" title="更改所属分组" on-ok="handleOk">
                      <a-form :form="form">
                        <a-form-item
                          label="切换主管理节点"
                          :labelCol="labelCol"
                          :wrapperCol="wrapperCol"
                        >
                            <a-select>
                              <a-select-option :value="0">备用管理节点1</a-select-option>
                            </a-select>
                          </a-form-item>
                        </a-form>
                    </a-modal>
              </a-menu-item>
              <a-menu-item>
              <a-popconfirm title="是否要删除卷组此节点？" @confirm="remove(record.id)">
                <a>删除</a>
              </a-popconfirm>
              </a-menu-item>
            </a-menu>
            <a> 更多<a-icon type="down" /> </a>
          </a-dropdown>
                    
        </span>
        </a-table>
      <a-list size="large" >
        <a-list-item :key="index" v-for="(item, index) in data_s">
          <a-list-item-meta :description="item.description">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a  @click="$refs.taskForm.add()">添加节点</a>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <a-badge :status="item.status | statusTypeFilter" :text="item.status | statusFilter" />
            </div>
          </div>
        </a-list-item>
      </a-list>
      <a-table :columns="columns" :data-source="sdata" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}" style="margin-left: 50px;">
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="action" slot-scope="text">
          <a-dropdown>
            <a-menu slot="overlay">
              <a-sub-menu key="modify" title="维护">
                <a-menu-item @click="$refs.modifyipForm.add()">工作IP</a-menu-item>
                <a-menu-item @click="$refs.createpoolModal.add()">添加新池</a-menu-item>
                <a-menu-item @click="toPoolList()">其他操作</a-menu-item>
              </a-sub-menu>
              <!-- <a-menu-item>
                <a-popconfirm title="是否要禁用该空间？" @confirm="remove(record.id)">
                  <a>禁用</a>
                </a-popconfirm>
              </a-menu-item> -->
              <a-menu-item>
                <a @click="showModal">切换</a>
                <a-modal v-model="visible" title="更改所属分组" on-ok="handleOk">
                      <a-form :form="form">
                        <a-form-item
                          label="切换主管理节点"
                          :labelCol="labelCol"
                          :wrapperCol="wrapperCol"
                        >
                            <a-select>
                              <a-select-option :value="0">备用管理节点1</a-select-option>
                            </a-select>
                          </a-form-item>
                        </a-form>
                    </a-modal>
              </a-menu-item>
              <a-menu-item>
              <a-popconfirm title="是否要删除卷组此节点？" @confirm="remove(record.id)">
                <a>删除</a>
              </a-popconfirm>
              </a-menu-item>
            </a-menu>
            <a> 更多<a-icon type="down" /> </a>
          </a-dropdown>
                    
        </span>
        </a-table>
      <task-form ref="taskForm" />
      <modify-ip-form ref="modifyipForm" />
      <delete-pool-form ref="deletepoolForm"  />
      <create-pool-modal ref="createpoolModal"  />
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import TaskForm from './modules/AddManagerNode'
import ModifyIpForm from './modules/ModifyIpForm'
import DeletePoolForm from './modules/DeletePoolForm'
import CreatePoolModal from './modules/CreatePoolModal'
    

import moment from 'moment'
import { ChartCard,Trend} from '@/components'
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
const columns = [
  {
    title: '节点名称',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
    key: 'ip',
    width: 200,
  },
  {
    title: '类别',
    dataIndex: 'describe',
    key: 'describe',
    ellipsis: true,
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    scopedSlots: { customRender: 'status' },
  },
  { 
    title: '操作', 
    key: 'action', 
    scopedSlots: { customRender: 'action' } ,
  },
]
const tdata = [
  {
    key: '1',
    name: '主管理节点',
    ip: '192.168.1.100',
    describe: '主管理节点',
    status: '2'
  },
  {
    key: '2',
    name: '备用管理节点1',
    ip: '192.168.1.101',
    describe: '备用管理节点',
    status: '2'
  },
  ]
const sdata = [
  {
    key: '1',
    name: '存储节点1',
    ip: '192.168.1.100',
    describe: '存储节点',
    status: '2'
  },
  {
    key: '2',
    name: '存储节点2',
    ip: '192.168.1.101',
    describe: '存储节点',
    status: '3'
  },
]
const data_c = [
  {title: '管理节点组',
  avatar: '../../assets/managerset.png',
  description: '集群的管理节点，负责调度执行任务集存储控制',
  status: '2'
  }
]
const data_s = [
  {
  title: '存储节点组',
  avatar: '../../assets/managerset.png',
  description: '该组设备仅提供存储功能',
  status: '1'
  }
]

export default {
  name: 'NodeManager',
  components: {
    HeadInfo,
    TaskForm,
    ChartCard,
    ModifyIpForm,
    CreatePoolModal,
    DeletePoolForm,
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
  data () {
    return {
      data_c,
      data_s,
      columns,
      tdata,
      sdata,    
      loading: false,
      visible: false,

    }
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
    toPoolList () {
      this.$router.push('/resource/siteManage')
    },
  }
}
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
