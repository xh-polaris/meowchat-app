<script lang="ts" setup>

uni.addInterceptor("request", {
  invoke (args: UniNamespace.RequestOptions) {
    args.url = "https://auth.xhpolaris.com" + args.url
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
