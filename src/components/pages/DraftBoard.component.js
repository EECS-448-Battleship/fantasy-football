import {Component} from '../../../lib/vues6.js'

const template = `
<div class="page-draft-board">
Draft Board
</div>
`
export default class DraftBoardComponent extends Component {
    static get selector() { return 'page-draft-board' }
    static get template() { return template }
    static get props() { return [] }

    async vue_on_create() {

    }
}
