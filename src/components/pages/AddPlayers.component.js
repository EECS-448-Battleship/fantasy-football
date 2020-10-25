import { Component } from '../../../lib/vues6.js'

const template = `
<div class="page-add-players">
    <div class="header">
        <div class="left">
            <h2>Add Players to Team</h2>
        </div>
        <div class="right">
            <button :class="{ 'disable-click': my_team_only }" @click="to_my_team_only()">My Team</button><button :class="{ 'disable-click': !my_team_only }" @click="to_all_players()">All Players</button>
        </div>
        <div class="right">
            <input type="text" placeholder="Quick filter..." v-model="quick_filter" @keyup="on_filter_change()">
        </div>
    </div>
    <div class="item-grid">
        <div class="item" v-for="player of filtered_players" @mouseover="on_photo_hover(player)"
        @mouseleave="on_photo_leave(player)">
            <div style="display: flex; flex-direction: column; height: 100%;">
                    <div class="item-icon" v-if="!player.showing_stats">
                        <img :src="player.image" :alt="player.name">
                    </div>   
                    <div class="item-contents" v-if="!player.showing_stats">
                        <h1>{{ player.name }}</h1>
                        <p>#{{ player.number }} ({{ player.position }})</p>
                        <div class="moreStats">
                            <p>{{ player.stats }}</p>
                        </div>
                    </div>
                    <div class="item-contents" style="flex: 1;" v-else>
                        Hi! Show stats here.
                    </div>
                    <div class="item-button">
                        <button
                            v-if="my_team.length < 15 && !my_team.includes(player)"
                            @click="add_to_team(player)"
                            class="add"
                        >Add to Team</button>
                        <button
                            v-if="my_team.includes(player)"
                            @click="remove_from_team(player)"
                            class="remove"
                        >Remove from Team</button>
                    </div>
            </div>           

        </div>
    </div>
</div>
`

/**
 * A component which represents the "Add Players" page. Allows users to add/remove
 * players from their team.
 * @extends Component
 */
class AddPlayersComponent extends Component {
    static get selector() { return 'page-add-players' }
    static get props() { return [] }
    static get template() { return template }

    /**
     * The current value of the quick filter for players. If empty string, no filter is applied.
     * @type {string}
     */
    quick_filter = ''

    /**
     * If true, then only the players on the user's team will be shown.
     * @type {boolean}
     */
    my_team_only = false

    /**
     * Array of players currently on the user's team.
     * @type {*[]}
     */
    my_team = []

    /**
     * Array of currently displayed players, after the filter has been applied.
     * @type {*[]}
     */
    filtered_players = []

    /**
     * Array of currently displayed players, before the filter has been applied.
     * @type {*[]}
     */
    possible_players = []

    /**
     * All available players, whether they are on the user's team or not.
     * @type {*[]}
     */
    all_players = [
        {
            "number": 14,
            "name": "Andy Dalton",
            "position": "Quarterback",
            "stats": "Passing: 1,856 YDS",
            "image": "https://images.generated.photos/-K9iBY4oOkLsqQfoTA1R8X0EKvR_BCbMXk0KNX4EIIs/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0NzY1MjkuanBn.jpg",
            "showing_stats": false
        },
        {
            "number": 7,
            "name": "Ben DiNucci",
            "position": "Quarterback",
            "stats": "Passing: 856 YDS",
            "image": "https://images.generated.photos/EUa6Hmnt6682dl03Q5FPIeMqLnS833rfzOJaJXlYxqI/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxNTk3OTFfMDU1/Nzg5OF8wMzgzMzIw/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 3,
            "name": "Garrett Gilbert",
            "position": "Quarterback",
            "stats": "Passing: 758 YDS",
            "image": "https://images.generated.photos/eGoWRgqxtahGFDAD81-l8CNxdz1oe-huz3CQ7m3v0VI/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzNDA0NDlfMDgz/MDY1Nl8wMTk4NTI4/LmpwZw.jpg",
            "showing_stats": false
        
        },
        {
            "number": 34,
            "name": "Rico Dowdle",
            "position": "Running back",
            "stats": "1,368 YDS",
            "image": "https://images.generated.photos/fd8kkioB4vLw_5MGwQXdDt9Q7Ley2_Ia8Cu390zaNVM/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0Nzg2ODEuanBn.jpg",
            "showing_stats": false
        },
        {
            "number": 21,
            "name": "Ezekiel Elliott",
            "position": "Running back",
            "stats": "1,842 YDS",
            "image": "https://images.generated.photos/PEBx5b8_iPHU_nJpJbh3geUN8cBFglHVAAR9NktzXsk/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxODI1NzlfMDgx/MTA0OV8wNDQzOTM5/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 20,
            "name": "Tony Pollard",
            "position": "Running back",
            "stats": "1,623 YDS",
            "image": "https://images.generated.photos/cb3jAo-GBziFLxs85KJGt7a8bJdhz4sSy76PYAXkeg4/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA1ODU4MDBfMDMy/NjY2OF8wODEwNTA2/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 85,
            "name": "Noah Brown",
            "position": "Wide receiver",
            "stats": "666 YDS",
            "image": "https://images.generated.photos/LLiy3FypH5A1suda78U82t_Kcn9AlJwZt1g3w1p5DwE/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzODc0NjlfMDUy/MDc0NF8wNzc3NzQ5/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 19,
            "name": "Amari Cooper",
            "position": "Wide receiver",
            "stats": "256 YDS",
            "image": "https://images.generated.photos/dW84LNLE4Kzp73NTTnL68U--dYuq8CCzD-dGTs76U38/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNjE1NjZfMDEz/NDM1NF8wMTg5MjI0/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 13,
            "name": "Michael Gallup",
            "position": "Wide receiver",
            "stats": "13 YDS",
            "image": "https://images.generated.photos/erudOopARQnXWNaLqkIPRLLMLAVBr8m70aFC_dtYu1Y/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzODA5MTVfMDkx/MzIzN18wNDQxMTk4/LmpwZw.jpg",
            "showing_stats": false
        
        },
        {
            "number": 88,
            "name": "CeeDee Lamb",
            "position": "Wide receiver",
            "stats": "25 YDS",
            "image": "https://images.generated.photos/WFV4nHHq5ZaBb1rdmFL5WEZTOanckWHEfkmDA1fOVfw/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxNTYzNzNfMDI4/Nzc2N18wNzYxNDY3/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 17,
            "name": "Malik Turner",
            "position": "Wide receiver",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/PEBx5b8_iPHU_nJpJbh3geUN8cBFglHVAAR9NktzXsk/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxODI1NzlfMDgx/MTA0OV8wNDQzOTM5/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 11,
            "name": "Cedrick Wilson Jr.",
            "position": "Wide receiver",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/fd8kkioB4vLw_5MGwQXdDt9Q7Ley2_Ia8Cu390zaNVM/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0Nzg2ODEuanBn.jpg",
            "showing_stats": false
        },
        {
            "number": 80,
            "name": "Blake Bell",
            "position": "Tight end",
            "image": "https://images.generated.photos/eGoWRgqxtahGFDAD81-l8CNxdz1oe-huz3CQ7m3v0VI/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzNDA0NDlfMDgz/MDY1Nl8wMTk4NTI4/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 84,
            "name": "Sean McKeon",
            "position": "Tight end",
            "image": "https://images.generated.photos/EUa6Hmnt6682dl03Q5FPIeMqLnS833rfzOJaJXlYxqI/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxNTk3OTFfMDU1/Nzg5OF8wMzgzMzIw/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 86,
            "name": "Dalton Schultz",
            "position": "Tight end",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/-K9iBY4oOkLsqQfoTA1R8X0EKvR_BCbMXk0KNX4EIIs/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0NzY1MjkuanBn.jpg",
            "showing_stats": false
        },
        {
            "number": 63,
            "name": "Tyler Biadasz C",
            "position": "Offensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/cb3jAo-GBziFLxs85KJGt7a8bJdhz4sSy76PYAXkeg4/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA1ODU4MDBfMDMy/NjY2OF8wODEwNTA2/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 69,
            "name": "Brandon Knight T/G",
            "position": "Offensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/LLiy3FypH5A1suda78U82t_Kcn9AlJwZt1g3w1p5DwE/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzODc0NjlfMDUy/MDc0NF8wNzc3NzQ5/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 70,
            "name": "Zack Martin G",
            "position": "Offensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/dW84LNLE4Kzp73NTTnL68U--dYuq8CCzD-dGTs76U38/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNjE1NjZfMDEz/NDM1NF8wMTg5MjI0/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 66,
            "name": "Connor McGovern G",
            "position": "Offensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/erudOopARQnXWNaLqkIPRLLMLAVBr8m70aFC_dtYu1Y/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzODA5MTVfMDkx/MzIzN18wNDQxMTk4/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 64,
            "name": "Greg Senat T",
            "position": "Offensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/WFV4nHHq5ZaBb1rdmFL5WEZTOanckWHEfkmDA1fOVfw/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxNTYzNzNfMDI4/Nzc2N18wNzYxNDY3/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 78,
            "name": "Terence Steele T",
            "position": "Offensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/PEBx5b8_iPHU_nJpJbh3geUN8cBFglHVAAR9NktzXsk/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxODI1NzlfMDgx/MTA0OV8wNDQzOTM5/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 52,
            "name": "Connor Williams G",
            "position": "Offensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/fd8kkioB4vLw_5MGwQXdDt9Q7Ley2_Ia8Cu390zaNVM/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0Nzg2ODEuanBn.jpg",
            "showing_stats": false
        },
        {
            "number": 56,
            "name": "Bradlee Anae DE",
            "position": "Defensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/eGoWRgqxtahGFDAD81-l8CNxdz1oe-huz3CQ7m3v0VI/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzNDA0NDlfMDgz/MDY1Nl8wMTk4NTI4/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 92,
            "name": "Dorance Armstrong DE",
            "position": "Defensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/EUa6Hmnt6682dl03Q5FPIeMqLnS833rfzOJaJXlYxqI/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxNTk3OTFfMDU1/Nzg5OF8wMzgzMzIw/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 98,
            "name": "Tyrone Crawford DT/DE",
            "position": "Defensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/-K9iBY4oOkLsqQfoTA1R8X0EKvR_BCbMXk0KNX4EIIs/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0NzY1MjkuanBn.jpg",
            "showing_stats": false
        },
        {
            "number": 96,
            "name": "Neville Gallimore DT",
            "position": "Defensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/cb3jAo-GBziFLxs85KJGt7a8bJdhz4sSy76PYAXkeg4/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA1ODU4MDBfMDMy/NjY2OF8wODEwNTA2/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 94,
            "name": "Randy Gregory DE",
            "position": "Defensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/LLiy3FypH5A1suda78U82t_Kcn9AlJwZt1g3w1p5DwE/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzODc0NjlfMDUy/MDc0NF8wNzc3NzQ5/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 97,
            "name": "Everson Griffen DE",
            "position": "Defensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/dW84LNLE4Kzp73NTTnL68U--dYuq8CCzD-dGTs76U38/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNjE1NjZfMDEz/NDM1NF8wMTg5MjI0/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 79,
            "name": "Justin Hamilton DT",
            "position": "Defensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/erudOopARQnXWNaLqkIPRLLMLAVBr8m70aFC_dtYu1Y/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzODA5MTVfMDkx/MzIzN18wNDQxMTk4/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 90,
            "name": "DeMarcus Lawrence DE",
            "position": "Defensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/WFV4nHHq5ZaBb1rdmFL5WEZTOanckWHEfkmDA1fOVfw/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxNTYzNzNfMDI4/Nzc2N18wNzYxNDY3/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 95,
            "name": "Dontari Poe DT",
            "position": "Defensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/PEBx5b8_iPHU_nJpJbh3geUN8cBFglHVAAR9NktzXsk/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxODI1NzlfMDgx/MTA0OV8wNDQzOTM5/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 58,
            "name": "Aldon Smith DE/OLB",
            "position": "Defensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/fd8kkioB4vLw_5MGwQXdDt9Q7Ley2_Ia8Cu390zaNVM/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0Nzg2ODEuanBn.jpg",
            "showing_stats": false
        },
        {
            "number": 99,
            "name": "Antwaun Woods DT",
            "position": "Defensive lineman",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/eGoWRgqxtahGFDAD81-l8CNxdz1oe-huz3CQ7m3v0VI/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzNDA0NDlfMDgz/MDY1Nl8wMTk4NTI4/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 57,
            "name": "Luke Gifford MLB/OLB",
            "position": "Linebacker",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/EUa6Hmnt6682dl03Q5FPIeMqLnS833rfzOJaJXlYxqI/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxNTk3OTFfMDU1/Nzg5OF8wMzgzMzIw/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 59,
            "name": "Justin March OLB/MLB",
            "position": "Linebacker",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/-K9iBY4oOkLsqQfoTA1R8X0EKvR_BCbMXk0KNX4EIIs/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0NzY1MjkuanBn.jpg",
            "showing_stats": false
        },
        {
            "number": 54,
            "name": "Jaylon Smith OLB",
            "position": "Linebacker",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/cb3jAo-GBziFLxs85KJGt7a8bJdhz4sSy76PYAXkeg4/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA1ODU4MDBfMDMy/NjY2OF8wODEwNTA2/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 53,
            "name": "Rashad Smith MLB",
            "position": "Linebacker",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/LLiy3FypH5A1suda78U82t_Kcn9AlJwZt1g3w1p5DwE/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzODc0NjlfMDUy/MDc0NF8wNzc3NzQ5/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 48,
            "name": "Joe Thomas OLB/MLB",
            "position": "Linebacker",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/dW84LNLE4Kzp73NTTnL68U--dYuq8CCzD-dGTs76U38/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNjE1NjZfMDEz/NDM1NF8wMTg5MjI0/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 55,
            "name": "Leighton Vander Esch MLB",
            "position": "Linebacker",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/erudOopARQnXWNaLqkIPRLLMLAVBr8m70aFC_dtYu1Y/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzODA5MTVfMDkx/MzIzN18wNDQxMTk4/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 30,
            "name": "Anthony Brown CB",
            "position": "Defensive back",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/WFV4nHHq5ZaBb1rdmFL5WEZTOanckWHEfkmDA1fOVfw/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxNTYzNzNfMDI4/Nzc2N18wNzYxNDY3/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 27,
            "name": "Trevon Diggs CB",
            "position": "Defensive back",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/PEBx5b8_iPHU_nJpJbh3geUN8cBFglHVAAR9NktzXsk/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxODI1NzlfMDgx/MTA0OV8wNDQzOTM5/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 29,
            "name": "C. J. Goodwin CB",
            "position": "Defensive back",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/fd8kkioB4vLw_5MGwQXdDt9Q7Ley2_Ia8Cu390zaNVM/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0Nzg2ODEuanBn.jpg",
            "showing_stats": false
        },
        {
            "number": 26,
            "name": "Jourdan Lewis CB",
            "position": "Defensive back",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/eGoWRgqxtahGFDAD81-l8CNxdz1oe-huz3CQ7m3v0VI/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzNDA0NDlfMDgz/MDY1Nl8wMTk4NTI4/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 40,
            "name": "Steven Parker SS/FS",
            "position": "Defensive back",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/EUa6Hmnt6682dl03Q5FPIeMqLnS833rfzOJaJXlYxqI/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxNTk3OTFfMDU1/Nzg5OF8wMzgzMzIw/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 41,
            "name": "Reggie Robinson FS/CB",
            "position": "Defensive back",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/-K9iBY4oOkLsqQfoTA1R8X0EKvR_BCbMXk0KNX4EIIs/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0NzY1MjkuanBn.jpg",
            "showing_stats": false
        },
        {
            "number": 23,
            "name": "Darian Thompson SS/FS",
            "position": "Defensive back",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/cb3jAo-GBziFLxs85KJGt7a8bJdhz4sSy76PYAXkeg4/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA1ODU4MDBfMDMy/NjY2OF8wODEwNTA2/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 37,
            "name": "Donovan Wilson SS/FS",
            "position": "Defensive back",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/LLiy3FypH5A1suda78U82t_Kcn9AlJwZt1g3w1p5DwE/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzODc0NjlfMDUy/MDc0NF8wNzc3NzQ5/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 25,
            "name": "Xavier Woods FS",
            "position": "Defensive back",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/dW84LNLE4Kzp73NTTnL68U--dYuq8CCzD-dGTs76U38/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNjE1NjZfMDEz/NDM1NF8wMTg5MjI0/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 28,
            "name": "Daryl Worley CB/S",
            "position": "Defensive back",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/erudOopARQnXWNaLqkIPRLLMLAVBr8m70aFC_dtYu1Y/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzODA5MTVfMDkx/MzIzN18wNDQxMTk4/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 6,
            "name": "Chris Jones P",
            "position": "Special team",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/WFV4nHHq5ZaBb1rdmFL5WEZTOanckWHEfkmDA1fOVfw/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxNTYzNzNfMDI4/Nzc2N18wNzYxNDY3/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 91,
            "name": "L. P. Ladouceur LS",
            "position": "Special team",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/PEBx5b8_iPHU_nJpJbh3geUN8cBFglHVAAR9NktzXsk/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxODI1NzlfMDgx/MTA0OV8wNDQzOTM5/LmpwZw.jpg",
            "showing_stats": false
        },
        {
            "number": 2,
            "name": "Greg Zuerlein K",
            "position": "Special team",
            "stats": "551 YDS",
            "image": "https://images.generated.photos/fd8kkioB4vLw_5MGwQXdDt9Q7Ley2_Ia8Cu390zaNVM/rs:fit:128:128/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA0Nzg2ODEuanBn.jpg",
            "showing_stats": false
        }
    ]

    /**
     * Called when the page is instantiated.
     * @return {Promise<void>}
     */
    async vue_on_create() {
        this.possible_players = [...this.all_players];
        this.filtered_players = [...this.possible_players];
    }

    /**
     * Called when the quick-filter changes. Applies the filter to the displayed players.
     */
    on_filter_change() {
        const query = this.quick_filter.toLowerCase()
        this.filtered_players = this.possible_players.filter(x => {
            if (!query) return true;
            return x.name.toLowerCase().includes(query) || x.position.toLowerCase().includes(query)
        })
    }

    /**
     * When called, change the display to show only the user's team.
     */
    to_my_team_only() {
        this.my_team_only = true;
        this.possible_players = [...this.my_team]
        this.on_filter_change()
    }

    /**
     * When called, change the display to show all available players.
     */
    to_all_players() {  
        this.my_team_only = false;
        this.possible_players = [...this.all_players]
        this.on_filter_change()
    }

    /**
     * Add the given player to the user's team, if not already there.
     * @param {object} player
     */
    add_to_team(player) {
        if (!this.my_team.includes(player)) {
            this.my_team.push(player)
        }
    }

    /**
     * Remove the given player from the user's team, if there.
     * @param {object} player
     */
    remove_from_team(player) {
        this.my_team = this.my_team.filter(x => x !== player)
        player.showing_stats = false
        if (this.my_team_only) this.to_my_team_only()
    }

    /**
     * Called when the user hovers over a player. Toggles the stats to be shown.
     * @param {object} player
     */
    on_photo_hover(player) {
        player.showing_stats = true
    }

    /**
     * Called when the user un-hovers over a player. Toggles the stats to hide.
     * @param {object} player
     */
    on_photo_leave(player) {
        player.showing_stats = false
    }
}

export default AddPlayersComponent
