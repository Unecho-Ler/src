<template>
  <div>
  <div style="float:left;height:60px;margin:-66px 0 0 80px;">
    <a-menu
      theme="light"
      mode="horizontal"
      :defaultSelectedKeys="['2']"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="1">资源</a-menu-item>
      <a-menu-item key="2">用户</a-menu-item>
      <a-menu-item key="3">nav 3</a-menu-item>
    </a-menu>
  </div>
  <div class="user-wrapper" style="margin-top:-66px;">
	  
    <div class="content-box">
      
      
        <a-popover placement="right">
          <template slot="content">
            <p>帮助文档</p>
          </template>
         <span><a href="../../assets/help.pdf" target="_blank"><a-icon type="question-circle-o" /></a></span>
        </a-popover>
      
      <!-- <notice-icon class="action"/> -->
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-icon type="user" />
          <span>  {{ nickname() }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <!-- <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user"/>
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-divider/> -->
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-dropdown>
          <span class="action ant-dropdown-link user-dropdown-menu">
            <a-icon type="setting" />
          </span>
          <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
            <a-menu-item key="0">
              <a @click="() => download_Agent(true)"><a-icon type="download"/><span>下载代理</span></a>
              <a-modal
                title="下载代理"
                centered
                v-model="download_agent"
                @ok="() => download_agent = false"
                :width="500"
                :visible="visible"
              >
                <template>
                  <a-tabs defaultActiveKey="1">
                    <a-tab-pane key="1">
                      <span slot="tab">
                        <a-icon type="copy" />
                        CDM 备份
                      </span>
                      <a-table :columns="cdm_columns" :dataSource="cdm_data" :pagination="false">
                        <span slot="action" slot-scope="text, record">
                          <a><a-icon type="download" /></a>
                        </span>
                      </a-table>
                    </a-tab-pane>
                    <a-tab-pane key="2">
                      <span slot="tab">
                        <a-icon type="file-sync" />
                        CDP 保护
                      </span>
                      <a-table :columns="cdp_columns" :dataSource="cdp_data" :pagination="false">
                        <span slot="action" slot-scope="text, record">
                          <a><a-icon type="download" /></a>
                        </span>
                      </a-table>
                    </a-tab-pane>
                  </a-tabs>
                </template>
              </a-modal>
            </a-menu-item>
            <a-menu-item key="1">
              <a href="javascript:;"><a-icon type="reload"/> <span>重启系统</span></a>
            </a-menu-item>
            <a-menu-item key="2">
              <a href="javascript:;"><a-icon type="poweroff"/><span>关闭系统</span></a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
    </div>
  </div>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getRoleList, getServiceList} from '@/api/manage'

export default {
  name: 'UserMenu',
  components: {
    NoticeIcon,
    STable,
    Ellipsis
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      download_agent: false,
      collapsed: false,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      cdp_columns: [
        {
          title: '适用环境',
          dataIndex: 'osVersion',
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '80px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      cdp_data: [
        {
          osVersion: 'Windows_x86',
        }, 
        {
          osVersion: 'Windows_x64',
        }, 
        {
          osVersion: 'Linux_x86',
        },  
        {
          osVersion: 'Linux_x64',
        },  
        {
          osVersion: 'AIX',
        },      
        {
          osVersion: 'HP-Unix',
        },  
        {
          osVersion: 'Solaris_Sparc_64',
        },  
      ],
      cdm_columns: [
        {
          title: '适用环境',
          dataIndex: 'osVersion',
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '80px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      cdm_data: [
        {
          osVersion: 'Windows_x86',
        }, 
        {
          osVersion: 'Windows_x64',
        }, 
        {
          osVersion: 'Linux_x86',
        },  
        {
          osVersion: 'Linux_x64',
        },  
        {
          osVersion: 'AIX',
        },      
        {
          osVersion: 'HP-Unix',
        },  
        {
          osVersion: 'Solaris_Sparc_64',
        },  
      ],
      download_Agent(download_agent){
        this.download_agent = download_agent;
      },
    }
  },
  methods: {
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar']),
    handleLogout () {
      const that = this

      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk () {
          return that.Logout({}).then(() => {
            window.location.reload()
          }).catch(err => {
            that.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
<style>
  #components-layout-demo-top-side-2 .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 28px 16px 0;
    float: left;
  }
</style>