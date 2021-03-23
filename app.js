import { upload } from './upload.js'

upload("#file", {
    multiple: true,
    accept: ['.png', '.jpeg', '.gif'],
})