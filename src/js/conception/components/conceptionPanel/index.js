
import { useSelector, useDispatch } from 'react-redux'
import { Input, Table, Button, Tooltip } from 'antd'
import { sendData } from '../../../services/api/novelService';
import Text from '../../../../components/Text';
import { useTranslation } from 'react-i18next';
import { Collapse } from 'antd';
import { DownOutlined } from '@ant-design/icons'
import './index.scss'
import { useState } from 'react'
const { Panel } = Collapse;

const ConceptionPanel = () => {
    const boardData = useSelector(state => state.boardData);
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [activeKey, setActiveKey] = useState('1')
    if (!boardData) {
        return <div>No board data</div>
    }

    const handleSendData = async () => {
        try {
            const chunks = await sendData(boardData.originalText);
            dispatch({ type: 'SET_SHORT_TEXTS', payload: chunks });
            setActiveKey('2')
        } catch (error) {
            console.error('Error handling send data:', error);
        }
    };

    return (
        <div className="conception-container">
            {/* 一次只折叠一个面板 */}
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
                            dispatch({ type: 'SET_ORIGINAL_TEXT', payload: e.target.value.replace(/\n/g, '\\n') })
                        }}
                    />
                </Panel>
                <Panel header={t("conception.shortTexts")} key="2">
                    <div>
                        <Table
                            dataSource={boardData.shortTexts.map((item, index) => ({
                                key: index,
                                shortText: item
                            }))}
                            columns={[{
                                title: t("conceptionPanel.chunk"),
                                dataIndex: 'shortText',
                                key: 'shortText',
                                ellipsis: {
                                    showTitle: false,
                                },
                                render: shortText => (
                                    <Tooltip placement="topLeft" title={shortText}>
                                        {shortText}
                                    </Tooltip>
                                ),
                                width: 300,
                            }]}
                        />
                    </div>
                </Panel>
            </Collapse>
        </div>
    )
}

export default ConceptionPanel