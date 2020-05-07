import React, { Component } from 'react';
import './Home.scss'
//Import local data only for testing purposes
import jsonData from '../../assets/data/info.json'



class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            testData: []
        }
    }
    componentDidMount() {
        let members = jsonData.members;
        this.setState({
            testData: members
        });
    }
    render() {
        console.log(this.state.testData);

        const items = this.state.testData.map((i, idx) =>
            <li key={idx}>{i.name}</li>
        );

        return (
            <div className="Home">
                <h1>This is the Home Page</h1>
                <div className="color-container">
                    <ul>
                        {items}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Home;
