import {Component} from '../../../lib/vues6.js'
import {GridCellRenderType} from '../Grid.component.js'

const template = `
<div class="page-scores">
    <div class="header">
        <div class="left">
            <h2>Matchups - <small>Week {{ current_week }}</small></h2>
        </div>
        <div class="right">
            <button :class="{ 'disable-click': current_week === max_week }" @click="to_next_week()">Next Week</button><button :class="{ 'disable-click': current_week === min_week }" @click="to_previous_week()">Previous Week</button>
        </div>
    </div>
    <app-grid
        :column_defs="column_defs"
        :data="data"
        :show_row_numbers="false"
    ></app-grid>
</div>
`
export default class ScoresComponent extends Component {
    static get selector() { return 'page-scores' }
    static get template() { return template }
    static get props() { return [] }

    current_week = 6
    max_week = 6
    min_week = 1

    week_x_data = [
        [],
        [],
        [],
        [],
        [],
        [
            {
                "date": "11/2/2020",
                "team_1": "Team 0",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 50,
                "team_2": "Team 19",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 37
            },
            {
                "date": "10/31/2020",
                "team_1": "Team 1",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 48,
                "team_2": "Team 20",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 1
            },
            {
                "date": "11/13/2020",
                "team_1": "Team 2",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 86,
                "team_2": "Team 21",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 46
            },
            {
                "date": "10/26/2020",
                "team_1": "Team 3",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 65,
                "team_2": "Team 22",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 55
            },
            {
                "date": "11/8/2020",
                "team_1": "Team 4",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 62,
                "team_2": "Team 23",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 49
            },
            {
                "date": "11/10/2020",
                "team_1": "Team 5",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 16,
                "team_2": "Team 24",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 87
            },
            {
                "date": "10/26/2020",
                "team_1": "Team 6",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 90,
                "team_2": "Team 25",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 68
            },
            {
                "date": "11/12/2020",
                "team_1": "Team 7",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 99,
                "team_2": "Team 26",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 58
            },
            {
                "date": "11/6/2020",
                "team_1": "Team 8",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 51,
                "team_2": "Team 27",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 29
            },
            {
                "date": "11/6/2020",
                "team_1": "Team 9",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 19,
                "team_2": "Team 28",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 72
            },
            {
                "date": "10/27/2020",
                "team_1": "Team 10",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 15,
                "team_2": "Team 29",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 13
            },
            {
                "date": "11/1/2020",
                "team_1": "Team 11",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 18,
                "team_2": "Team 30",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 6
            },
            {
                "date": "11/9/2020",
                "team_1": "Team 12",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 72,
                "team_2": "Team 31",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 50
            },
            {
                "date": "11/6/2020",
                "team_1": "Team 13",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 33,
                "team_2": "Team 32",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 6
            },
            {
                "date": "11/5/2020",
                "team_1": "Team 14",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 39,
                "team_2": "Team 33",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 43
            },
            {
                "date": "11/5/2020",
                "team_1": "Team 15",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 50,
                "team_2": "Team 34",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 12
            },
            {
                "date": "10/25/2020",
                "team_1": "Team 16",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 36,
                "team_2": "Team 35",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 71
            },
            {
                "date": "11/7/2020",
                "team_1": "Team 17",
                "team_1_logo": "https://via.placeholder.com/150x100",
                "team_1_projection": 52,
                "team_2": "Team 36",
                "team_2_logo": "https://via.placeholder.com/150x100",
                "team_2_projection": 51
            }
        ]
    ]

    column_defs = [
        {
            header: 'Date',
            type: GridCellRenderType.HTML,
            key: 'date',
            renderer: (_, data) => {
                return `${data.date} @ ${data.team_1}`
            }
        },
        {
            header: 'Team 1',
            type: GridCellRenderType.HTML,
            key: 'team_1',
            renderer: (_, data) => `
                <div style="display: flex; flex-direction: row;">
                    <img src="${data.team_1_logo}" alt="${data.team_1}">
                    <div style="margin-left: 20px">
                        <b>${data.team_1}</b>
                        <p>Projection: ${data.team_1_projection}</p>
                    </div>
                </div>
            `
        },
        {
            header: 'Team 2',
            type: GridCellRenderType.HTML,
            key: 'team_2',
            renderer: (_, data) => `
                <div style="display: flex; flex-direction: row;">
                    <img src="${data.team_2_logo}" alt="${data.team_2}">
                    <div style="margin-left: 20px">
                        <b>${data.team_2}</b>
                        <p>Projection: ${data.team_2_projection}</p>
                    </div>
                </div>
            `
        },
    ]

    data = []

    async vue_on_create() {
        this.data = this.week_x_data[this.max_week - 1];
    }

    to_next_week() {
        if ( this.current_week < this.max_week ) {
            this.current_week += 1;
            this.data = this.week_x_data[this.current_week - 1];
        }
    }

    to_previous_week() {
        if ( this.current_week > this.min_week ) {
            this.current_week -= 1;
            this.data = this.week_x_data[this.current_week - 1];
        }
    }
}
