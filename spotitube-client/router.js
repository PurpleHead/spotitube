import { spotifyService } from './services/spotify-service'

class Router {
  constructor () {
    this.components = []
  }

  onPageLoad () {
    console.log('page loaded')
    this.defaultPage = 'app-home'
    this.handleUrlParams()
    window.onpopstate = () => this.handleUrlParams()
  }

  defineComponent (name, clazz) {
    customElements.define(name, clazz)
    this.components.push(name)
  }

  route (component) {
    const content = document.getElementById('content')
    if (!this.components.includes(component)) {
      component = this.defaultPage
    }
    if (content) {
      const newContent = document.createElement(component)
      newContent.setAttribute('id', 'content')
      content.replaceWith(newContent)

      this.updateUrlParams(new URLSearchParams({
        page: component
      }))
    }
  }

  // Updates the url params without reloading the page
  updateUrlParams (urlParams) {
    history.pushState(null, '', `?${urlParams.toString()}`)
  }

  handleUrlParams () {
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search)
      const page = urlParams.get('page')
      const spotifyAuthCode = urlParams.get('code')

      if (spotifyAuthCode) {
        spotifyService.requestAccessToken(spotifyAuthCode)
      } else if (page) {
        this.route(page)
      }
    } else {
      // Route to home, if search is empty
      this.route() // TODO
    }
  }
}

export const router = new Router()
