import {Component} from '../../lib/vues6.js'

const template = `
<div class="component-action-button">
    <button
        v-if="!hidden"
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
    hidden = false

    async vue_on_create() {
        this.update_text()
        this.update_color()
        this.update_hidden()
    }

    watch_row() {
        this.update_text()
        this.update_color()
        this.update_hidden()
    }

    watch_col() {
        this.update_text()
        this.update_color()
        this.update_hidden()
    }

    update_text() {
        if ( typeof this.col.button_text === 'function' ) {
            this.text = this.col.button_text(this.row, this.col)
        } else {
            this.text = this.col.button_text || ''
        }
    }

    update_color() {
        if ( typeof this.col.button_color === 'function' ) {
            this.color = this.col.button_color(this.row, this.col)
        } else {
            this.color = this.col.button_color || 'white'
        }
    }

    update_hidden() {
        if ( !('button_hidden' in this.col) ) {
            this.hidden = false;
        } else if ( typeof this.col.button_hidden === 'function' ) {
            this.hidden = this.col.button_hidden(this.row, this.col)
        } else {
            this.hidden = this.col.button_hidden
        }
    }

    on_click($event) {
        this.$emit('click', [this.row, this.col])
        this.update_text()
        this.update_color()
        this.update_hidden()
    }
}
