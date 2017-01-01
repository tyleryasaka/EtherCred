import React from 'react';

class NewApproval extends React.Component {
    constructor(props) {
        super(props);
        this.state = {address: ''};

        this.approve = this.approve.bind(this)
        this.onChangeAddress = this.onChangeAddress.bind(this)
    }

    onChangeAddress(event) {
        this.setState({address: event.target.value});
    }

    approve() {
        this.props.onApprove(this.state.address);
        this.setState({address: ''});
    }

    render(){
        return (
            <div>
                <input type="text" placeholder="New approval..." value={this.state.address}
                    onChange={this.onChangeAddress}/>
                <button onClick={this.approve}>Add</button>
            </div>
        )
    }
}

class Approval extends React.Component {
    constructor(props) {
        super(props);
        this.unapprove = this.unapprove.bind(this)
    }

    unapprove() {
        this.props.onUnapprove(this.props.approval);
    }

    render(){
        return <li>{this.props.approval} <button onClick={this.unapprove}>delete</button></li>
    }
}

class Approvals extends React.Component {
    render() {
        if(this.props.approvals.length) {
            return (
                <ul>
                    {this.props.approvals.map((approval, index) => {
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
    constructor(props) {
        super(props);
        this.state = {
            approvals: this.props.user.approvals,
            disapprovals: this.props.user.disapprovals
        };

        this.approve = this.approve.bind(this);
        this.unapprove = this.unapprove.bind(this);
        this.disapprove = this.disapprove.bind(this);
        this.undisapprove = this.undisapprove.bind(this);
    }

    approve(target) {
        this.props.user.approve(target).then(() => {
            this.setState({approvals: this.props.user.approvals});
        });
    }

    unapprove(target) {
        this.props.user.unapprove(target).then(() => {
            this.setState({approvals: this.props.user.approvals});
        });
    }

    disapprove(target) {
        this.props.user.disapprove(target).then(() => {
            this.setState({disapprovals: this.props.user.disapprovals});
        });
    }

    undisapprove(target) {
        this.props.user.undisapprove(target).then(() => {
            this.setState({disapprovals: this.props.user.disapprovals});
        });
    }

    render() {
        return (
            <div>
                <p>Your ethereum address is: {this.props.user.address}</p>
                <h3>Your Approvals:</h3>
                <NewApproval onApprove={this.approve}/>
                <Approvals approvals={this.state.approvals}
                    onUnapprove={this.unapprove}/>
                <h3>Your Disapprovals:</h3>
                <NewApproval onApprove={this.disapprove}/>
                <Approvals approvals={this.state.disapprovals}
                    onUnapprove={this.undisapprove}/>
            </div>
        );
    }
}

export {App, Approvals, Approval};
