class Router {
  constructor () {
    this.components = []
  }

  onPageLoad () {
    console.log('page loaded')
    console.log(this.components)
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search)
      const page = urlParams.get('page')

      if (page && this.components.includes(page)) {
        this.route(page)
      }
    }
  }

  defineComponent (name, clazz) {
    customElements.define(name, clazz)
    this.components.push(name)
  }

  route (component) {
    const content = document.getElementById('content')
    if (content && this.components.includes(component)) {
      const newContent = document.createElement(component)
      newContent.setAttribute('id', 'content')
      content.replaceWith(newContent)
      history.pushState(null, '', '?page=' + component)
    }
  }
}

export const router = new Router()
