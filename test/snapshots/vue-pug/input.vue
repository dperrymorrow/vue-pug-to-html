<template lang="jade">
  .sw-Modal
    .sw-Modal_Inner
      .sw-Modal_InnerHeader
        .sw-Modal_Title Delete?
      .sw-Modal_Text
        | Does not cancel
      .sw-Modal_Btns
        Button(
          title="cancel",
          @click="close()",
        ).mr-1
        Button(
          title="delete",
          @click="deleteData()",
        )
</template>

<script>
  import Button from 'components/buttons/Button'

  export default {
    components: {
      Button
    },
    props: {
    },
    data() {
      return {
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      deleteData() {
        this.close()
      },
    }
  }
</script>
