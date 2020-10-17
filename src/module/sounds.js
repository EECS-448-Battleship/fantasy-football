/** @module sounds */

import { appUrl } from './util.js'

/**
 * A thin wrapper for sound effects.
 */
class Sound {
    /**
     * Construct the sound.
     * @param {string} src - URL of the file
     */
    constructor(src) {
        /**
         * The sound element.
         * @type {HTMLAudioElement}
         */
        this.sound = document.createElement('audio')
        this.sound.src = src
        this.sound.setAttribute('preload', 'auto')
        this.sound.setAttribute('controls', 'none')
        this.sound.style.display = 'none'

        document.body.appendChild(this.sound)
    }

    /**
     * Start playing the sound.
     */
    async play() {
        const duration = this.sound.duration

        await this.sound.play()
        await new Promise(res => {
            setTimeout(res, duration * 1000)
        })
    }

    /**
     * Pause the sound.
     */
    stop() {
        this.sound.pause()
    }
}

export { Sound }
