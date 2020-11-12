<template>
  <div class="lib">
    <CardAction />

    <h1 class='h1 font-weight-bold lib__h1'>Библиотека</h1>

    <LibFilter />

    <div class='lib__cards' v-if='!hiddenList'>
      <div
        v-for='(item, i) in filterData'
        :key='i'
        class='lib__card'
      >
        <Card
          :data='item'
        />
      </div>
    </div>

    <v-card-title v-else>
      Результатов не найдено!
    </v-card-title>

    <CardAddNew />
  </div>
</template>

<script>
import Card from "~/components/Card/Index"
import CardAction from "~/components/Card/Actions"
import CardAddNew from "~/components/Card/AddNew"

import LibFilter from "~/components/Filter/Index"

import { mapState } from 'vuex'

export default {
  async asyncData({ store, $axios }) {

    let {
      data
    } = await $axios.get('api.json')

    store.commit('SET_DATA', data)
    store.commit('SET_FILTER_DATA', data)
    store.commit('SET_ADMIN')

    return {}
  },
  computed: {
    ...mapState([
      'filterData'
    ]),
    hiddenList() {
      return !this.filterData.length
    }
  },
  components: {
    Card,
    CardAction,
    CardAddNew,
    LibFilter
  }
}
</script>

<style lang="scss">
.lib {
  padding: 75px 0;

  &__cards {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    width: calc(100% + 20px);
    margin-left: -10px;
  }

  &__card {
    padding: 0 10px;
    width: var(--gridDesktop);
    margin-bottom: 20px;

    @media (max-width: 1263px) {
      width: 25%;
    }

    @media (max-width: 960px) {
      width: 33.3%;
    }

    @media (max-width: 767px) {
      width: var(--gridMobile);
    }
  }
}
</style>
