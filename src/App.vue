<script lang="ts" setup>

uni.addInterceptor("request", {
  invoke (args: UniNamespace.RequestOptions) {
    args.url = "https://mock.apifox.cn/m1/1634976-0-default" + args.url
    args.timeout = 5000
  },
  success (res) {
    console.log(res)
  },
  fail (err) {
    console.log(err)
  }
})
</script>
<style>

</style>
