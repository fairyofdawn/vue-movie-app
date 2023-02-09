<template>
  <footer>
    <Logo />
    <a 
      href="" 
      target="_black">
      (c){{ new Date().getFullYear() }} NAMTAE
    </a>
  </footer>
</template>

<script>
import Logo from './Logo.vue'

export default{
    components: {
        Logo
    }
}
</script>

<style lang="scss" scoped>
footer {
    padding: 70px 0;
    text-align: center;
    opacity: .7;
    .logo {
        display: block;
        margin-bottom: 4px;
    }
}    

</style>