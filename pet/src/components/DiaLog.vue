<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    size="small">
    <!-- 内容 start -->
    <component :is="currentView"></component>
    <!-- 内容 end -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        currentView: null
      };
    },
    methods: {
      showDiaLog(vnode){
        // vnode 外部传入的标签
        this.currentView=vnode;
        this.dialogVisible=true;
      }
    }
  };
</script>
