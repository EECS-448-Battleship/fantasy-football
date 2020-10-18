import {Component} from '../../../lib/vues6.js'

const template = `
<div class="page-scores">
Scores
</div>
`
export default class ScoresComponent extends Component {
    static get selector() { return 'page-scores' }
    static get template() { return template }
    static get props() { return [] }

    async vue_on_create() {

    }
}
