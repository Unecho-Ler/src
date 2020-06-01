// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/resource/node',
    children: [
      {
        path: '/resource',
        redirect: '/resource/node',
        component: PageView,
        meta: { title: '资源管理', keepAlive: true, icon: 'deployment-unit' },
        children: [
          {
            path: '/resource/node',
            name: 'NodeManage',
            component: () => import('@/views/resource/node'),
            meta: { title: '节点管理', keepAlive: true, icon: 'cluster'}
          },
          {
            path: '/resource/space',
            name: 'SpaceManage',
            component: () => import('@/views/resource/space'),
            meta: { title: '容量管理', keepAlive: true, icon: 'pie-chart'}
          },
          {
            path: '/resource/clients',
            name: 'ClientManage',
            component: RouteView,
            meta: { title: '代理端管理', keepAlive: true, icon: 'apartment'},
            redirect: '/resource/clients/CDMClient',
            children: [
              {
                path: '/resource/clients/CDMClient',
                name: 'CdmClient',
                component: () => import('@/views/resource/clients/CDMClient'),
                meta: { title: 'CDM 高级备份', hidden: true}
              },
              {
                path: '/resource/clients/CDPClient',
                name: 'CdpClient',
                component: () => import('@/views/resource/clients/CDPClient'),
                meta: { title: 'CDP 持续数据保护', hidden: true, keepAlive: true}
              }
            ]
          },
        ]
      },
      {
        path: '/resource/siteManage',
        name: 'SiteManage',
        component: RouteView,
        meta: { title: '节点配置', keepAlive: true, icon: 'pie-chart'},
        hidden: true,
        hideChildrenInMenu: true,
        children: [
          {
            path: '/resource/siteManage',
            name: 'Site',
            component: () => import('@/views/resource/manage'),
            meta: { title: '节点配置', keepAlive: true}
          }
        ]
      },
      {
        path: '/usermanage',
        redirect: '/usermanage/rolegroup',
        component: PageView,
        meta: { title: '权限管理', keepAlive: true, icon: 'lock' },
        children: [
          {
            path: '/usermanage/rolegroup',
            name: 'rolegroup',
            component: () => import('@/views/usermanage/RoleGroup'),
            meta: { title: '角色管理', keepAlive: true, icon: 'control'}
          },
          {
            path: '/usermanage/usergroup',
            name: 'usergroup',
            component: () => import('@/views/usermanage/UserGroup'),
            meta: { title: '用户管理', keepAlive: true, icon: 'team'}
          },
        ]
      },
      {
        path: '/log/log',
        name: 'LogManage',
        component: PageView,
        meta: { title: '日志管理', keepAlive: true, icon: 'calendar'},
        children: [
          {
            path: '/log/log',
            name: 'Log',
            component: () => import('@/views/log/log'),
            meta: { title: '操作日志', keepAlive: true}
          },
          {
            path: '/log/syslog',
            name: 'SYSLog',
            component: () => import('@/views/log/syslog'),
            meta: { title: '系统日志', keepAlive: true}
          }
        ]
      },
     
      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      },
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'initial',
        name: 'initial',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/initial/Initial')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },
  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
