class Router {
  constructor () {
    this.components = []
  }

  onPageLoad () {
    console.log('page loaded')
    this.defaultPage = 'app-home'
    this.routeToUrlParam()
    window.onpopstate = () => this.routeToUrlParam()
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
      history.pushState(null, '', '?page=' + component)
    }
  }

  routeToUrlParam () {
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search)
      const page = urlParams.get('page')

      if (page) {
        this.route(page)
      }
    } else {
      // Route to home, if search is empty
      this.route()
    }
  }
}

export const router = new Router()
