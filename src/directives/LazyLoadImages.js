export default {
    inserted: el => {
    // Attempt loading image
        function loadImage () {
            // Get all image elements from the parent
            const imageElement = Array.from(el.children).find(
                el => el.nodeName === 'IMG'
            )
            // If found
            if (imageElement) {
                // Add a load event listener
                imageElement.addEventListener('load', () => {
                    setTimeout(() => el.classList.add('loaded'), 100)
                })
                // Add an error event listener
                imageElement.addEventListener('error', () => console.log(`error: cannot load ${imageElement.dataset.url}`))
                // Change the image src to the value of the dataset.url
                imageElement.src = imageElement.dataset.url
            }
        }
        // detects that the element enters the viewport or a parent component element.
        function handleIntersect (entries, observer) {
            entries.forEach(entry => {
                //  if a single entry becomes visible to our user
                if (entry.isIntersecting) {
                    loadImage()
                    observer.unobserve(el)
                }
            })
        }

        // responsible for creating our Intersection Observer and attaching it to our element.
        function createObserver () {
            const options = {
                /*  root is where we base the visibility of our watched element.
                browser viewport if we pass null */
                root: null,
                /*  threshold value that can vary from 0 to 1 and tells us at what percent of the target’s visibility the observer callback should be executed, with 0 meaning as soon as even one pixel is visible and 1 meaning the whole element must be visible. */
                threshold: '0'
            }
            /* The IntersectionObserver constructor accepts a callback (our handleIntersect function) that is fired when the observed element passes the specified threshold and the options object that carries our observer options. */
            const observer = new IntersectionObserver(handleIntersect, options)
            observer.observe(el)
        }
        if (window['IntersectionObserver']) {
            createObserver()
        } else {
            loadImage()
        }
    }
}
