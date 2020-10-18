import {Component} from '../../../lib/vues6.js'

const template = `
<div class="page-my-team">
My Team
</div>
`
export default class MyTeamComponent extends Component {
    static get selector() { return 'page-my-team' }
    static get template() { return template }
    static get props() { return [] }

    async vue_on_create() {

    }
}
