import React from 'react';

import renderGraph from '../renderGraph.js';
import InputAddress from './input-address.jsx';
import DisplayCred from './display-cred.jsx';
import Approval from './approval.jsx';
import Approvals from './approvals.jsx';
import ConnectedUserList from './connected-user-list.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            credAmount: 0,
            credTarget: null,
            approvals: this.props.user.approvals,
            disapprovals: this.props.user.disapprovals,
            connectedUsers: []
        };

        this.refreshData = this.refreshData.bind(this);
        this.renderGraph = this.renderGraph.bind(this);
        this.getCredFor = this.getCredFor.bind(this);
        this.approve = this.approve.bind(this);
        this.unapprove = this.unapprove.bind(this);
        this.disapprove = this.disapprove.bind(this);
        this.undisapprove = this.undisapprove.bind(this);
    }

    componentDidMount() {
        this.renderGraph();
    }

    refreshData() {
        this.renderGraph();
        this.updateCred();
    }

    renderGraph() {
        var graph = this.props.user.graph;
        var users = [];
        for(var address in graph) {
            users.push({
                address,
                approvals: graph[address].approvals,
                disapprovals: graph[address].disapprovals
            });
        }
        this.setState({connectedUsers: users});
        renderGraph(users, this.props.user.address);
    }

    updateCred() {
        if(this.state.credTarget) {
            this.getCredFor(this.state.credTarget);
        }
    }

    getCredFor(target) {
        var cred = this.props.user.getCredFor(target);
        this.setState({credAmount: cred, credTarget: target});
    }

    approve(target, onFinish) {
        this.props.user.approve(target).then(() => {
            onFinish();
            this.setState({approvals: this.props.user.approvals});
            this.refreshData();
        });
    }

    unapprove(target, onFinish) {
        this.props.user.unapprove(target).then(() => {
            onFinish();
            this.setState({approvals: this.props.user.approvals});
            this.refreshData();
        });
    }

    disapprove(target, onFinish) {
        this.props.user.disapprove(target).then(() => {
            onFinish();
            this.setState({disapprovals: this.props.user.disapprovals});
            this.refreshData();
        });
    }

    undisapprove(target, onFinish) {
        this.props.user.undisapprove(target).then(() => {
            onFinish();
            this.setState({disapprovals: this.props.user.disapprovals});
            this.refreshData();
        });
    }

    render() {
        return (
            <div>
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                EtherCred
                            </h1>
                            <h2 className="subtitle">
                                An online credibility network built on ethereum
                            </h2>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container app">
                        <div className="box">
                            Your ethereum address is: {this.props.user.address}
                        </div>
                        <div className="box">
                            <h3>Your Approvals</h3>
                            <InputAddress onSubmit={this.approve} placeholder="New approval..."
                                async={true} buttonText="add"/>
                            <Approvals approvals={this.state.approvals}
                                onUnapprove={this.unapprove}/>
                        </div>
                        <div className="box">
                            <h3>Your Disapprovals</h3>
                            <InputAddress onSubmit={this.disapprove} placeholder="New disapproval..."
                                async={true} buttonText="add"/>
                            <Approvals approvals={this.state.disapprovals}
                                onUnapprove={this.undisapprove}/>
                        </div>
                        <div className="box">
                            <h3>Calculate Cred</h3>
                            <InputAddress onSubmit={this.getCredFor} placeholder="Get someone's cred..." buttonText="calculate"/>
                            <DisplayCred amount={this.state.credAmount} target={this.state.credTarget}/>
                        </div>
                        <div className="box">
                            <h3>Your Network</h3>
                            <div id="user-graph"></div>
                            <ConnectedUserList users={this.state.connectedUsers}/>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
