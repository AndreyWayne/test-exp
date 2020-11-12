<template>
  <div class="filter">
    <v-text-field
      placeholder="Поиск"
      v-model="search"
      class="filter-input"
    ></v-text-field>
    <div class="filter__chips" v-if='filterTag'>
      <div class="filter__chip">
        <v-chip
          class="ma-2"
          close
          color="green"
          text-color="white"
          @click:close="setCloseFilterTag"
        >
          {{ filterTag }}
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState([
      'data',
      'filterTag'
    ]),
    filterData() {
      if (!this.search && !this.filterTag) return this.data

      let search = this.search.toLowerCase()

      return this.data.filter(item => {
        let result = (
          item.title.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search) ||
          item.tag.toLowerCase().includes(search) ||
          item.rating === +search
        )

        return (this.filterTag)
          ? item.tag.toLowerCase() === this.filterTag.toLowerCase() && result
          : result
      })
    }
  },
  methods: {
    ...mapMutations([
      'SET_FILTER_DATA',
      'SET_FILTER_TAG'
    ]),
    setCloseFilterTag() {
      this.SET_FILTER_TAG('')
    }
  },
  watch: {
    filterData() {
      this.SET_FILTER_DATA(this.filterData)
    }
  }
}
</script>

<style scoped lang="scss">
.filter {
  &__chips {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  &__chip {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
