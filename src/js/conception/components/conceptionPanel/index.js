import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Button, Table, Space } from 'antd'
import { sendData } from '../../../services/api/novelService';
import { useTranslation } from 'react-i18next';
import PromptPopup from '../Tags/Popup';
import { Collapse } from 'antd';
import { DownOutlined } from '@ant-design/icons'
import { useState } from 'react';
import { ShortTextsTable } from '../novelTable';
import AddPopup from '../Ingredient/AddPopup';
import EditPopup from '../Ingredient/EditPopup';
import './index.scss'
const { Panel } = Collapse;

const ConceptionPanel = () => {
    const boardData = useSelector(state => state.boardData);
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [activeKey, setActiveKey] = useState('1')
    const [open, setOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const promptList = useSelector(state => state.boardData.promptList);
    const [dataSource, setDataSource] = useState(promptList)
    if (!boardData) {
        return <div>{t("conception.loading")}</div>
    }
    const [currentKey, setCurrentKey] = useState(null)
    const handleSendData = async () => {
        try {
            const chunks = await sendData(boardData.originalText);
            dispatch({ type: 'SET_SHORT_TEXTS', payload: chunks });
            setActiveKey('2')
        } catch (error) {
            console.error('Error handling send data:', error);
        }
    };

    const handleEdit = (key) => {
        setCurrentKey(key)
        setEditOpen(true)
    }

    const handleEditPrompt = (key) => {
        setCurrentKey(key)
        setOpen(true)
    }

    const handleAdd = () => {
        setAddOpen(true)
    }


    const handleSubmit = (prompts) => {
        const promptText = prompts.map(prompt => prompt.displayName).join(', ')
        setOpen(false)
        if (currentKey) {
            dispatch({ type: 'SET_PROMPT_ITEM', payload: {
                key: currentKey,
            promptText: promptText,
            } })
        }
    }

    const handleEditSubmit = (record) => {
        setEditOpen(false)
        console.log('---edit---',record)
        dispatch({ type: 'SET_PROMPT_ITEM', payload: {
            key: currentKey,
            promptText: record.prompt,
            name: record.name,
        } }) 
    }

    const handleDelete = (key) => {
        setCurrentKey(key)
        const promptList = boardData.promptList.filter(item => item.key !== key)
        dispatch({ type: 'SET_PROMPT_LIST', payload: promptList })
    }

    const handleAddSubmit = (newRecord) => {
        const newPromptList = [
            ...boardData.promptList,
            {
                key: boardData.promptList.length + 1,
                name: newRecord.name,
                prompt: newRecord.prompt,
            }
        ]
        dispatch({ type: 'SET_PROMPT_LIST', payload: newPromptList })
        setAddOpen(false);
    }

    useEffect(() => {
        // 表格更新
        setDataSource(promptList)
    }, [promptList])
    const currentRecord = promptList.find(item => item.key === currentKey) || {};
    const columns = [
        {
            title: t("conception.name"),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t("conception.prompt"),
            dataIndex: 'prompt',
            key: 'prompt',
        },
        {
            title: t("conception.action"),
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Space direction="horizontal">
                    <Button type="primary" onClick={() => handleEdit(record.key)}>{t("conception.edit")}</Button>
                    <Button type="primary" onClick={() => handleDelete(record.key)}>{t("conception.delete")}</Button>
                    <Button type="primary" onClick={() => handleEditPrompt(record.key)}>{t("conception.editPrompt")}</Button>
                </Space>
            ),
        }
    ]
    return (
        <div className="conception-container">
            <Collapse
                accordion
                className='conception-collapse'
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key)}
            >
                <Panel
                    header={t("conception.originalText")}
                    key="1"
                    extra={<Button onClick={handleSendData}>{t("conception.getChunks")}<DownOutlined /></Button>}
                >
                    <Input.TextArea
                        className="original-text-input"
                        id="originalText"
                        style={{ width: '100%' }}
                        autoSize={{ minRows: 10, maxRows: 20 }}
                        value={boardData.originalText.replace(/\\n/g, '\n')}
                        onChange={(e) => {
                            // 去掉换行符
                            dispatch({ type: 'SET_ORIGINAL_TEXT', payload: e.target.value.replace(/\n/g, '') })
                        }}
                    />
                </Panel>
                <Panel header={t("conception.shortTexts")} key="2">
                    <ShortTextsTable shortTexts={boardData.shortTexts} />
                </Panel>
                <Panel header={t("conception.ingredient")} key="3">
                    {/* ingredient,可以增加，删除，编辑 */}
                    <Table dataSource={dataSource} columns={columns} />
                    <Button type="primary" style={{ float: 'right', marginRight: '10px' }} onClick={handleAdd}>{t("conception.add")}</Button>
                </Panel>
            </Collapse>
            <PromptPopup  
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
                promptText={currentRecord.prompt || ''}
            />
            <AddPopup
                open={addOpen}
                onClose={() => setAddOpen(false)}
                handleSubmit={handleAddSubmit}
            />
            <EditPopup
                open={editOpen}
                onClose={() => setEditOpen(false)}
                handleSubmit={handleEditSubmit}
                record={currentRecord}
            />
        </div>
    )
}

export default ConceptionPanel