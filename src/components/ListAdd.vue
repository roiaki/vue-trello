<template>
  <form :class="classList" @submit.prevent="addList">
    <input 
      v-model="title"
      type="text"
      class="text-input"
      placeholder="リストの追加はこちらから"
      @focusin="startEditing"
      @focusout="finishEditing"
    >
    <button
      type="submit"
      class="add-button"
      v-if="isEditing || titleExists"
    >
      Add
    </button>
  </form>
</template>

<script>
export default {
  // データプロパティ、コンポーネントの内部状態を保持する
  // this.title this.isEditing でアクセスできる
  data: function() {
    return {
      title: '',
      isEditing: false,
    }
  },
  computed: {
    classList() {
      const classList = ['addlist']
      if (this.isEditing) {
        classList.push('active')
      }
      if (this.titleExists) {
        classList.push('addable')
      }
      return classList
    },
    titleExists() {
      return this.title.length > 0
    },
  },
  methods: {
    addList: function() {
      // storeのactionsを呼ぶ
      //  -> actions -> mutations
      this.$store.dispatch('addlistAction', { title: this.title })
      this.title = ''
    },
    startEditing: function() {
      this.isEditing = true
    },
    finishEditing: function() {
      this.isEditing = false
    },
  }
}
</script>
    