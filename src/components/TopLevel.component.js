import {Component} from '../../lib/vues6.js'

const template = `
<div class="top-level-container">
    <h1>EECS 448 - Projects 3/4</h1>
</div>
`

/**
 * Top-level component which manages the display of the entire game.
 * @extends Component
 */
class TopLevelComponent extends Component {
    static get selector() { return 'app-top-level' }
    static get template() { return template }
    static get props() { return [] }

    /**
     * Called when the component is initialized.
     * @return {Promise<void>}
     */
    async vue_on_create() {

    }
}

export default TopLevelComponent
