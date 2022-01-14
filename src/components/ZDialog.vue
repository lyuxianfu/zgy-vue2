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
    <span v-if="footer" class="dialog-footer">
      <slot name="footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onConfirm">
          {{ confirmText }}
        </el-button>
      </slot>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "EnterManaDialog",
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

<style scoped></style>
