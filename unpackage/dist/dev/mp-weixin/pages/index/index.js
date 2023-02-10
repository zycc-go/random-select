"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_segmented_control2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_load_more2 + _easycom_uni_icons2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_load_more + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const items = common_vendor.reactive(["\u5403\u7684", "\u559D\u7684", "\u73A9\u7684", "\u4E50\u5B50"]);
    const current = common_vendor.ref(0);
    const loading = common_vendor.ref(false);
    const list = common_vendor.ref([]);
    const selected = common_vendor.ref({});
    const randomLoading = common_vendor.ref(false);
    const randomTime = common_vendor.ref(false);
    const randomCount = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      onGetList();
    });
    common_vendor.onShareAppMessage(() => {
      return {
        title: "mallz",
        desc: "\u9009\u62E9\u56F0\u96BE\u75C7\u7684\u798F\u97F3",
        path: "/pages/home/index"
      };
    });
    const arr = [
      [
        { id: 1, value: "\u871C\u96EA\u51B0\u57CE", remark: "\u4F60\u7231\u6211\u6211\u7231\u4F60...", status: 1 },
        { id: 2, value: "CoCo", remark: "", status: 0 },
        { id: 3, value: "\u963F\u6C34\u5927\u676F\u8336", remark: "\u963F\u6C34...", status: 1 }
      ],
      [
        { id: 1, value: "\u70B8\u9E21", remark: "\u914D\u5564\u9152...", status: 1 },
        { id: 2, value: "\u70E4\u9E2D", remark: "\u9E2D\u8116\u5B50", status: 1 },
        { id: 3, value: "\u70E7\u9E45", remark: "\u5C1D\u8BD5\u4E00\u4E0B", status: 0 }
      ]
    ];
    const clickItem = ({ currentIndex }) => {
      current.value = currentIndex;
      selected.value = {};
      onGetList();
    };
    const onGetList = () => {
      loading.value = true;
      setTimeout(() => {
        list.value = arr[current.value];
        loading.value = false;
      }, 500);
    };
    const onToDetail = (value, e) => {
      e.target;
      console.log(value, e.target, "longtap");
    };
    const onSelectRandom = () => {
      if (randomLoading.value) {
        clearInterval(randomTime.value);
        randomLoading.value = false;
        randomCount.value = 0;
        randomTime.value = null;
      } else {
        randomTime.value = setInterval(() => {
          if (randomCount.value > 20) {
            onSelectRandom();
            return;
          }
          randomLoading.value = true;
          const random = Math.round(Math.random() * (list.value.length - 1));
          selected.value = { ...list.value[random] };
          randomCount.value++;
        }, 100);
      }
    };
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.o(clickItem),
        b: common_vendor.p({
          current: current.value,
          values: items,
          activeColor: "#4cd964"
        }),
        c: !loading.value
      }, !loading.value ? {
        d: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.id,
            b: common_vendor.o((e) => onToDetail(item, e), item.id),
            c: "1cf27b2a-2-" + i0 + ",1cf27b2a-1",
            d: common_vendor.p({
              title: item.value,
              note: item.remark,
              rightText: "2020-02-02 20:20",
              clickable: true
            })
          };
        })
      } : {
        e: common_vendor.p({
          status: "loading",
          iconSize: "40"
        })
      }, {
        f: common_vendor.t((_a = selected.value) == null ? void 0 : _a.value),
        g: common_vendor.p({
          type: "paperplane",
          size: "40",
          color: "#eee"
        }),
        h: common_vendor.t(!randomLoading.value ? "\u5F00\u59CB" : "\u505C\u6B62"),
        i: common_vendor.o(onSelectRandom)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/My/project/random-select/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
