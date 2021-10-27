import React from 'react'
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

export default function PageErrors(props) {
    const history = useHistory();
    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, The page you visited does not exist."
                extra={
                    <Button type="primary" onClick={() => { history.push('/') }}>Back Home</Button>
                }
            />
        </>
    )
}
