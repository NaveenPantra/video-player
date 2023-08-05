import './style.css'
import './video.js'

if (!window.startViewTransition) {
    console.log('no start')
    window.startViewTransition = (cb = () => {}) => {
        cb()
    }
}