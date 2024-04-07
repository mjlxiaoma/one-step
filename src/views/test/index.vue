
<template>
  <m-antd-select-table ref="tantdselecttable" selectWidth="40%" v-model="state.selectVal" :table="state.table"
    :columns="state.table.columns" :scroll="{ x: 1000, y: 400 }" :keywords="{ label: 'name', value: 'code' }"
    @checked-change="checkedChange" placeholder="单选"></m-antd-select-table>
  <br>
  <a-input v-model:value="inp" @change="changeInpVal" style="width: 200px;" />
  输入框值{{ inp }}
  <div class="box" style="width: 200px;height: 200px;background-color: #f60;opacity: 1;">父盒子
    <div class="child" style="width: 100px;height: 100px;background-color: skyblue;opacity: 0.3;">子盒子</div>
  </div>
  <a href="tel:13116886815">点击拨打 13116886815</a>
</template>
<script setup lang="ts">
import MAntdSelectTable from "@/components/MAntdSelectTable/index.vue";
import { reactive, ref } from "vue";
const inp = ref()
const tantdselecttable: any = ref<HTMLElement | null>(null);
const state: any = reactive({

  selectVal: null,
  table: {
    pagination: {
      current: 1,
      total: 0, // 总数
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "40", "80", "100"],
      showTotal: (total: any) => `共 ${total} 条`, // 分页中显示总的数据
      pageSize: 10 // 每页条数，所有页设置统一的条数
    },
    data: [
      { id: 1, code: 1, name: "物料名称1", spec: "物料规格1", unitName: "吨" },
      { id: 2, code: 2, name: "物料名称2", spec: "物料规格2", unitName: "吨" },
      { id: 3, code: 3, name: "物料名称3", spec: "物料规格3", unitName: "吨" },
      { id: 4, code: 4, name: "物料名称4", spec: "物料规格4", unitName: "吨" },
      { id: 5, code: 5, name: "物料名称5", spec: "物料规格5", unitName: "吨" },
      { id: 6, code: 6, name: "物料名称6", spec: "物料规格6", unitName: "吨" },
      { id: 7, code: 7, name: "物料名称7", spec: "物料规格7", unitName: "吨" },
      { id: 8, code: 8, name: "物料名称8", spec: "物料规格8", unitName: "吨" },
      { id: 9, code: 9, name: "物料名称9", spec: "物料规格9", unitName: "吨" }
    ],
    columns: [
      { title: "物料编号", minWidth: 60, dataIndex: "code" },
      { title: "物料名称", minWidth: 120, dataIndex: "name" },
      { title: "规格", minWidth: 120, dataIndex: "spec" },
      { title: "单位", minWidth: 80, dataIndex: "unitName" },
      { title: "物料编号1", minWidth: 120, dataIndex: "code" },
      { title: "物料名称1", minWidth: 120, dataIndex: "name" }
    ]
  }
});
const checkedChange = (keys: any, row: any) => {
  console.log("传给后台的值", keys, row);
  console.log("传给v-model", state.selectVal);
};
let arr = [
  { name: '孙悟空', age: 20, work: '降妖' },
  { name: '猪八戒', age: 19, work: '好色' },
  { name: '沙悟净', age: 18, work: '听话' },
  { name: '沙悟净', age: 18, work: '老实' },
  { name: '沙悟净', age: 18, work: '憨厚' },
]
let newArr = arr.filter(v => v.age === 18)
console.log(newArr, 'newArr');
newArr[0].name = '唐僧'
console.log(arr, 'arr');
//手写eventBus
class EventBus {

}
// 防抖
const debounce = (fn, t) => {
  let timer = null
  return function () { //这里是每次变化要执行的函数
    if (timer) {
      console.log(timer, 'timer');

      clearTimeout(timer)
    }
    timer = setTimeout(fn, t)
  }
}
const changeVal = () => {
  console.log('执行一次');
}
// const changeInpVal = debounce(changeVal, 1000)
/**
 * 当第一次调用防抖函数返回的新函数时，timer 变量为 null，所以不会执行 clearTimeout(timer) 部分。相反，会立即设置一个新的定时器
 * 这样做的效果是，只有在最后一次调用之后的 t 毫秒内没有再次调用时，定时器才会触发执行函数 fn。
 * 如果在 t 毫秒内有新的调用，就会取消之前的定时器，重新设置一个新的，确保函数不会在短时间内被多次执行。
 * 这种机制确保了在高频率事件触发的情况下，只有在事件停止触发后的一段时间内才会执行函数，有效地减少了函数的执行次数。
 */

//手写防抖
function myDebounde(fn, t) {
  let timerId = null
  return function () {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(fn, t);
  }
}
// 手写节流
const changeInpVal = throttle(changeVal)
function throttle(fn) {
  let flag = null; // 通过闭包保存一个标记
  return function () {
    if (flag) return; // 当定时器没有执行的时候标记永远是null
    flag = setTimeout(() => {
      fn.apply(this, arguments);
      // 最后在setTimeout执行完毕后再把标记设置为null(关键)
      // 表示可以执行下一次循环了。
      flag = null;
    }, 500);
  };
}
// url字符串截取转为键值对
let strUrl = 'http://mooc1.jxjyzx.xust.edu.cn/mooc-ans/mycourse/studentstudy?chapterId=329552207&courseId=213068363&clazzid=92609108&enc=770ef1877414c58803f7baa3dcb28807'
function urlToKeyVal(strUrl) {
  let obj = {}
  let str = strUrl.split('?')[1] //获取?后的地址
  let paramsArr = str.split('&') //使用&符号分割
  // 遍历使用=截取获得一个0 1 的数组
  // 0为key 1为value
  // 给obj赋值key value即可 最后返回
  for (let i = 0; i < paramsArr.length; i++) {
    let arr = paramsArr[i].split('=')
    obj[arr[0]] = arr[1]
  }
  return obj
}
const a = urlToKeyVal(strUrl)
console.log(a, 'a');

// 手写eventBus

</script>
