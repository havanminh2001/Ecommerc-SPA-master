import { Button, Input, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from "react-highlight-words";

export const handleReset = (clearFilters, [seach, setSeach]) => {
    clearFilters();
    setSeach({ ...seach, searchText: '' });
};

export const handleSearch = (selectedKeys, confirm, dataIndex, [seach, setSeach]) => {
    confirm();
    setSeach({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
    })
};

export const getColumnSearchProps = (dataIndex, searchInput, [seach, setSeach]) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
            <Input
                ref={node => {
                    searchInput = node;
                }}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex, [seach, setSeach])}
                style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex, [seach, setSeach])}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                >
                    Search
                </Button>
                <Button onClick={() => handleReset(clearFilters, [seach, setSeach])} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        confirm({ closeDropdown: false });
                        setSeach({
                            searchText: selectedKeys[0],
                            searchedColumn: dataIndex,
                        })
                    }}
                >
                    Filter
                </Button>
            </Space>
        </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
        record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
    onFilterDropdownVisibleChange: visible => {
        if (visible) {
            setTimeout(() => searchInput.select(), 100);
        }
    },
    render: text =>
        seach.searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[seach.searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
        ) : (
            text
        ),
});


