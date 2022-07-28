import urql from '@urql/vue'

// provide urql Client as plugin to nuxt
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(urql, {
        url: 'https://glacial-ocean-93602.herokuapp.com/graphql/',
    })
})