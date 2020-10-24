import {Component} from '../../../lib/vues6.js'
import {GridCellRenderType} from '../Grid.component.js'

const template = `
<div class="page-my-team">
    <div class="header">
        <div class="left team-name">
            <h2>My Team - </h2><input placeholder="Click to edit team name..." type="text" v-model="team_name">
        </div>
    </div>
    <div class="body" style="display: flex; flex-direction: row; margin-left: 10px;">
        <app-grid
            :column_defs="overall_column_defs"
            :data="overall_data"
            :show_row_numbers="true"
        ></app-grid>
    </div>
</div>
`
export default class MyTeamComponent extends Component {
    static get selector() { return 'page-my-team' }
    static get template() { return template }
    static get props() { return [] }

    team_name = ''

    overall_column_defs = [
        {
            header: 'Name',
            key: 'player_name',
            type: GridCellRenderType.HTML,
            renderer: (_, data) => `
                <div class="center">
                    <img src="${data.image}" alt="${data.player_name}" height="50" style="border-radius: 50%">
                    <span>${data.player_name}</span>
                </div>
            `,
        },
        {
            header: 'POS',
            key: 'position',
        },
        {
            header: 'ECR',
            title: 'Expected Coverage Rating',
            key: 'ecr',
        },
    ]

    overall_data = [
        {
            player_name: 'Christian McCaffrey',
            position: 'RB1',
            ecr: '0.0',
            "image": "https://images.generated.photos/eGoWRgqxtahGFDAD81-l8CNxdz1oe-huz3CQ7m3v0VI/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzNDA0NDlfMDgz/MDY1Nl8wMTk4NTI4/LmpwZw.jpg",
        },
        {
            player_name: 'Ezekiel Elliott',
            position: 'RB3',
            ecr: '1.0',
            "image": "https://images.generated.photos/fd8kkioB4vLw_5MGwQXdDt9Q7Ley2_Ia8Cu390zaNVM/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0Nzg2ODEuanBn.jpg",
        },
        {
            player_name: 'Dalvin Cook',
            position: 'RB5',
            ecr: '0.0',
            "image": "https://images.generated.photos/PEBx5b8_iPHU_nJpJbh3geUN8cBFglHVAAR9NktzXsk/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxODI1NzlfMDgx/MTA0OV8wNDQzOTM5/LmpwZw.jpg",
        },
        {
            player_name: 'Alvin Kamara',
            position: 'RB6',
            ecr: '-1.0',
            "image": "https://images.generated.photos/cb3jAo-GBziFLxs85KJGt7a8bJdhz4sSy76PYAXkeg4/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA1ODU4MDBfMDMy/NjY2OF8wODEwNTA2/LmpwZw.jpg",
        },
        {
            player_name: 'Michael Thomas',
            position: 'WR1',
            ecr: '3.0',
            "image": "https://images.generated.photos/LLiy3FypH5A1suda78U82t_Kcn9AlJwZt1g3w1p5DwE/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzODc0NjlfMDUy/MDc0NF8wNzc3NzQ5/LmpwZw.jpg",
        },
        {
            player_name: 'Davante Adams',
            position: 'WR2',
            ecr: '4.0',
            "image": "https://images.generated.photos/dW84LNLE4Kzp73NTTnL68U--dYuq8CCzD-dGTs76U38/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNjE1NjZfMDEz/NDM1NF8wMTg5MjI0/LmpwZw.jpg",
        },
        {
            player_name: 'Travis Kelce',
            position: 'TE1',
            ecr: '-4.0',
            "image": "https://images.generated.photos/erudOopARQnXWNaLqkIPRLLMLAVBr8m70aFC_dtYu1Y/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzODA5MTVfMDkx/MzIzN18wNDQxMTk4/LmpwZw.jpg",
        },
    ]

    async vue_on_create() {

    }
}
