import React from 'react';

export default class ConnectedUserList extends React.Component {
    render() {
        return (
            <table className="table">
                <tbody>
                    <tr>
                        <th>Key</th>
                        <th>Address</th>
                    </tr>
                    {this.props.users.map((user, index) => {
                        return  (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{user.address}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }
}
