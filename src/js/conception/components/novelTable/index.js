import React from 'react';
import { Table, Tooltip, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'

export const ShortTextsTable = ({ shortTexts }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const boardData = useSelector(state => state.boardData);
    const boardLength = boardData.boards.length;
    const dataSource = shortTexts.map((item, index) => ({
        key: index,
        shortText: item
    }));
    const handleSendToScene = (shortText, index) => {
        dispatch({ type: 'SET_SCENE_TEXT', payload: {
            index: index,
            shortText: shortText
        } });
    };
    const handleSendAllToScene = () => {
        dispatch({ type: 'SET_ALL_SCENE_TEXT', payload: {
            shortTexts: shortTexts
        } });
    };
    const columns = [
        {
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
        // 设置宽度
        width: '80%',
    },
    // 添加一个按钮列
    {
        title: t("conceptionPanel.operation"),
        key: 'action',
        render: (text, record) => (
            <Button 
                type="primary" 
                onClick={() => handleSendToScene(record.shortText, record.key)}
                disabled={record.key >= boardLength}
                >
                {t("conceptionPanel.sendToScene")}
            </Button>
        ),
        width: 'auto',
    }
    ];
    return (
        <div className='novel-table'>
            <Table
                dataSource={dataSource}
                columns={columns}
            />
            <Button type="primary" onClick={() => handleSendAllToScene()}>
                {t("conceptionPanel.sendAllToScene")}
            </Button>
        </div>
    );
};
