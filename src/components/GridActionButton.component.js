import {Component} from '../../lib/vues6.js'

const template = `
<div class="component-action-button">
    <button
        v-bind:style="{border: '2px solid lightgrey', borderRadius: '3px', backgroundColor: color, color: 'white'}"
        @click="on_click($event)"
    >{{ text }}</button>
</div>
`
export default class GridActionButtonComponent extends Component {
    static get selector() { return 'app-action-button' }
    static get template() { return template }
    static get props() { return ['row', 'col'] }

    text = ''
    color = 'white'

    async vue_on_create() {
        this.update_text()
        this.update_color()
    }

    watch_row() {
        this.update_text()
        this.update_color()
    }

    watch_col() {
        this.update_text()
        this.update_color()
    }

    update_text() {
        if ( typeof this.col.button_text === 'function' ) {
            this.text = this.col.button_text(this.row, this.col)
        }

        this.text = this.col.button_text || ''
    }

    update_color() {
        if ( typeof this.col.button_color === 'function' ) {
            this.color = this.col.button_color(this.row, this.col)
        }

        this.color = this.col.button_color || 'white'
    }

    on_click($event) {
        this.$emit('click', $event)
    }
}
