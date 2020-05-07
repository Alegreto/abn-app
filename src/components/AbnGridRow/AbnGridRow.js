import React, { Component } from 'react';
import './AbnGridRow.scss';

class AbnGridRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowNumber: this.props.rowindex
        }
    }
    render() {
        //Create row reference
        // const aValue = 'aValue'+this.state.rowNumber;
        return (
            <div className="grid-row">
                <div className="grid-cell">
                    <input className="grid-input"
                        rowindex={this.props.rowIdx}
                        name="aValue"
                        type="text"
                        maxLength="5"
                        autoComplete="off"
                        value={this.props.rowValues.aValue}
                        onChange={(e) => this.props.update(this.state.rowNumber, e)}
                        readOnly={this.props.rowValues.readonly}

                    />
                </div>
                <div className="grid-cell">
                    <input className="grid-input"
                        name="bValue"
                        type="text"
                        maxLength="5"
                        autoComplete="off"
                        value={this.props.rowValues.bValue}
                        onChange={(e) => this.props.update(this.state.rowNumber, e)}
                        readOnly={this.props.rowValues.readonly}
                    />
                </div>
                <div className="grid-cell">
                    <input className="grid-input"
                        name="cValue"
                        type="text"
                        maxLength="5"
                        autoComplete="off"
                        value={this.props.rowValues.cValue}
                        onChange={(e) => this.props.update(this.state.rowNumber, e)}
                        readOnly={this.props.rowValues.readonly}
                    />
                </div>
            </div>
        );
    }
}

export default AbnGridRow;