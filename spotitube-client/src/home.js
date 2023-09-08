import { LitElement, html } from "lit";
import { router } from "../router";

export class AppHome extends LitElement {

    template = html `
        <h1>Home</h1>
        <button @click=${this.click}>Click</button>
    `

    click(event) {
        router.route('app-other')
    }

    render() {
        return this.template
    }
}