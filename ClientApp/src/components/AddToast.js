import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import constants from '../constants';

class AddToast extends Component {
  constructor(props) {
    super(props)
    this.state = ({ ...this.props.state.record })
    this.handleChangeInForm = this.handleChangeInForm.bind(this)
    this.submitEvent = this.submitEvent.bind(this)
    this.cancelToast = this.cancelToast.bind(this)
  }

  cancelToast()
  {
    var tempState = this.state
    Object.keys(tempState).map( key => {delete this.state[key];
      this.setState(this.state);})
      console.log(JSON.stringify(this.state))

    this.props.toggle()
  }

  componentWillReceiveProps(prevProps) {
    // if (prevProps.state.record !== null) {
    this.setState({
      ...prevProps.state.record
    })
    // }
  }

  handleChangeInForm(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    this.validateInput(event.target.name, event.target.value)
  }

  async submitEvent() {
    var isDataValidated = Object.keys(this.state).length > 0 
    Object.keys(this.state).map (key => { 
      if (this.validateInput(key, this.state[key]) !== undefined)
      {
        isDataValidated = false
        return (null)
      }
    })
    if (isDataValidated)
    {
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
    else
    {
      this.forceUpdate()
    }
  }

  hasNumber(myString) {
    return /\d/.test(myString);
  }

  validateInput(field, value) {
    var errorMsg = undefined
    if (value) {
      switch (field) {
        case constants.customerName:
        case constants.productName:
        case constants.storeName:
          if (value.length === 0) {
            errorMsg = ` is empty`
          }
          else if (value.length < 2) {
            errorMsg = ` must be more then 2 letters`
          }
          else if (this.hasNumber(value)) {
            errorMsg = ` must not contain numeric value`
          }
          break
        case constants.customerAddress:
        case constants.storeAddress:
          if (value.length === 0) {
            errorMsg = ` is empty`
          }
          else if (value.length < 2) {
            errorMsg = ` must be more then 2 letters`
          }
          break
        case constants.productPrice:
          if (parseInt(value) <= 0) {
            errorMsg = ` has invalid entry`
          }
          break
      }
    }
    else
    {
      errorMsg = ` is empty`
    }
    return errorMsg
  }


  showRegularModal() {
    var isFormNotSubmittable = Object.keys(this.state).length === 0
    var shouldSubmitDisabled = false
    return (
      <Modal isOpen={this.props.state.isEditVisisble}>
        <ModalHeader>Create {this.props.controller.prefix}</ModalHeader>
        <ModalBody>
          <form>
            {this.props.controller.fields.map(field => {
              var inputValue = this.state ? this.state[`${this.props.controller.prefix}${field}`] : ``
              var inputField = `${this.props.controller.prefix}${field}`

              var validationMsg = this.validateInput(inputField, inputValue)
              isFormNotSubmittable = validationMsg !== undefined 
              shouldSubmitDisabled = shouldSubmitDisabled === true ? shouldSubmitDisabled : validationMsg !== undefined
              return <FormGroup key={field}>
                <Label for={field}>{field}</Label>
                <Input id={`${this.props.controller.prefix}${field}`}
                  placeholder={`Enter ${field}`}
                  value={inputValue}
                  name={inputField}
                  onChange={this.handleChangeInForm} invalid={isFormNotSubmittable} />
                <FormFeedback>{validationMsg ? `${field} ${validationMsg}` : " "}</FormFeedback>
              </FormGroup>
            }
            )
            }
          </form>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-dark" onClick={this.cancelToast}>Cancel</Button>
          <Button className="btn btn-success" onClick={this.submitEvent} disabled = {shouldSubmitDisabled}>Submit{' '}<i className="fas fa-check"></i></Button>{' '}
        </ModalFooter>
      </Modal>

    );
  }

  render() {
    return this.showRegularModal()
  }
}
export default AddToast 