import React, { Component } from 'react';
import CalculationGrid from '../../components/CalculationGrid/CalculationGrid';

class Operations extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <CalculationGrid/>
            </div>
         );
    }
}
 
export default Operations;