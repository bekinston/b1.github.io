import React, { Component } from 'react'

class Check extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fruites: [
                {id: 1, value: "banana", isChecked: false},
                {id: 2, value: "apple", isChecked: false},
                {id: 3, value: "mango", isChecked: false},
                {id: 4, value: "grap", isChecked: false}
            ]
        }
    }

    render() {
        return (
            <div className="Check">
            </div>
        );
    }
}

export default Check
