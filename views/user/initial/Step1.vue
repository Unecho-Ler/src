<template>
  <div class="page-header-index-wide">
    <a-card :bordered="false" :bodyStyle="{width: '500px', margin: '40px auto 0', padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <div class="account-settings-info-main">
        <div>
          <div style="float:left;width:250px;margin:5px 0 0 15px;">
            <p>系统码：316D793476653C3E</p>
          </div>
          <div style="float:left;">
            <a-upload
                name="file"
                :multiple="true"
                action=""
                @change="handleChange"
              >
                <a-button> <a-icon type="upload" /> 导入注册码 </a-button>
              </a-upload>
          </div>
        </div>
      </div>
      
      
      <div>
        
         <a-table :columns="columns" :dataSource="data" :pagination="false" size="small"/>
        <a-alert message="导入注册码以后显示注册码详情,建议通过异步实现" type="warning" show-icon />
              
      </div>
      <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
              <a-button type="primary" @click="nextStep">下一步</a-button>
            </a-form-item>
            </a-form>
      <a-modal
      title="添加注册码"
      centered
      v-model="add_license"
      @ok="() => add_license = false"
      :width="500"
      :visible="visible"
      :confirmLoading="confirmLoading"
    >
      <template>
        <a-input placeholder="注册码" />
      </template>
    </a-modal>
    </a-card>
  </div>
  
</template>

<script>
  const columns = [
      {
        title: '已激活模块',
        dataIndex: 'modle',
        key: 'modle',
      },
      {
        title: '可用容量',
        dataIndex: 'capacity',
        key: 'capacity',
      },
    ];
    const data = [
      {
        key: '0',
        modle: '公共模块',
        children:[
          {
            key: '9',
            modle: '基本注册码'
          },
          {
            key: '10',
            modle: '总存储容量',
            capacity: '2TB'
          },
        ]
      },
      {
        key: '2',
        modle: 'VTL模块',
        children:[
          {
            key: '11',
            modle: 'VTL功能',
            capacity: '无限制'
          },
        ]
      },
      {
        key: '3',
        modle: 'VM模块',
        children:[
          {
            key: '12',
            modle: '虚拟机功能',
            capacity: '无限制'
          },
        ]
      },
      {
        key: '4',
        modle: '备份模块',
        children:[
          {
            key: '13',
            modle: '统一备份功能',
            capacity: '无限制'
          },
        ]
      },
      {
        key: '5',
        modle: 'NAS模块',
        children:[
          {
            key: '14',
            modle: 'NAS功能',
            capacity: '无限制'
          },
        ]
      },
      {
        key: '6',
        modle: 'CDP模块',
        children:[
          {
            key: '15',
            modle: 'CDP功能',
            capacity: '1TB'
          },
        ]
      },
      {
        key: '30',
        modle: 'UBackup模块',
        children:[
          {
            key: '16',
            modle: '友备云站功能',
            capacity: '无限制'
          },
        ]
      },
      {
        key: '7',
        modle: 'CDM备份模块',
        children:[
          {
            key: '17',
            modle: 'SQLServer',
            capacity: '无限制'
          },
          {
            key: '18',
            modle: 'MySQL',
            capacity: '无限制'
          },
          {
            key: '19',
            modle: 'Oracle',
            capacity: '无限制'
          },
          {
            key: '20',
            modle: '文件',
            capacity: '无限制'
          },
          {
            key: '21',
            modle: '华为云',
            capacity: '无限制'
          },
        ]
      }
    ];
export default {
  name: 'Step1',
  data () {
    return {
      data,
      columns,
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onOpenChange (openKeys) {
      this.openKeys = openKeys
    },
    updateMenu () {
      const routes = this.$route.matched.concat()
      this.selectedKeys = [ routes.pop().path ]
    },
    
    Add_License(add_license){
      this.add_license = add_license
    },
    nextStep () {
      const { form: { validateFields } } = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          this.$emit('nextStep')
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0,0,0,.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
