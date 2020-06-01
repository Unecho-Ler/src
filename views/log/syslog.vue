<template>
  <div>
    <!-- <a-card :bordered="false">
      <div>
      
      </div>
    </a-card> -->
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="系统日志列表">
      <div slot="extra">
        
        <a-radio-group>
          <a-radio-button>刷新</a-radio-button>
          <a-radio-button @click="$refs.exportlogForm.add()">导出</a-radio-button>
          <a-radio-button @click="$refs.screenlogForm.add()">筛选</a-radio-button>
        </a-radio-group>
      </div>
      <a-table 
      :columns="columns" 
      :data-source="data" 
      class="components-table-demo-nested">
        <span slot="log_type" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
      </a-table>
    </a-card>
    
   <export-log-form ref="exportlogForm"  />
    <screen-log-form ref="screenlogForm" />
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import ExportLogForm from './modules/ExportLogForm'
import ScreenLogForm from './modules/ScreenLogForm'

import moment from 'moment'
import { ChartCard,Trend} from '@/components'
import { mixinDevice } from '@/utils/mixin'
const columns = [
  { title: '序号', dataIndex: 'num', key: 'num',width: '100px' },
  { title: '操作类型', dataIndex: 'logid', key: 'logid',width: '100px' },
  { title: '日志类型', dataIndex: 'log_type', key: 'log_type',scopedSlots: { customRender: 'log_type' } ,width: '100px'},
  { title: '操作时间', dataIndex: 'datetime', key: 'datetime' ,scopedSlots: { customRender: 'datetime' },
    width: '250px'},
  { title: '日志来源', dataIndex: 'ipaddress', key: 'ipaddress' ,scopedSlots: { customRender: 'ipaddress' } ,width: '120px'},
  { title: '操作内容', dataIndex: 'operation',key: 'operation', scopedSlots: { customRender: 'operation' } },
];

const data = [
  {
    key: 1,
    num: '1',
    logid: '登录',
    log_type: '1',
    datetime: '2019-05-21 21:45:33',
    ipaddress: '存储节点1',
    operation: '备份服务运行中'
  },
  {
    key: 2,
    num: '2',
    logid: '登出',
    log_type: '0',
    datetime: '2019-05-21 21:45:33',
    ipaddress: '存储节点2',
    operation: '代理服务器192.168.40.19运行异常'
  }
  ];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: 2,
      num: '2',
      logid: '操作-添加',
      log_type: '1',
      datetime: '2019-05-21 21:45:33',
      ipaddress: '主管理节点',
      operation: '代理服务器192.168.40.19运行异常'
    })
  }

const statusMap = {
  0: {
    status: 'error',
    text: '错误'
  },
  1: {
    status: 'success',
    text: '正常'
  }
}
export default {
  name: 'SpaceManager',
  components: {
    HeadInfo,
    Trend,
    ExportLogForm,
    ScreenLogForm,
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
