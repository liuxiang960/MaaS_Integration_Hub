<template>
  <a-tabs size="small" :active-key="activeKey">
    <a-tab-pane key="flow-attr">
      <span slot="tab">
        <a-icon type="cluster" />
        流程属性
      </span>
      <a-form layout="vertical">
        <a-form-item
          label="流程id"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input :value="flowData.attr.id" disabled />
        </a-form-item>
      </a-form>
    </a-tab-pane>
    <a-tab-pane key="node-attr">
      <span slot="tab">
        <a-icon type="profile" />
        节点属性
      </span>

      <a-form layout="vertical">
        <a-form-item
          label="类型"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-tag color="purple">{{ currentSelect.type }}</a-tag>
        </a-form-item>
        <a-form-item
          label="id"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input :value="currentSelect.id" disabled />
        </a-form-item>
        <a-form-item
          :label="$t('name')"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            placeholder="请输入节点名称"
            :value="currentSelect.nodeName"
            @change="nodeNameChange"
          />
        </a-form-item>
      </a-form>
    </a-tab-pane>
    <a-tab-pane key="link-attr">
      <span slot="tab">
        <a-icon type="branches" />
        连线属性
      </span>
      <a-form layout="vertical">
        <a-form-item
          label="id"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input :value="currentSelect.id" disabled />
        </a-form-item>
        <a-form-item
          label="源节点"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input :value="currentSelect.sourceId" disabled />
        </a-form-item>
        <a-form-item
          label="目标节点"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input :value="currentSelect.targetId" disabled />
        </a-form-item>
        <a-form-item
          label="文本"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input :value="currentSelect.label" @change="linkLabelChange" />
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
export default {
  props: ["plumb", "flowData", "select"],
  data() {
    return {
      currentSelect: this.select,
      formItemLayout: {
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
      },
      activeKey: "flow-attr",
    };
  },
  watch: {
    select(val) {
      this.currentSelect = val;
      if (this.currentSelect.type === "link") {
        this.activeKey = "link-attr";
      } else if (!this.currentSelect.type) {
        this.activeKey = "flow-attr";
      } else {
        this.activeKey = "node-attr";
      }
    },
    currentSelect: {
      handler(val) {
        this.$emit("update:select", val);
      },
      deep: true,
    },
  },
  methods: {
    nodeNameChange(e) {
      this.currentSelect.nodeName = e.target.value;
    },
    linkLabelChange(e) {
      const label = e.target.value;
      this.currentSelect.label = label;
      const conn = this.plumb.getConnections({
        source: this.currentSelect.sourceId,
        target: this.currentSelect.targetId,
      })[0];
      const linkId = conn.canvas.id;
      const labelHandle = (e) => {
        const event = window.event || e;
        event.stopPropagation();
        this.currentSelect = this.flowData.linkList.find(
          (l) => l.id === linkId
        );
      };

      if (label !== "") {
        conn.setLabel({
          label: label,
          cssClass: `linkLabel ${linkId}`,
        });
        // 添加label点击事件
        document
          .querySelector("." + linkId)
          .addEventListener("click", labelHandle);
      } else {
        // 移除label点击事件
        document
          .querySelector("." + linkId)
          .removeEventListener("click", labelHandle);

        const labelOverlay = conn.getLabelOverlay();
        if (labelOverlay) conn.removeOverlay(labelOverlay.id);
      }
    },
  },
};
</script>
