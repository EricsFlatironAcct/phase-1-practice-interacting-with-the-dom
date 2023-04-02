document.addEventListener("DOMContentLoaded", ()=>{
    //Add the following features one by one, refreshing the page to see your functionality working as you build.
    //Note: These deliverables are written in the form of User Stories. They describe the features from the perspective of a user when they visit the page.
    //As a user, I can:
    function timerAction (action) {
        const counterLabel = document.getElementById('counter')
        if (action === 'plus') counterLabel.innerHTML = parseInt(counterLabel.innerText)+1
        else counterLabel.innerHTML = parseInt(counterLabel.innerText)-1
    }
    //See the timer increment every second once the page has loaded.
    const timerUp = () => timerAction('plus')
    let timerID = setInterval(timerUp, 1000)
    //Manually increment and decrement the counter using the plus and minus buttons.

    const minusButton = document.getElementById('minus')
    minusButton.addEventListener("click", timerAction.bind(null, 'minus'))
    const plusButton = document.getElementById('plus')
    plusButton.addEventListener("click", timerAction.bind(null, 'plus'))

    //Leave comments on my gameplay, such as: "Wow, what a fun game this is."
    const submitForm = document.getElementById('submit')
    submitForm.addEventListener('click', (event)=>{
        event.preventDefault() //prevents page refresh
        const newComment = document.createElement("li") 
        const CommentTextBox = document.getElementById('comment-input')
        newComment.innerText = CommentTextBox.value //sets the text of the new comment to the text box's value
        const listArea = document.getElementById('list') //finds the list
        listArea.appendChild(newComment) //Adds the new comment element to the list
        CommentTextBox.value = ''
    })

    //"Like" an individual number of the counter. I should see the count of the number of "likes" associated with that number displayed.
    const likeButton = document.getElementById('heart')
    likeButton.addEventListener('click', () =>{
        const counterLabel = document.getElementById('counter')
        const likesUL = document.getElementsByClassName('likes')[0]
        const likeExists = document.getElementById(counterLabel.innerHTML); //finds element with an ID for the counter
        if (likeExists == null){ //Creates a new li element if it cannot find one
            const newLikeValue = document.createElement('li')
            newLikeValue.id = counterLabel.innerHTML
            newLikeValue.setAttribute('numClicks', 1)
            newLikeValue.innerHTML = `${newLikeValue.id} has been liked 1 time` 
            likesUL.append(newLikeValue)
        }
        else{ //adds one to the number of clicks and displays the new value
            likeExists.setAttribute('numClicks', parseInt(likeExists.getAttribute('numClicks'))+1)
            likeExists.innerHTML = `${likeExists.id} has been liked ${likeExists.getAttribute('numClicks')} times`
        }
    })

    //Pause, which stops counter, disables buttons and switches to resume which undoes pause
    const pauseButton = document.getElementById('pause')
    pauseButton.addEventListener('click', () => {
        likeButton.disabled = !likeButton.disabled
        minusButton.disabled = !minusButton.disabled
        plusButton.disabled = !plusButton.disabled
        submitForm.disabled = !submitForm.disabled
        if (pauseButton.innerHTML.includes('pause')){ //pause button initially includes a leading space
            pauseButton.innerHTML = 'resume'
            clearInterval(timerID)  
            timerID = null
        }
        else{
            timerID = setInterval(timerUp, 1000) //resets the ID for the interval
            pauseButton.innerHTML = 'pause'
        }
    })
})