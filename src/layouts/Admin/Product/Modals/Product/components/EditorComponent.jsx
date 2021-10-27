import { Editor } from '@tinymce/tinymce-react'
import React from 'react'
import { init } from '../../../../../../utils/getImage'

export default function EditorComponent(props) {
    const { product } = props;
    return (
        <>
            <div className="col-12">
                <label htmlFor="desc" className="form-label">Description</label>
                < Editor
                    onInit={(evt, editor) => props.editorRef.current = editor}
                    onEditorChange={(value) => { props.handleEditor(value, props.description) }}
                    apiKey="evhje833ytxlbsyda8yt3n6tqick01tx42fpkdao7qw3u5gt"
                    init={init}
                    initialValue={props.description.current ? props.description.current : product?.desc}
                />
            </div>
        </>
    )
}
