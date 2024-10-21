const ToDo: React.FC = () => {



    return (
        <div style={{display:'flex',gap:'50px'}}>
            <div>


                <h1>Back-End</h1>
                <h4>Users</h4>
                <ol style={{ padding: '20px' }}>
                    <li>Add user</li>
                    <li>Edit users as admin</li>
                    <li>Disable/Enable user</li>
                    <li>Change password + mailing system</li>
                </ol>
                <h4>Roles</h4>
                <ol style={{ padding: '20px' }}>
                    <li>Implement logic with ROLES</li>
                </ol>
            </div>


            <div>
                <h1>Front-End</h1>
                <h4>Users</h4>
                <ol style={{ padding: '20px' }}>
                    <li>Add user screen</li>
                    <li>Edit users as admin</li>
                    <li>Disable/Enable user</li>
                    <li>Change password screen</li>
                </ol>
                <h4>Roles</h4>
                <ol style={{ padding: '20px' }}>
                    <li>Help backend</li>
                </ol>
            </div>


        </div>
    )
};

export default ToDo;