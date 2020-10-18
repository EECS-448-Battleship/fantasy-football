import {Component} from '../../lib/vues6.js'
import {router} from '../module/routing.js'

const template = `
<a href="#" @click="on_click()">{{ text }}</a>
`
export default class LinkComponent extends Component {
    static get selector() { return 'app-link' }
    static get template() { return template }
    static get props() { return ['href', 'args', 'text'] }

    on_click() {
        router.navigate(this.href, this.args)
    }
}