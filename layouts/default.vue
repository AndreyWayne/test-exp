<template>
  <v-app>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',

      configGrid: {
        desktop: 5,
        mobile: 1
      }
    }
  },

  mounted() {
    document.documentElement.style.setProperty('--gridDesktop', `${ 100 / this.configGrid.desktop }%`)
    document.documentElement.style.setProperty('--gridMobile', `${ 100 / this.configGrid.mobile }%`)
  }
}
</script>
