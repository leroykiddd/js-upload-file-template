console.log('upload.js');

export function upload(selector, options) {
    let files = []
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
        files = Array.from(event.target.files);
        preview.innerHTML = '' // Обнуление
        files.forEach(file => {
            const reader = new FileReader()
            
            reader.onload = ev => {
                preview.insertAdjacentHTML('afterbegin', `
                    <div class="preview-img">
                    <div class="preview-remove" data-name="${file.name}">&times</div>
                        <img src="${ev.target.result}"/>
                    </div>
                `)
            }

            reader.readAsDataURL(file)
        })
        
    }

    const removeHandlet = event => {
        if (!event.target.dataset.name) {
            return
        }
        const name = event.target.dataset.name
        console.log(name);
        files = files.filter(file => {file.name !== name})
        const  block = preview.querySelector(`[data-name="${name}"]`)
            .closest('.preview-img')
        block.remove()
    }

    open_button.addEventListener('click', triggerInput)
    input.addEventListener('change', changeHandler)
    preview.addEventListener('click', removeHandlet)
}