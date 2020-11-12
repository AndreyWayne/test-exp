<template>
  <div
    class="card-add"
    @click='SET_NEW_CARD'
  >
    <v-btn
      class="ma-2"
      dark
    >
      <v-icon
        dark
        left
      >
        mdi-plus-circle
      </v-icon>Добавить
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'SET_NEW_CARD'
    ])
  }
}
</script>

<style lang="css">
</style>
