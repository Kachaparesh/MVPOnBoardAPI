import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";

class AddToast extends Component {
  constructor(props) {
    super(props)
    this.state = ({ ...this.props.state.record, dropdownOpen: "" })
    this.handleChangeInForm = this.handleChangeInForm.bind(this)
    this.submitEvent = this.submitEvent.bind(this)
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.state.record !== null) {
      this.state = ({ ...prevProps.state.record, dropdownOpen: "" })
    }
  }

  handleChangeInForm(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async submitEvent() {
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
      this.state = null;
      this.props.toggle()
      window.location.reload()
    } catch (e) {
      return e;
    }
  }

  showRegularModal() {
    return (
      <Modal isOpen={this.props.state.isEditVisisble}>
        <ModalHeader>Create {this.props.controller.prefix}</ModalHeader>
        <ModalBody>
          <form>
            {this.props.controller.fields.map(field =>
              <FormGroup key = {field}>
                <Label for={field}>{field}</Label>
                <Input id={`${this.props.controller.prefix}${field}`}
                  placeholder={`Enter ${field}`}
                  value={this.state ? this.state[`${this.props.controller.prefix}${field}`] : ``}
                  name={`${this.props.controller.prefix}${field}`}
                  onChange={this.handleChangeInForm} />
              </FormGroup>)
            }
          </form>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-dark" onClick={() => this.props.toggle()}>Cancel</Button>
          <Button className="btn btn-success" onClick={this.submitEvent}>Submit{' '}<i className="fas fa-check"></i></Button>{' '}
        </ModalFooter>
      </Modal>

    );
  }

  render() {
    return this.showRegularModal()
  }
}
export default AddToast 