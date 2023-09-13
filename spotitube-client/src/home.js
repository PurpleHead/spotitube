import { LitElement, html } from 'lit'
import { spotifyService } from '../services/spotify-service'

export class AppHome extends LitElement {
  template = html`
        <h1>Home</h1>
        <button @click=${this.click}>Click</button>
    `

  click (event) {
    spotifyService.login()
  }

  render () {
    return this.template
  }
}
