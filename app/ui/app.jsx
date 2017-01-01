import React from 'react';

class Approval extends React.Component {
    unapprove() {
        this.props.onUnapprove(this.props.approval);
    }

    render(){
        return <li>{this.props.approval} <button onClick={this.unapprove.bind(this)}>delete</button></li>
    }
}

class Approvals extends React.Component {
    render() {
        var approvals = this.props.user.approvals;

        if(approvals.length) {
            return (
                <ul>
                    {approvals.map((approval, index) => {
                        return <Approval approval={approval} key={index} onUnapprove={this.props.onUnapprove}/>;
                    })}
                </ul>
            );
        } else {
            return <div>no approvals yet</div>;
        }
    }
}

class App extends React.Component {
  render() {
    return (
        <div>
            <p>Your ethereum address is: {this.props.user.address}</p>
            <h3>Your Approvals:</h3>
            <Approvals user={this.props.user} onApprove={this.props.userActions.approve}
                onUnapprove={this.props.userActions.unapprove}/>
        </div>
    );
  }
}

export {App, Approvals, Approval};
