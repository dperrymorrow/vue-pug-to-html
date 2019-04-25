<template>
<div class="sw-Modal">
  <div class="sw-Modal_Inner">
    <div class="sw-Modal_InnerHeader">
      <div class="sw-Modal_Title">Delete?</div>
    </div>
    <div class="sw-Modal_Text">Does not cancel</div>
    <div class="sw-Modal_Btns">
      <Button title="cancel" @click="close()" class="mr-1"></Button>
      <Button title="delete" @click="deleteData()"></Button>
    </div>
  </div>
</div>
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
