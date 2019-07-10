# table组件使用说明

## Attributes
| 参数          | 说明           | 类型    | 可选值               | 默认值 |
| ------------- | -------------- | ------- | -------------------- | ------ |
| table         |  表格数据       | Object  | -                    | true |
| pageParam     |  分页数据       | Object  | -                   | true     |

## Events


| 事件名称 | 说明         | 回调参数   |
| -------- | ------------ | ---------- |

## 示例
```
<template>
     <div class="tableBox">
       <voTable @search="search" :table="tableAll" :pageParam="getTable" 
       @action="action"></voTable>
     </div>
</template>
<script>
import moment from 'moment'
import voTable from '../../components/table/table'
import axios from 'axios'
import { win32 } from 'path';
export default {
  name: "user-list",
  components:{ voTable },
  data:()=>({
    tableAll:{
      defaultSort:{prop:'createdTime',order:'descending'},
      status:{disabled:true, status: '状态', isShow: false},
      tableLabel:[
        {prop:'username',title:'USER_ID',width:'150',fixed:true},
        {prop:'email',title:'ACCOUNT_EMAIL_ADDRESS',width:'200'},
        {prop:'roleName',title:'ACCOUNT_ROLE_GROUP',width:'200'},
        {prop:'createdTime',title:'CREATED_TIME',width:'200',sort:true,formatter:(row)=>{
            return moment(row.createdTime).format('YYYY-MM-DD HH:mm:ss')
          }}
      ],
      tableData: [],
      tableOption:{
        action: '操作',
        width:'100',
        buttons:[
          {label:'BTN_DETAIL',methods:'detail'},
          {label:'BTN_DELETE',methods:'delete'}
        ]
      },
      total:0
    },
    /*你的请求参数*/
    getTable:{
      pageSize: 10,
      pageNo: 1,
      username: '',
      roleId: null,
      orderBy:''
    }
  }),
  created () {
  },
  methods:{
    action(obj){
        if(obj.methods === 'detail'){
            console.log('这里添加详情函数')
        }
          if(obj.methods === 'delete'){
          console.log('这里添加删除函数')
        }
    },
    search(obj){
      this.getTable.pageSize = obj.pageSize;
      this.getTable.pageNo = obj.pageNo;
      this.getTable.orderBy = obj.orderBy;
      this.tableAll.tableData = [{
        'username': '1',
        'email': '1',
        'roleName': '1',
        'createdTime': '1'
      }]
      this.tableAll.total = 10
      /* this.$post('你的后台API地址',this.getTable).then((res) => {
        this.tableAll.tableData = res.data.result;
        this.tableAll.total = res.data.total
      }) */
    }
  },
  mounted:function(){
      /* axios.post('你的后台API地址',this.getTable).then((res) => {
        this.tableAll.tableData = res.data.result;
        this.tableAll.total = res.data.total
      }) */
      this.tableAll.tableData = [{
        'username': '1',
        'email': '1',
        'roleName': '1',
        'createdTime': '1'
      }]
      this.tableAll.total = 10
  }
}
</script>
```