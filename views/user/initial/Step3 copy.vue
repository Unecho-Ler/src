<template>
  <a-card class="card" >
  <div style="width:100%">
    <div style="min-width: 200px;width:30%;float: left;">
        <a-table :columns="sys_columns" :dataSource="sys_data":pagination="false" />
    </div > 
    <div style="min-width: 400px;width:70%;float: left;">
    <!-- table -->
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :loading="memberLoading"
      >
        <template v-for="(col, i) in ['dvalue']" :slot="col" slot-scope="text, record">
          <span v-if="record.key==='1'">
            <a-date-picker
              :key="col"
              v-if="record.editable"
              style="margin: -5px 0"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <a-time-picker
              :key="col"
              v-if="record.editable"
              style="margin: -5px 0"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <!-- 
              <a-date-picker :defaultValue="moment('2019-10-01', 'YYYY-MM-DD')" />
              <a-time-picker/> -->
          </span>
          <span v-if="record.key==='2'">
            <a-select
              :key="col"
              v-if="record.editable"
              style="margin: -5px 0,width:200px"
              @change="e => handleChange(e.target.value, record.key, col)"
            >  <a-select-option value="UTC+4:00 莫斯科">UTC+4:00 莫斯科</a-select-option>
            <a-select-option value="UTC+5:00 伊斯兰堡">UTC+5:00 伊斯兰堡</a-select-option>
            <a-select-option value="UTC+6:00 阿斯塔纳">UTC+6:00 阿斯塔纳</a-select-option>
            <a-select-option value="UTC+7:00 曼谷">UTC+7:00 曼谷</a-select-option>
            <a-select-option value="UTC+8:00 北京">UTC+8:00 北京</a-select-option>
            <a-select-option value="UTC+9:00 东京">UTC+9:00 东京</a-select-option>
            </a-select>
            </span>
          <span v-if="record.key > '2'"> 
          <a-input
            :key="col"
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          </span>
          <template >
            <span v-if="record.key==='3'"><a-checkbox /></span>
            <span v-if="record.key==='4'"><a-textarea
          rows="4"
          placeholder="1.cnpool.ntp.org
1.asia.pool.net.org
0.asia.pool.net.org"
          v-decorator="[
            'description',
          ]" />
          </span>
            {{ text }}
            </template>
        </template>
        <template slot="operation" slot-scope="text, record">
          <template v-if="record.editable">
            <span v-if="record.isNew">
              <a-date-picker :defaultValue="moment('2019-10-01', 'YYYY-MM-DD')" />
              <a-time-picker/>
            </span>
            <span v-else>
              <a @click="saveRow(record)">保存</a>
              <a-divider type="vertical" />
              <a @click="cancel(record.key)">取消</a>
            </span>
          </template>
            <span v-else-if="record.saveable">
            <a @click="toggle(record.key)"><a-icon type="edit" /></a>
          </span>
        </template>
      </a-table>

    <!-- fixed footer toolbar -->
    </div>
  </div>
</a-card>
</template>

<script>
export default {
  name: 'Step3',
  data () {
    return {
      description: '修改系统时间、系统时区以及NTP服务器的状态及NTP服务器地址清单。',
        loading: false,
        memberLoading: false,
        sys_columns: [
          {
            title: '类别',
            dataIndex: 'name',
            key: 'name',
            width: '100%',
            scopedSlots: { customRender: 'name' }
          },
        ],
        sys_data: [
          {
            key: '1',
            name: '当前系统时间'
          },
          {
            key: '2',
            name: '系统所在时区'
          },
          {
            key: '3',
            name: 'NTP服务器'
          }
        ],
        // table
        columns: [
          {
            title: '详情',
            dataIndex: 'dvalue',
            key: 'dvalue',
            width: '60%',
            scopedSlots: { customRender: 'dvalue' },
          },
          {
            key: 'action',
            scopedSlots: { customRender: 'operation' }
          }
        ],
        data: [
          {
            key: '1',
            dvalue: '2019-09-20 08:57:32',
            editable: false,
            saveable:true
          },
          {
            key: '2',
            dvalue: 'UTC +8:00 北京',
            editable: false,
            saveable:true
          },
          {
            key: '3',
            dvalue: '启用NTP服务',
            editable: false,
            saveable:false
          },
          {
            key: '4',
            dvalue: '',
            editable: false,
            saveable:true
          }
        ],
      
        errors: [],
      labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      form: this.$form.createForm(this),
      loading: false,
      timer: 0
    }
  },
  methods: {
    nextStep () {
      const that = this
      const { form: { validateFields } } = this
      that.loading = true
      validateFields((err, values) => {
        if (!err) {
          console.log('表单 values', values)
          that.timer = setTimeout(function () {
            that.loading = false
            that.$emit('nextStep')
          }, 150)
        } else {
          that.loading = false
        }
      })
    },
    prevStep () {
      this.$emit('prevStep')
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;

    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }

</style>
