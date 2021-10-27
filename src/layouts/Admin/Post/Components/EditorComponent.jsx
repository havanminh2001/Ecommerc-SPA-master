import React, { memo, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux'
import { init } from '../../../../utils/getImage';

function EditorComponent(props) {
    let visiable = useSelector(state => state.PostReducer.clearEditor);
    let messageErrors = useSelector(state => state.PostReducer.messageErrors);
    let editorRef = useRef();
    const { data, content } = props;
    return (
        <>
            {
                props.data ?
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={data.content ? data.content : editorRef.current}
                        onEditorChange={props.handleChangeEditor}
                        apiKey="evhje833ytxlbsyda8yt3n6tqick01tx42fpkdao7qw3u5gt"
                        init={init}
                    />
                    :
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={visiable ? editorRef.current : ''}
                        onEditorChange={props.handleChangeEditor}
                        apiKey="evhje833ytxlbsyda8yt3n6tqick01tx42fpkdao7qw3u5gt"
                        init={init}
                    />
            }

            <span style={{ color: "red", display: "block", marginBottom: "12px" }}>
                {content || messageErrors.content ? props.errors.content : ''}
            </span>
        </>
    )
}

export default memo(EditorComponent);