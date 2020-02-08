<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <img src="../assets/image/404.png" alt="" />
      <div class="theme-msg">{{ getMsg() }}</div>
      <RouterLink class="theme-come-back" to="/">
        回到首页
      </RouterLink>
    </div>
  </div>
</template>

<script>
  const msgs = [
    `该页面库存不足，站长补货中`,
    `访问的页面似乎被外星人劫持了`,
    `这个页面被偷走了，案件正在调查中`,
    `时空出现紊乱，该页面穿越了`
  ];

  export default {
    methods: {
      getMsg() {
        return msgs[Math.floor(Math.random() * msgs.length)];
      }
    }
  };
</script>
<style lang="stylus" scoped>
  .theme-container
    text-align center;
  .theme-default-content
  	position relative;
  .theme-msg
  	position absolute;
  	bottom 2em;
  	left 0;
  	right 0;
  	margin: auto;
  	color: #aacfd0;
  .theme-come-back
  	position absolute;
  	left 0;
  	right 0;
  	margin: auto;
  	bottom .5em;
</style>
