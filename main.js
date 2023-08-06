import './style.css'
import './video.js'
import './comments.js'

if (!window.startViewTransition) {
    console.log('polyfill window.startViewTransition')
    window.startViewTransition = (cb = () => {}) => {
        cb()
    }
}