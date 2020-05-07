import React, { Component } from 'react';
//CSS
import './CalculationGrid.scss';
//Components
import AbnGridRow from '../AbnGridRow/AbnGridRow'
//Local data
import operationList from '../../assets/data/operationList.json'

class CalculationGrid extends Component {

    constructor(props) {

        super(props);

        this.state = {
            rowCounter: 0,
            operation: '',
            operationComplete: false,
            operationValidated: false,
            xValue: '',
            yValue: '',
            gridContent: [],
            gridErrors: []
        };

        this.handleOperatorChange = this.handleOperatorChange.bind(this);
        this.addAbnGridRow = this.addAbnGridRow.bind(this);
        this.updateAbnGrid = this.updateAbnGrid.bind(this);

    }

    //Fn que actualiza el estado de los operandos(xValue-yValue)
    handleOperatorChange(event) {
        const target = event.target.name;
        let inputValue = event.target.value;

        if (isNaN(inputValue)) {
            inputValue = '';
        }
        this.setState({
            [target]: inputValue
        });
    }

    //Fn que valida si los operandos permiten realizar la operación
    validateOperation() {
        const operation = this.state.operation;
        const xValue = parseInt(this.state.xValue);
        const yValue = parseInt(this.state.yValue);
        if (operation !== '') {
            if (operation === '-' || operation === '/') {
                if (xValue > yValue) {
                    this.setState({
                        operationValidated: true
                    });
                    this.addAbnGridRow();
                }
            } else {
                this.setState({
                    operationValidated: true
                });
                this.addAbnGridRow();
            }
        }
    }

    onClickValidateRow() {
        let row = this.state.rowCounter - 1;
        let xValue = parseInt(this.state.xValue);
        let yValue = parseInt(this.state.yValue);
        let gridContent = this.state.gridContent;
        let validationResult = this.validateGridRow(row, xValue, yValue, gridContent);
        //Añadir errores al estado
        this.setState({
            gridErrors: validationResult
        });
        if (validationResult.length === 0 && gridContent[row].cValue !== 0) {
            this.addAbnGridRow();
        }
        if (validationResult.length === 0 && gridContent[row].cValue === 0) {
            this.setState({
                operationComplete: true
            });
        }
    }

    //Fn que valida la última fila del grid
    validateGridRow(row, xOperator, yOperator, gridContent) {
        let errors = [];
        let xValue = 0;
        let yValue = 0;
        const aValue = gridContent[row].aValue;
        const bValue = gridContent[row].bValue;
        const cValue = gridContent[row].cValue;
        let bCalculation = 0;
        let cCalculation = 0;
        if (row === 0) {
            //Cálculo para la primera fila
            xValue = xOperator;
            yValue = yOperator;
            bCalculation = xValue - aValue;
            cCalculation = yValue - aValue;
        } else {
            //Cálculo para el resto de filas
            let previousRow = row - 1;
            xValue = gridContent[previousRow].bValue;
            yValue = gridContent[previousRow].cValue;
            bCalculation = xValue - aValue;
            cCalculation = yValue - aValue;
        }
        if (aValue > yValue) {
            errors.push({ errorMessage: 'La cifra a restar es mayor que el resto'})
        }
        if (bValue !== bCalculation) {
            errors.push({ errorMessage: 'La resta no es correcta' })
        }
        if (cValue !== cCalculation) {
            if (bValue !== 0) {
                errors.push({ errorMessage: 'El sustraendo restante no es correcto' })
            }
        }
        if(errors.length > 0){
            this.setState({
                gridErrors: errors
            })
        }
        return errors;
    }

    //Fn para añadir una fila vacía
    addAbnGridRow(event) {
        const row = {
            aValue: '',
            bValue: '',
            cValue: '',
            readonly: false
        }
        //Cambio de estado que permite setear las filas existentes a solo lectura
        const rowNumber = this.state.rowCounter;
        if (rowNumber >= 0) {
            this.setState({
                gridContent: this.state.gridContent.map((item, index) =>
                    index <= rowNumber ? { ...item, readonly: true } : item,
                )
            })
        }
        //Cambio de estado que permite adicionar fila con valores vacíos
        this.setState(state => ({
            gridContent: state.gridContent.concat(row),
            rowCounter: state.rowCounter + 1
        }));


        console.log(this.state.gridContent);
    }

    updateAbnGrid(rowIdx, event) {
        let inputName = event.target.name;
        let valueChanged = parseInt(event.target.value);
        if (isNaN(valueChanged)) {
            valueChanged = '';
        }
        this.setState(state => {
            const list = state.gridContent.map((item, i) => {
                if (i === rowIdx) {
                    item[inputName] = valueChanged
                }
                return item;
            });
            return {
                list
            };
        });
    }

    handleSelectChange(event) {
        this.setState({
            operation: event.target.value
        });
    }

    render() {
        const renderRows = this.state.gridContent.map((i, idx) =>
            <AbnGridRow key={idx} rowValues={i} update={this.updateAbnGrid} rowindex={idx} />
        );
        const operationOptions = operationList.map((i, idx) =>
            <option key={idx} value={i.operationSign}>{i.operationDescription.charAt(0).toUpperCase() + i.operationDescription.slice(1)}</option>
        );
        const operationIcon = operationList.find(op => op.operationSign === this.state.operation);
        const errors = this.state.gridErrors.map(function(data, idx) {
            return <p className="error-description" key={idx}>{data.errorMessage}</p>;
        });
        return (
            <div>
                <div className="abn-select-operation-ctn">
                    <select className="operation-selector" value={this.state.operation} onChange={this.handleSelectChange.bind(this)}>
                        <option disabled value=''>Selecciona una operación</option>
                        {operationOptions}
                    </select>
                </div>
                {
                this.state.operation !== '' &&
                <div className="abn-grid-ctn">
                    <div id="calculation-grid-ctn" className="calculation-grid-ctn">
                        <div className="header-row">
                            <div className="grid-cell">
                                <input className="grid-input"
                                    name="xValue"
                                    type="text"
                                    autoComplete="off"
                                    maxLength="5"
                                    value={this.state.xValue}
                                    onChange={this.handleOperatorChange}
                                    readOnly={this.state.operationValidated}
                                />
                            </div>
                            <div className="grid-cell operator-cell">
                                <img src={process.env.PUBLIC_URL + '/' + operationIcon.operationIcon} alt={operationIcon.operationDescription} />
                            </div>
                            <div className="grid-cell last-header-cell">
                                <input className="grid-input"
                                    name="yValue"
                                    type="text"
                                    autoComplete="off"
                                    maxLength="5"
                                    value={this.state.yValue}
                                    onChange={this.handleOperatorChange}
                                    readOnly={this.state.operationValidated}
                                />
                            </div>
                        </div>
                        {renderRows}
                    </div>
                    <div className="add-row-btn-ctn">
                        {
                            this.state.rowCounter === 0 &&
                            <button className="round-btn" onClick={this.validateOperation.bind(this)}>Crear rejilla</button>
                        }
                        {
                            this.state.rowCounter > 0 &&
                            <button className="round-btn" onClick={this.onClickValidateRow.bind(this)}>Validar fila</button>
                        }
                    </div>
                </div>
                }
                {/* {
                    this.state.operationComplete &&
                    <p>Operación correcta</p>
                } */}
                {
                    this.state.gridErrors.length > 0 &&
                    <div className="errors-ctn">{errors}</div>

                }
            </div>

        );
    }
}

export default CalculationGrid;