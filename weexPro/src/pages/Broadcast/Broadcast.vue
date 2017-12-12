<template>
  <div>
    <m-header title="广播" fixed>
      <a href="javascript:;" slot="right"><img class="m-icon-img margin-right-10" src="../../assets/images/icactionbarsearchicon.png"/></a>
      <a href="javascript:;" slot="right"><img class="m-icon-img" src="../../assets/images/icchatgreen.png"/></a>
    </m-header>
  </div>
</template>

<script>
  import mHeader from '../../components/header.vue'

  export default {
    name: 'broadcast',
    components: {
      mHeader
    }
  }
</script>
