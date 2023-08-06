import './comments.css'

const textAreaComment = document.querySelector(".textarea-comment");

textAreaComment.addEventListener('keyup', (event) => {
    event.stopPropagation()
})