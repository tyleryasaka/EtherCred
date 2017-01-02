import React from 'react';

export default class DisplayCred extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        if(this.props.target) {
            return (
                <div>
                    <span className="tag is-dark">
                        Cred: {this.props.amount}
                    </span>
                    &nbsp;
                    for {this.props.target}
                </div>
            );
        } else {
            return null;
        }
    }
}
