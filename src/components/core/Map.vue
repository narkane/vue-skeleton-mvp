<template>
  <v-container fluid>
    <v-layout row wrap>{{ test }}</v-layout>
  </v-container>
</template>

<script>
require('dotenv').config()

export default {
  data() {
    return {
      test: process.env.VUE_APP_TEST
    }
  },
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('about.TITLE')} - %s`
    }
  }
}
</script>
