export const state = () => ({
  data: [],
  filterData: [],

  filterTag: '',

  admin: false,

  actions: {
    dialog: false,
    status: 'new',
    title: '',
    description: '',
    rating: 5,
    image: '',
    tag: '',
    id: null
  }
})

export const mutations = {
  SET_DATA(state, value) {
    state.data = value
  },
  SET_DATA_ADD(state, value) {
    state.data.push(value)
  },
  SET_DATA_CHANGE(state, value) {
    const index = state.data.findIndex(x => x.id === value.id)

    state.data.splice(index, 1, value)
  },
  SET_DATA_DELETE(state, value) {
    const index = state.data.findIndex(x => x.id === value.id)

    state.data.splice(index, 1)
  },
  SET_FILTER_DATA(state, value) {
    state.filterData = value
  },
  SET_FILTER_TAG(state, value) {
    state.filterTag = value
  },
  SET_ACTIONS(state, value) {
    state.actions = value
  },
  SET_ADMIN(state) {
    state.admin = true
  }
}

export const actions = {
  SET_NEW_CARD(ctx) {
    ctx.commit('SET_ACTIONS', {
      dialog: true,
      status: 'new',
      title: '',
      description: '',
      rating: 5,
      image: '',
      tag: '',
      id: null
    })
  },
  SET_CHANGE_CARD(ctx, value) {
    ctx.commit('SET_ACTIONS', {
      dialog: true,
      status: 'change',
      title: value.title,
      description: value.description,
      rating: value.rating,
      image: value.image,
      tag: value.tag,
      id: value.id
    })
  },
  SET_HIDE_DIALOG(ctx) {
    ctx.commit('SET_ACTIONS', {
      dialog: false,
      status: 'new',
      title: '',
      description: '',
      rating: 5,
      image: '',
      tag: '',
      id: null
    })
  }
}
