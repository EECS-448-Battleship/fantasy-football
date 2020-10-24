import {Component} from '../../../lib/vues6.js'
import {GridCellRenderType} from '../Grid.component.js'

const template = `
<div class="page-league">
    <app-grid
        :column_defs="column_defs"
        :data="data"
        :show_row_numbers="false"
    ></app-grid>
</div>
`
export default class LeagueComponent extends Component {
    static get selector() { return 'page-league' }
    static get template() { return template }
    static get props() { return [] }

    GridCellRenderType = GridCellRenderType

    column_defs = [
        {
            header: 'Standing',
            type: GridCellRenderType.HTML,
            key: 'standing',
            renderer: (value, row) => {
                return `
                    <h1 id="ranking">
                    Rank: ${row.standing.rank}
                    </h1>
                    <h2 id="record">
                        W/L: ${row.standing.win_loss}
                    </h2>

                    
                    
                `
                
            }
        },
        {
            header: 'Team',
            type: GridCellRenderType.HTML,
            key: 'team_name',
            renderer: (value, row) => {
                return `
                    <div class="center">
                        <img src="${row.team_image}" alt="${row.team_image}">
                        <span>${row.team_name}</span>
                    </div>
                `
            },
        },
        {
            header: 'Stats',
            key: 'stats',
        },
        {
            header: '',
            key: 'team_name',
            type: GridCellRenderType.Component,
            component: Vue.component('app-action-button'),
            button_color: '#CC5746',
            button_text: 'Test Action',
            on_click: (row, col) => {
                console.log('button clicked!')
            },
        }
    ]

    data = [
        {
            standing: {
                rank: 1,
                win_loss: '3/0',
            },
            team_name: 'Team A',
            team_image: 'https://via.placeholder.com/150x100',
            stats: [
                { name: 'Points Scored', value: 1 },
                { name: 'Points Against', value: 2 },
            ],
        },
        {
            standing: {
                rank: 2,
                win_loss: '3/0',
            },
            team_name: 'Team B',
            team_image: 'https://via.placeholder.com/150x100',
            stats: [
                { name: 'Points Scored', value: 1 },
                { name: 'Points Against', value: 2 },
            ],
        },
        {
            standing: {
                rank: 3,
                win_loss: '2/1',
            },
            team_name: 'Team C',
            team_image: 'https://via.placeholder.com/150x100',
            stats: [
                { name: 'Points Scored', value: 1 },
                { name: 'Points Against', value: 2 },

            ],
        },
        {
            standing: {
                rank: 4,
                win_loss: '2/1',
            },
            team_name: 'Team D',
            team_image: 'https://via.placeholder.com/150x100',
            stats: [
                { name: 'Points Scored', value: 1 },
                { name: 'Points Against', value: 2 },

            ],
        },
        {
            standing: {
                rank: 5,
                win_loss: '1/2',
            },
            team_name: 'Team E',
            team_image: 'https://via.placeholder.com/150x100',
            stats: [
                { name: 'Points Scored', value: 1 },
                { name: 'Points Against', value: 2 },

            ],
        },
        {
            standing: {
                rank: 6,
                win_loss: '0/3',
            },
            team_name: 'Team F',
            team_image: 'https://via.placeholder.com/150x100',
            stats: [
                { name: 'Points Scored', value: 1 },
                { name: 'Points Against', value: 2 },

            ],
        },
    ]

    async vue_on_create() {

    }
}
