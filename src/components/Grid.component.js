import {Component} from '../../lib/vues6.js'

const GridCellRenderType = {
    Simple: Symbol('simple'),
    HTML: Symbol('html'),
    Component: Symbol('component'),
}

export {GridCellRenderType}

const template = `
<div class="component-app-grid">
    <table>
        <tr>
            <th v-if="show_row_numbers">#</th>
            <th v-for="col of column_defs" :title="col.title || ''">{{ col.header || '' }}</th>
        </tr>
        <tr v-for="(row, idx) of data">
            <td v-if="show_row_numbers">{{ idx + 1 }}</td>
            <td v-for="col of column_defs">
                <div v-if="!col.type || col.type === GridCellRenderType.Simple">{{ row[col.key] }}</div>
                <div v-if="col.type === GridCellRenderType.HTML" v-html="col.renderer(row[col.key], row)"></div>
                <div v-if="col.type === GridCellRenderType.Component">
                    <component :is="col.component" :row="row" :col="col" :idx="idx" @click="col.on_click"></component>
                </div>
            </td>
        </tr>
    </table>
</div>
`
export default class GridComponent extends Component {
    static get selector() { return 'app-grid' }
    static get template() { return template }
    static get props() {
        return [
            'show_row_numbers',
            'column_defs',
            'data',
        ]
    }

    GridCellRenderType = GridCellRenderType

    async vue_on_create() {

    }
}
