<script lang="ts" setup>
uni.getProvider({
  service: "oauth",
  success (res: UniNamespace.GetProviderRes) {
    console.log(res)
    if (res.provider[0] === "weixin") {
      uni.login({
        provider: "weixin",
        complete (res) {
          console.log(res)
        }
      })
    }
  },
})
</script>
<style>

body {
  font-family: sans-serif;
  background-color: #FAFCFF;
}

</style>
