console.log('upload.js');

export function upload(selector, options) {
    const input = document.querySelector(selector)
    const preview = document.createElement('div')
    preview.classList.add('preview')

    const open_button = document.createElement('button')
    open_button.classList.add('btn')
    open_button.textContent = 'Open'

    if(options.multiple) {
        input.setAttribute('multiple', options.multiple)
    }

    input.insertAdjacentElement('afterend', open_button)

    if(options.accept && Array.isArray(options.accept)) {
        input.setAttribute('accept', options.accept.join(','))
    } 

    const triggerInput = () => {
        input.click()
    }

    const changeHandler = event => {
        if (!event.target.files) {
            return
        };
        
        input.insertAdjacentElement('afterend', preview)
        const files = Array.from(event.target.files);
        files.forEach(file => {
            const reader = new FileReader()
            
            reader.onload = ev => {
                console.log(ev.target.result);
                preview.insertAdjacentHTML('afterbegin', `
                    <div class="preview-img">
                        <img src="${ev.target.result}"/>
                    </div>
                `)
            }

            reader.readAsDataURL(file)
        })
        
    }

    open_button.addEventListener('click', triggerInput)
    input.addEventListener('change', changeHandler)
}