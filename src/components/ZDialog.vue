<template>
  <el-dialog
    :width="width"
    :title="title"
    :modal="modal"
    :visible.sync="visible"
    class="zgyDialog"
    :append-to-body="true"
    center
  >
    <slot></slot>
    <span class="dialog-footer" slot="footer" v-if="footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onConfirm">
        {{ confirmText }}
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
/*
 *  打包编译之后有问题，尚未解决，会出现slot=footer 下默认为undefind，所以要替换低下按钮，要先隐藏footer
 * */
export default {
  name: "ZDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    modal: {
      type: Boolean,
      default: true,
    },
    footer: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
    },
    confirmText: {
      type: String,
      default: "确认",
    },
    width: {
      type: String,
      default: "465px",
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  watch: {
    dialogVisible(value) {
      this.visible = value;
    },
    visible(value) {
      if (!value) {
        this.$emit("onClose");
      }
    },
  },
  methods: {
    onConfirm() {
      this.$emit("onConfirm");
    },
    onClose() {
      this.$emit("onClose");
    },
  },
};
</script>

<style>
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
