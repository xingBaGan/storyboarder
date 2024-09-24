import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const AddPopup = ({open, onClose, handleSubmit}) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [prompt, setPrompt] = useState('');
    return (
        <Modal
            title={t("conception.add")}
            open={open}
            onCancel={()=>{
                onClose()
            }}
            onOk={() => {
                handleSubmit({name, prompt});
                setName('');
                setPrompt('');
                onClose()
            }}
            width={600}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <Input placeholder={t("conception.name")} value={name} onChange={(e) => setName(e.target.value)}  style={{ marginBottom: '10px' }}/>
            <Input.TextArea placeholder={t("conception.prompt")} value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </Modal>
    );
};

export default AddPopup;