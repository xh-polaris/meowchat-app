<script lang="ts" setup>

uni.addInterceptor("request", {
  invoke (args: UniNamespace.RequestOptions) {
    args.url = "https://mock.apifox.cn/m1/1634976-0-default" + args.url
    args.timeout = 5000
  },
  fail (err: UniNamespace.GeneralCallbackResult) {
    console.log(err)
  }
})
</script>
<style>

</style>
