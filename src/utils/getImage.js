import { ACCESS_TOKEN, BASE_URL, BASE_URL_ADMIN } from '../settings/configUrl';
import axios from 'axios';

export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export const init = {
    height: 350,
    menubar: true,
    plugins: 'image code',
    toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | image | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help | ',
    /* without images_upload_url set, Upload tab won't show up*/
    images_upload_url: 'postAcceptor.php',
    automatic_uploads: true,
    file_picker_types: 'image',
    /* we override default upload handler to simulate successful upload*/
    file_picker_callback: function (callback, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = function () {
            var file = this.files[0];
            var reader = new FileReader();
            reader.onload = async function () {
                let formData = new FormData();
                formData.append('image', file);
                const res = await axios({
                    method: 'POST',
                    url: `${BASE_URL_ADMIN}/post/upload?token=${localStorage.getItem(ACCESS_TOKEN)}`,
                    data: formData
                });
                callback(`${BASE_URL}/${res.data}`, { alt: 'Image' });
            };
            reader.readAsDataURL(file);
        };
        input.click();
    },
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
}


export const formatCurrency = (currency) => {
    if (currency) {
        return currency.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
}
