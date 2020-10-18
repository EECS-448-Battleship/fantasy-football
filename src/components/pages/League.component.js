import {Component} from '../../../lib/vues6.js'

const template = `
<div class="page-league">
League
</div>
`
export default class LeagueComponent extends Component {
    static get selector() { return 'page-league' }
    static get template() { return template }
    static get props() { return [] }

    async vue_on_create() {

    }
}
