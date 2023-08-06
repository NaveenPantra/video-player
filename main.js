import './style.css'
import './video.js'
import './comments.js'

if (!window.startViewTransition) {
    console.log('no start')
    window.startViewTransition = (cb = () => {}) => {
        cb()
    }
}