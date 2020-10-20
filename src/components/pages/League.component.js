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
                    Rank: ${row.standing.rank}
                    <br>W/L: ${row.standing.win_loss}
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
                { name: 'Stat 1', value: 1 },
                { name: 'Stat 2', value: 2 },
                { name: 'Stat 3', value: 3 },
                { name: 'Stat 4', value: 4 },
                { name: 'Stat 5', value: 5 },
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
                { name: 'Stat 1', value: 1 },
                { name: 'Stat 2', value: 2 },
                { name: 'Stat 3', value: 3 },
                { name: 'Stat 4', value: 4 },
                { name: 'Stat 5', value: 5 },
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
                { name: 'Stat 1', value: 1 },
                { name: 'Stat 2', value: 2 },
                { name: 'Stat 3', value: 3 },
                { name: 'Stat 4', value: 4 },
                { name: 'Stat 5', value: 5 },
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
                { name: 'Stat 1', value: 1 },
                { name: 'Stat 2', value: 2 },
                { name: 'Stat 3', value: 3 },
                { name: 'Stat 4', value: 4 },
                { name: 'Stat 5', value: 5 },
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
                { name: 'Stat 1', value: 1 },
                { name: 'Stat 2', value: 2 },
                { name: 'Stat 3', value: 3 },
                { name: 'Stat 4', value: 4 },
                { name: 'Stat 5', value: 5 },
            ],
        },
    ]

    async vue_on_create() {

    }
}
