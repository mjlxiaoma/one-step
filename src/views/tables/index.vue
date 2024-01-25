<template>
  <div>
    <!--  :scroll="billScroll" -->
    <a-table :checkStrictly="true" :columns="columns" :data-source="data" :pagination="false" :row-selection="parentRowSelection"
      class="components-table-demo-nested">
      <template #expandedRowRender="{ record }">
        <a-table :columns="innerColumns" :data-source="record.child" :scroll="{ x: 'max-content' }"
          :row-selection="childRowSelection" :pagination="false">
        </a-table>
      </template>
    </a-table>
    <a-button @click="getData">获取数据</a-button>
  </div>
</template>

<script setup lang='ts'>
import type { TableProps, TableColumnType } from 'ant-design-vue';
import { ref } from 'vue'
import { list } from '@/api/index';
import * as XLSX from 'xlsx';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}
const getList = async () => {
  const res = await list({})
  console.log(res, 'res');
}
getList()
const getData = () => {
  console.log(data, 'data');
}
const checkAll = (record, index, selected) => {
  console.log(record, index, selected);
}
const columns: TableColumnType<DataType>[] = [
  {
    title: '代码',
    dataIndex: 'name'
  },
  {
    title: '营业项目',
    dataIndex: 'platform'
  },
  {
    title: '笔数',
    dataIndex: 'version'
  },
  {
    title: '金额',
    dataIndex: 'upgradeNum'
  },
  {
    title: '本次选择数量',
    dataIndex: 'upgradeNum1',
    slots: { customRender: 'Num' }
  }
]
const data = [
  {
    key: 1,
    name: '1',
    platform: '房费1',
    version: '1',
    upgradeNum: 500,
    child: [
      {
        key: 3,
        date: '2014-12-24 23:12:00',
        name: 'This is production name 0',
        state: '2022-12-12',
        upgradeNum: 'Upgraded: 56',
        code: 'xxx',
        business: '2022-12-12',
        time: '2022-11-11 16:23:48',
        comment: '这是一个备注xxxxxxxxxxxxxxxxxx',
        amount: 'xxxx',
        card: '2222222',
        sta: '正常',
        rea: '理由',
        opt: '操作'
      },
      {
        key: 4,
        date: '2014-12-24 23:12:00',
        name: 'This is production name 0',
        state: '2022-12-12',
        upgradeNum: 'Upgraded: 56',
        code: 'xxx',
        business: '2022-12-12',
        time: '2022-11-11 16:23:48',
        comment: '这是一个备注xxxxxxxxxxxxxxxxxx',
        amount: 'xxxx',
        card: '2222222',
        sta: '正常',
        rea: '理由',
        opt: '操作'
      },
      {
        key: 5,
        date: '2014-12-24 23:12:00',
        name: 'This is production name 0',
        state: '2022-12-12',
        upgradeNum: 'Upgraded: 56',
        code: 'xxx',
        business: '2022-12-12',
        time: '2022-11-11 16:23:48',
        comment: '这是一个备注xxxxxxxxxxxxxxxxxx',
        amount: 'xxxx',
        card: '2222222',
        sta: '正常',
        rea: '理由',
        opt: '操作'
      }
    ]
  },
  {
    key: 2,
    name: '2',
    platform: '房费2',
    version: '2',
    upgradeNum: 500,
    child: [
      {
        key: 6,
        date: '2014-12-24 23:12:00',
        name: 'This is production name 0',
        state: '2022-12-12',
        upgradeNum: 'Upgraded: 56',
        code: 'xxx',
        business: '2022-12-12',
        time: '2022-11-11 16:23:48',
        comment: '这是一个备注xxxxxxxxxxxxxxxxxx',
        amount: 'xxxx',
        card: '2222222',
        sta: '正常',
        rea: '理由',
        opt: '操作'
      },
      {
        key: 7,
        date: '2014-12-24 23:12:00',
        name: 'This is production name 0',
        state: '2022-12-12',
        upgradeNum: 'Upgraded: 56',
        code: 'xxx',
        business: '2022-12-12',
        time: '2022-11-11 16:23:48',
        comment: '这是一个备注xxxxxxxxxxx',
        amount: 'xxxx',
        card: '2222222',
        sta: '正常',
        rea: '理由',
        opt: '操作'
      },
      {
        key: 8,
        date: '2014-12-24 23:12:00',
        name: 'This is production name 0',
        state: '2022-12-12',
        upgradeNum: 'Upgraded: 56',
        code: 'xxx',
        business: '2022-12-12',
        time: '2022-11-11 16:23:48',
        comment: '这是一个备注xxxxxxxxxxxxxxxxxx',
        amount: 'xxxx',
        card: '2222222',
        sta: '正常',
        rea: '理由',
        opt: '操作'
      }
    ]
  }
]

const innerColumns = [
  {
    title: '账目ID',
    dataIndex: 'date'
  },
  {
    title: '房号',
    dataIndex: 'name'
  },
  {
    title: '营业日期',
    dataIndex: 'date'
  },
  {
    title: '账目类型',
    dataIndex: 'upgradeNum'
  },
  {
    title: '代码',
    dataIndex: 'code'
  },
  {
    title: '营业项目',
    dataIndex: 'business'
  },
  {
    title: '金额',
    dataIndex: 'amount'
  },
  {
    title: '银行卡号',
    dataIndex: 'card'
  },
  {
    title: '状态',
    dataIndex: 'sta'
  },
  {
    title: '入账时间',
    dataIndex: 'time'
  },
  {
    title: '备注',
    dataIndex: 'comment'
  },
  {
    title: '理由',
    dataIndex: 'rea'
  },
  {
    title: '操作',
    dataIndex: 'opt'
  }
]

//获取数据时更新获取dom的节点 billRef 为table的节点
const checkboxDomList = ref<any>()
// const queryData = async () => {
//   const res = await fetchData()
//   if (res.data) {
//     data.value = res.data
//     // checkboxDomList.value = [...billRef.value.querySelectorAll('label.ant-checkbox-wrapper span:not(.ant-checkbox-inner)')]
//     checkboxDomList.value = [document.querySelectorAll('label.ant-checkbox-wrapper span:not(.ant-checkbox-inner)')]
//   }
// }
checkboxDomList.value = [document.querySelectorAll('td')]
const childSelectedRowKeys = ref<any>([]) //选中的key
const childRowSelection = {
  fixed: true,
  checkStrictly:true,
  hideSelectAll: true,
  selectedRowKeys: childSelectedRowKeys,
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);

    //  record：选择的行数据 selected：当前行是否选择 true/false selectedRows:选择的行 如果选择分组的行上个数据会变成[undefined, undefined, {…}]
    // 1.设置子Table手动选择/取消某行的回调 onSelect
    // 1.1 判断selected true：选中，将key值添加到childSelectedRowKeys，false：取消选中，将key值从childSelectedRowKeys中移除
    if (selected) {
      childSelectedRowKeys.value.push(record.key)
    } else {
      childSelectedRowKeys.value.splice(childSelectedRowKeys.value.findIndex(item => item === record.key), 1)
    }

    // 1.1.1 必须去除undefined，否则selectedRows会将其他子Table中选中的key值放到数组中，但是值为undefined，如：[ undefined，1，uundefined]
    selectedRows = selectedRows.filter(item => item !== undefined)

    // 1.2 判断selectedRows的长度是否为data中child的长度，相等，就将父table选中，不等就不选中
    for (const [index, item] of data.entries()) {
      // 1.2.1 如果当前选择的在一个分组中   find返回对象  没有undefined
      if (item.child.find(d => d.key === record.key)) {
        // 1.2.2 判断长度相等  将父级的key加入
        if (item.child.length === selectedRows.length) {
          parentSelectedRowKeys.value.push(item.key)
        } else {
          // 1.2.3 不相等 将父级的key进行删除
          if (parentSelectedRowKeys.value.some(d => d === item.key)) {
            parentSelectedRowKeys.value.splice(parentSelectedRowKeys.value.findIndex(item1 => item1 === item.key), 1)
          }
          // 1.2.4 先找出data.child的数据的key集合
          const setChildArr = item.child.map(item => item.key)
          // 1.2.5 更新父级行的选择状态  判断选择的行中是否存在key在setChildArr中
          // console.log(checkboxDomList.value, 'checkboxDomList.value');
          console.log(111);

          setTimeout(() => {
            if (setChildArr.some(k => selectedRows.some(j => k === j.key))) {
              console.log(checkboxDomList.value, 'checkboxDomList.value[index + 1]');

              checkboxDomList.value[index + 1].setAttribute('class', 'ant-checkbox-indeterminate1')
            } else {
              console.log(checkboxDomList.value, 'checkboxDomList.value[index + 1]');

              checkboxDomList.value[index + 1].removeAttribute('class', 'ant-checkbox-indeterminate1')
            }
          }, 0)
        }
        // 1.2.6 判断所有子选项长度  是否为全选
        checkAllSelected()
        break
      }
    }
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);

  },
}
// 外部多选内部多选
const parentSelectedRowKeys = ref<any>([])
const parentRowSelection = {
  fixed: true,
  checkStrictly:true,
  selectedRowKeys: parentSelectedRowKeys,
  onChange: (selectedRowKeys: string[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
  onSelect: (record, selected, selectedRows) => {
    // console.log(record, selected, selectedRows);
    // setChildArr：选择父Table下的所有子选项
    const setChildArr = data.find(d => d.key === record.key).child.map(item => item.key)
    // 第一步 判断selected true：选中，false，取消选中
    if (selected) {
      // 第二步，父Table选中，子Table全选中（全部整合到一起，然后去重）
      parentSelectedRowKeys.value.push(record.key)
      childSelectedRowKeys.value = Array.from(new Set([...setChildArr, ...childSelectedRowKeys.value]))
    } else {
      // 第二步，父Table取消选中，子Table全取消选中（针对childSelectedRowKeys，过滤掉取消选中的父Table下的所有子Table的key）
      parentSelectedRowKeys.value.splice(parentSelectedRowKeys.value.findIndex(item => item === record.key), 1)
      childSelectedRowKeys.value = childSelectedRowKeys.value.filter(item => !setChildArr.some(e => e === item))


    }
    // console.log(parentSelectedRowKeys.value, childSelectedRowKeys.value);
    // 第三步， 判断所有子选项长度  是否为全选
    checkAllSelected()
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    // 将改变的父Table下的子Table下的key都添加到setChildArr中
    console.log(selectedRows, 'selectedRows');

    let setChildArr = <any>[]
    changeRows.forEach(e => {
      setChildArr = [...setChildArr, ...e.child.map(item => item.key)]
    })
    // 第一步判断selected true：全选，false：取消全选
    if (selected) {
      // 第二步：父Table选中，子Table全选中，设置子Table的SelectedRowKeys
      parentSelectedRowKeys.value = Array.from(new Set([...parentSelectedRowKeys.value, ...changeRows.map(item => item.key)]))
      childSelectedRowKeys.value = setChildArr
    } else {
      // 第二步：父Table取消选中，子Table全取消选中，设置子Table的SelectedRowKeys
      parentSelectedRowKeys.value = parentSelectedRowKeys.value.filter(item => !changeRows.some(e => e.key === item))
      childSelectedRowKeys.value = []
    }
  }
}
const checkAllSelected = () => {
  const allChildKey = <any>[]
  data.forEach(item => {
    allChildKey.push(...item.child.map(i => i.key))
  })
  // setTimeout(() => {
  //   // 如果有长度 为中间态
  //   if (childSelectedRowKeys.value.length) {
  //     checkboxDomList.value[0].setAttribute('class', 'ant-checkbox-indeterminate')
  //     // 全部相等
  //     if (allChildKey.length === childSelectedRowKeys.value.length) {
  //       checkboxDomList.value[0].setAttribute('class', 'ant-checkbox-checked')
  //     } else {
  //       checkboxDomList.value[0].removeAttribute('class', 'ant-checkbox-checked')
  //       checkboxDomList.value[0].setAttribute('class', 'ant-checkbox-indeterminate')
  //     }
  //   } else {
  //     checkboxDomList.value[0].removeAttribute('class', 'ant-checkbox-indeterminate')
  //   }
  // }, 0)
}


</script>

<style lang="scss" scoped></style>