import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import {
    InputGroup,
    InputGroupButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import constants from "../constants";

class SaleAddToast extends Component {
    constructor(props) {
        super(props)
        this.state = { dropdownOpen: "", [constants.dateSold]: new Date().toLocaleDateString()}
        this.submitEvent = this.submitEvent.bind(this)
        this.toggleDropDown = this.toggleDropDown.bind(this)
        this.cancelToast = this.cancelToast.bind(this)
    }

    componentWillReceiveProps(prevProps) {
        // if (prevProps.state.record !== null) {
        this.setState({
            ...prevProps.state.record, dropdownOpen: ""
        })
        if (!(constants.dateSold in this.state)) {
            this.setState({
                [constants.dateSold]: new Date().toLocaleDateString()
            })
        }
        // }
    }
    cancelToast() {
        var tempState = this.state
        Object.keys(tempState).map(key => {
            if (key !== "dropdownOpen" && key !== constants.dateSold) {
                delete this.state[key];
                this.setState(this.state);
            }
        })
        console.log(JSON.stringify(this.state))

        this.props.toggle()
    }

    toggleDropDown(field) {
        if (this.state.dropdownOpen === field) {
            this.setState({
                dropdownOpen: null,
            })
        }
        else {
            this.setState({
                dropdownOpen: field,
            })
        }

    }

    handleChangeForSale(name, value) {
        this.setState({
            [name]: value
        })
        this.validateInput(value)
    }

    async submitEvent() {
        var isDataValidated = Object.keys(this.state).length > 2
        Object.keys(this.state).map(key => {
            if (key !== "dropdownOpen" && key !== constants.dateSold) {
                if (this.validateInput(this.state[key]) !== undefined) {
                    isDataValidated = false
                    return (null)
                }
            }
        })
        if (isDataValidated) {
            const settings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            };
            const urlStr = `api/${this.props.controller.prefix}/${this.props.state.record ? "update" : "create"}/`
            try {
                const fetchResponse = await fetch(urlStr, settings);
                this.props.toggle()
                window.location.reload()
            } catch (e) {
                return e;
            }
        }
        else {
            this.forceUpdate()
        }
    }

    validateInput(value) {
        var errorMsg = undefined
        if (value) {
            if (value.length === 0) {
                errorMsg = ` is empty`
            }
        }
        else {
            errorMsg = ` is empty`
        }
        return errorMsg
    }

    getFullRecord(type = "") {
        return this.props.controller.additionaRecords[type]
    }

    showDropDownRecords(column) {
        switch (column) {
            case constants.customerId:
                const temp = this.getFullRecord(constants.customer).map(customerRecords => <DropdownItem key={customerRecords[constants.customerId]} onClick={() => this.handleChangeForSale(column, customerRecords[constants.customerId])}>
                    {customerRecords[constants.customerName]}
                </DropdownItem>
                )

                return (<DropdownMenu>
                    {temp}
                </DropdownMenu>
                )
            case constants.storeId:
                const temp1 = this.getFullRecord(constants.store).map(storeRecords => <DropdownItem key={storeRecords[constants.storeId]} onClick={() => this.handleChangeForSale(column, storeRecords[constants.storeId])}>
                    {storeRecords[constants.storeName]}
                </DropdownItem>
                )
                return (<DropdownMenu>
                    {temp1}
                </DropdownMenu>
                )
            case constants.productId:
                const temp2 = this.getFullRecord(constants.product).map(productRecords => <DropdownItem key={productRecords[constants.productId]} onClick={() => this.handleChangeForSale(column, productRecords[constants.productId])}>
                    {productRecords[constants.productName]}
                </DropdownItem>
                )
                return (<DropdownMenu>
                    {temp2}
                </DropdownMenu>
                )
        }
    }

    getSaleKeys(column) {
        switch (column) {
            case constants.saleFields.Customer:
                return constants.customerId
            case constants.saleFields.Store:
                return constants.storeId
            case constants.saleFields.Product:
                return constants.productId
            default:
                return constants.dateSold
        }
    }

    findCustomerName() {
        let custElement = ""
        const custArray = this.getFullRecord(constants.customer)
        custArray.forEach(element => {
            if (element.customerId === this.state[constants.customerId]) {
                custElement = element[constants.customerName]
            }
        });
        return custElement
    }

    findStoreName() {
        let storeElement = ""
        const storeArray = this.getFullRecord(constants.store)
        storeArray.forEach(element => {
            if (element.storeId === this.state[constants.storeId]) {
                storeElement = element[constants.storeName]
            }
        });
        return storeElement
    }

    findProductName() {
        let prodElement = ""
        const prodArray = this.getFullRecord(constants.product)
        prodArray.forEach(element => {
            if (element.productId === this.state[constants.productId]) {
                prodElement = element[constants.productName]
            }
        });
        return prodElement
    }

    findSaleDate() {
        if (([constants.dateSold] in this.state)) {
            return this.state[constants.dateSold]
        }
        else {
            return new Date()
        }
    }

    getSalesValue(column) {
        switch (column) {
            case constants.saleFields.Customer:
                return this.findCustomerName()
            case constants.saleFields.Store:
                return this.findStoreName()
            case constants.saleFields.Product:
                return this.findProductName()
            default:
                return this.findSaleDate()
        }
    }

    showSalesModal() {
        var isFormNotSubmittable = Object.keys(this.state).length === 2
        var shouldSubmitDisabled = false
        return (

            <Modal isOpen={this.props.state.isEditVisisble}>
                <ModalHeader>Create {this.props.controller.prefix}</ModalHeader>
                <ModalBody>
                    <form>
                        {Object.keys(this.props.controller.fields).map((field) => {
                            var inputId = `${this.props.controller.prefix}${field}`
                            var inputValue = this.getSalesValue(field) //this.state ? this.state[`${this.props.controller.prefix}${field}`] : ``
                            var inputName = this.getSaleKeys(field)
                            var inputPlaceholder = `Enter ${constants.saleFields[field]}`

                            var validationMsg = this.validateInput(inputValue)
                            isFormNotSubmittable = validationMsg !== undefined
                            shouldSubmitDisabled = shouldSubmitDisabled === true ? shouldSubmitDisabled : validationMsg !== undefined
                            return (<FormGroup key={field}>
                                <Label for={constants.saleFields[field]}>{[constants.saleFields[field]]}</Label>
                                <div>
                                    {constants.saleFields[field] === "Date Sold" ?

                                        <DatePicker
                                            dateFormat="dd MMM, yyyy"
                                            selected={new Date(inputValue)}
                                            placeholderText={inputPlaceholder}
                                            onChange={(date) => this.handleChangeForSale(inputName, date.toLocaleDateString())}
                                            customInput={<Input />} />

                                        :
                                        <InputGroup>
                                            <Input id={inputId}
                                                placeholder={inputPlaceholder}
                                                value={inputValue}
                                                name={inputName}
                                                disabled
                                                invalid={isFormNotSubmittable}
                                            />
                                            <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen === field} toggle={() => this.toggleDropDown(field)}>
                                                <DropdownToggle caret>
                                                </DropdownToggle>
                                                {this.showDropDownRecords(inputName)}
                                            </InputGroupButtonDropdown>
                                            <FormFeedback>{validationMsg ? `${field} ${validationMsg}` : " "}</FormFeedback>
                                        </InputGroup>
                                    }
                                </div>
                            </FormGroup>)
                        }
                        )
                        }
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-dark" onClick={this.cancelToast}>Cancel</Button>
                    <Button className="btn btn-success" onClick={this.submitEvent} disabled={shouldSubmitDisabled}>Submit{' '}<i className="fas fa-check"></i></Button>{' '}
                </ModalFooter>
            </Modal >

        );
    }
    render() {
        return this.showSalesModal()
    }
}
export default SaleAddToast 