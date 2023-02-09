<template>
  <RouterLink 
    to="/" 
    class="logo">
    <span>OMDbAPI</span>.COM
  </RouterLink>
</template>

<style lang="scss" scoped>
//@import "~/scss/main.scss"; => webpack.config.js 에서 자동으로 로드되게 설정함. 

.logo {
    font-family: "Oswald", sans-serif;
    font-size: 20px;
    color: $black;
    text-decoration: none;
    &:hover {
      color: $black;
    }
    span {
        color: $primary;
    }
}
</style>