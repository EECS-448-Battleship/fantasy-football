import {Component} from '../../../lib/vues6.js'
import {fake_players} from '../../module/fake_data.js'
import {GridCellRenderType} from '../Grid.component.js'

const template = `
<div class="page-draft-board">
    <div class="header">
        <div class="left">
            <h2>Draft Board</h2>
        </div>
    </div>
    <div class="body">
        <app-grid
            :column_defs="column_defs"
            :data="data"
            :show_row_numbers="false"
        ></app-grid>
    </div>
</div>
`

/**
 * Component representing the draft board page.
 * @extends Component
 */
class DraftBoardComponent extends Component {
    static get selector() { return 'page-draft-board' }
    static get template() { return template }
    static get props() { return [] }

    column_defs = [
        {
            header: 'Name',
            key: 'name',
            type: GridCellRenderType.HTML,
            renderer: (_, data) => `
                <div class="center">
                    <img src="${data.image}" alt="${data.name}" height="50" style="border-radius: 50%">
                    <span>${data.name}</span>
                </div>
            `,
        },
        {
            header: 'Team',
            key: 'team_name',
        },
        {
            header: 'Position',
            key: 'position',
        },
        {
            header: 'Speed',
            key: 'speed',
        },
        {
            header: 'Points',
            key: 'points',
        },
        {
            header: 'Price',
            key: 'price',
        },
        {
            header: 'Stats',
            key: 'stats',
        },
    ]

    data = fake_players

    async vue_on_create() {

    }
}

export default DraftBoardComponent
