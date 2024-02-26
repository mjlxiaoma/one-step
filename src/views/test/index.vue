
<template>
  <m-antd-select-table ref="tantdselecttable" selectWidth="40%" v-model="state.selectVal" :table="state.table"
    :columns="state.table.columns" :scroll="{ x: 1000, y: 400 }" :keywords="{ label: 'name', value: 'code' }"
    @checked-change="checkedChange" placeholder="单选"></m-antd-select-table>
  <br>
  <a-input v-model:value="inp" @input="handleInput" style="width: 200px;" />
  <!-- <a-input-number style="width: 100%" v-model:value="inp"
    :formatter="(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
    :parser="(value) => `${value}`.replace(/\$\s?|(,*)/g, '')">
  </a-input-number> -->
  输入框值{{ inp }}
  <div class="box" style="width: 200px;height: 200px;background-color: #f60;opacity: 1;">父盒子
    <div class="child" style="width: 100px;height: 100px;background-color: skyblue;opacity: 0.3;">子盒子</div>
  </div>
</template>
<script setup lang="ts">
import MAntdSelectTable from "@/components/MAntdSelectTable/index.vue";
import { reactive, ref, watch } from "vue";
const handleInput = (event) => {
  const inputRegex = /^[0-9]*(\.[0-9]+)?$/;
  const inputValue = inp.value;

  if (!inputRegex.test(inputValue)) {
    // 输入不符合规则，可以进行相应的处理，例如清空输入框
    // 或者给用户提示信息
    console.log('请输入整数或小数');
    inp.value = ''; // 清空输入框
  } else {
    // 输入符合规则，进行其他处理
  }
};
const inp = ref()
console.log('执行了created');
watch(inp.value, () => {
  console.log('执行了watch');
},);
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
</script>
