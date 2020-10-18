import {Component} from '../../../lib/vues6.js'

const template = `
<div class="page-add-players">
Add Players
</div>
`
export default class AddPlayersComponent extends Component {
    static get selector() { return 'page-add-players' }
    static get props() { return [] }
    static get template() { return template }

    async vue_on_create() {

    }
}
