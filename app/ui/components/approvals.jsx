import React from 'react';

export default class Approvals extends React.Component {
    render() {
        if(this.props.approvals.length) {
            return (
                <table className="table">
                    <tbody>
                        {this.props.approvals.map((approval, index) => {
                            return <Approval approval={approval} key={index} onUnapprove={this.props.onUnapprove}/>;
                        })}
                    </tbody>
                </table>
            );
        } else {
            return <div>no approvals yet</div>;
        }
    }
}
