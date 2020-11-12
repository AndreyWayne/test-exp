<template>
  <v-card class="lib-card">
    <v-dialog
      v-model="confirm"
      max-width="320"
    >
      <v-card class="lib-card__dialog-card">
        <v-spacer></v-spacer>
        <v-card-text size="18">
          Вы подтверждаете свое действие?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="setDeleteCard"
          >
            Да
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="confirm = false"
          >
            Нет
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-img
      :src="data.image"
      height="250px"
    ></v-img>

    <v-card-title class="lib-card__title">
      {{ data.title }}
    </v-card-title>

    <div class="lib-card__hidden theme--dark v-application">

      <v-card-text class="lib-card__chips">
        <v-chip
          class="ma-2 lib-card__chip"
          color="green"
          @click="SET_FILTER_TAG(`${ data.tag }`)"
        >
          {{ data.tag }}
        </v-chip>
      </v-card-text>

      <div class="lib-card__subtitle">
        <v-card-text>
          {{ data.description }}
        </v-card-text>
      </div>

      <div class="lib-card__details">
        <v-card-text>
          <v-rating
            :value="data.rating"
            color="amber"
            dense
            half-increments
            readonly
            size="16"
          > </v-rating>
        </v-card-text>

        <v-card-text v-if='admin'>
          <div class="lib-card__actions">

            <v-icon
              medium
              class="lib-card__action"
              color="blue"
              @click='setChangeCard'
            > mdi-wrench
            </v-icon>

            <v-icon
              medium
              class="lib-card__action"
              color="red"
              @click='confirm = true'
            > mdi-delete
            </v-icon>

          </div>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  props: {
    data: Object
  },
  data() {
    return {
      confirm: false
    }
  },
  computed: {
    ...mapState([
      'admin'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_DATA_DELETE',
      'SET_FILTER_TAG'
    ]),
    ...mapActions([
      'SET_CHANGE_CARD'
    ]),
    setChangeCard() {
      this.SET_CHANGE_CARD(this.data)
    },
    setDeleteCard() {
      this.SET_DATA_DELETE(this.data)
      this.confirm = false
    }
  }
}
</script>

<style scoped lang='scss'>
.lib-card {
  position: relative;

  &__title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    display: block;
  }

  &__hidden {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    height: 100%;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: opacity .3s;
    width: 100%;

    &:hover {
      opacity: 1;
    }
  }

  &__subtitle {
    flex-shrink: 2;
    overflow-y: auto;
  }

  &__details {
    height: 64px;
    background-color: #1f1f1f;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__action {
    margin-left: 10px;
    cursor: pointer;
    &:first-child {
      margin-left: 0;
    }
  }

  &__chip {
    cursor: pointer;
  }

  &__chips {
    max-width: 100%;
    padding: 0 10px;
  }

  &__dialog-card {
    padding-top: 20px;
  }
}
</style>

<style>
.theme--dark.v-chip {
  margin: 5px 0 !important;
}
</style>
