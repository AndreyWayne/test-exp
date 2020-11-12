<template>
  <v-row justify="center" class="actions">
    <v-snackbar
      v-model="error.dialog"
    >
      {{ error.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          @click="error.dialog = ''"
        >
          Убрать
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ headerTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>

            <v-row>
              <v-col>
                <v-text-field
                  label="Название*"
                  required
                  v-model='title'
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  label="Описание*"
                  required
                  v-model="description"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  label="Тег*"
                  required
                  v-model="tag"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-card-text class="actions__text">
                  Фото*
                </v-card-text>

                <div class="actions__upload">
                  <v-file-input
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-camera"
                    hide-input
                    @change='setUploadImage'
                    class="actions__upload-input"
                  ></v-file-input>
                  <v-img
                    v-for='(item, i) in image'
                    :key='i'
                    max-height="50"
                    max-width="50"
                    :src="item"
                  ></v-img>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-card-text class="actions__text">
                  Рейтинг*
                </v-card-text>
                <v-rating
                  hover
                  length="5"
                  size="24"
                  v-model='rating'
                  class="actions__rating"
                ></v-rating>
              </v-col>
            </v-row>

          </v-container>
          <small>*Обязательные поля</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click='SET_HIDE_DIALOG'
          >
            Закрыть
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="setSave"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="confirm"
      max-width="320"
    >
      <v-card>
        <v-card-text size="18">
          Вы подтверждаете свое действие?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="setChangeData"
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
  </v-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      image: [],
      title: '',
      description: '',
      tag: '',
      rating: 1,
      id: null,

      error: {
        dialog: false,
        message: ''
      },

      confirm: false
    }
  },
  computed: {
    ...mapState([
      'data',
      'actions'
    ]),
    dialog() {
      return this.actions.dialog
    },
    headerTitle() {
      return this.actions.status === 'new' ? 'Добавление' : 'Редактирование'
    },
    allData() {
      return {
        title: this.title,
        description: this.description,
        tag: this.tag,
        rating: this.rating,
        image: this.image[0],
        id: this.id
      }
    }
  },
  methods: {
    ...mapActions([
      'SET_HIDE_DIALOG'
    ]),
    ...mapMutations([
      'SET_DATA_ADD',
      'SET_DATA_CHANGE'
    ]),
    setUploadImage(e) {
      let input = event.target
      let preview = ''
      let file = event.target.files[0]
      let reader  = new FileReader()
      let vue = this

      reader.onloadend = function () {
        preview = reader.result
        vue['image'] = []
        vue['image'].push(preview)
      }

      if (file) {
        reader.readAsDataURL(file)
      } else {
        preview = ''
      }
    },
    setInitData() {
      this.title = this.actions.title
      this.description = this.actions.description
      this.rating = this.actions.rating
      this.tag = this.actions.tag

      this.actions.status === 'new'
        ? this.id = this.data.length + 1
        : this.id = this.actions.id

      this.actions.image
        ? this.image = [this.actions.image]
        : this.image = []
    },
    setChangeError(msg) {
      this.error.dialog = true
      this.error.message = msg
    },
    setValidate() {
      if (!this.title.trim().length) {
        this.setChangeError('Заполните название')

        return false
      }

      if (!this.description.trim().length) {
        this.setChangeError('Заполните описание')

        return false
      }

      if (!this.tag.trim().length) {
        this.setChangeError('Заполните тег')

        return false
      }

      if (!this.image.length) {
        this.setChangeError('Вставьте фотографию')

        return false
      }

      return true
    },
    setChangeData() {
      this.SET_DATA_CHANGE(this.allData)
      this.SET_HIDE_DIALOG()

      this.confirm = false
    },
    setSave() {
      let resultValidate = this.setValidate()

      if (resultValidate) {

        if (this.actions.status === 'new') {
          this.SET_DATA_ADD(this.allData)
          this.SET_HIDE_DIALOG()
        } else {
          this.confirm = true
        }
      }
    }
  },
  watch: {
    actions() {
      this.setInitData()
    }
  }
}
</script>

<style scoped lang="scss">
.actions {
  &__rating {
    margin-left: -10px;
  }

  &__text {
    padding: 0;
    margin: 0;
  }

  &__upload {
    display: flex;
    align-items: center;
  }

  &__upload-input {
    flex: 0;
    margin-right: 10px;
    padding-top: 0;
    margin-top: 0;
  }
}
</style>
