import React, { useState } from 'react'
import { Modal } from 'antd'
import PromptTags from './index'


const PromptPopup = ({ open, onClose, onSubmit, promptText }) => {
    const [selectedTags, setSelectedTags] = useState([]);

    return (
        <Modal
            open={open}
            onCancel={()=>{
                onClose()
            }}
            onOk={()=>{
                onSubmit(selectedTags)
            }}
            width="100%"
            minHeight="100%"
        >
            <PromptTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} promptText={promptText} />
        </Modal>
    )
}

export default PromptPopup;

