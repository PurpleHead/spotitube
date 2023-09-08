import { LitElement, html } from "lit";
import { router } from "../router";

export class AppOther extends LitElement {

    template = html `
        <h1>Other</h1>
    `

    render () {
        return this.template
    }

}