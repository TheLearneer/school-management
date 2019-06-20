import bodyParser from 'body-parser'

export default {
  mode: 'universal',
  head: {
    title: 'School Management',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Managing your school\'s/college\'s details could have never been easier. With basic setup in the dashboard you can do it with ease.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  css: [],
  plugins: [],
  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa'
	// ,'@nuxtjs/eslint-module'
  ],
  auth: {
	strategies: {
	  local: {
		endpoints: {
		  login: { url: '/api/auth/login', method: 'post', propertyName: 'token.accessToken' },
		  logout: { url: '/api/auth/logout', method: 'post' },
		  user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
		}
	  }
	}
  },
  axios: { proxy: true },
  proxy: {
    '/api': 'https://school-management-api.glitch.me'
  },
  build: {
    extend(config, ctx) {}
  }
}
