import React, { Component } from 'react'
import AddToast from './AddToast';
import SaleAddToast from './SaleAddToast';
import DeleteToast from './DeleteToast';
import {
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import AppToolTip from './AppToolTip';
import Moment from 'react-moment';
import constants from "../constants";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
class AppTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisisble: false,
      isEditVisisble: false,
      record: null,
      data: this.props.dbdata,
      currentPage: 1,
      recordsPerPage: 5,
      dropdownOpen: false,
      sortSequence: null
    }
    this.toggleVisible = this.toggleVisible.bind(this)
    this.toggleEditVisible = this.toggleEditVisible.bind(this)
    this.renderRecords = this.renderRecords.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  toggleDropDown() {
    this.setState(prevState => {
      return {
        dropdownOpen: !prevState.dropdownOpen
      }
    })
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  splitRecords(isSale) {
    const { data, currentPage, recordsPerPage } = this.state;
    // Logic for displaying records
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    if (this.state.sortSequence)
    {
      const tempObj = this.state.sortSequence
      const column = Object.keys(tempObj)[0]
      return isSale? this.getSaleSorted(column, currentRecords) : this.sortRecords(column, currentRecords)
    }
    else
    {
      return currentRecords
    }
  }

  calculationOfPAges() {
    const { data, recordsPerPage } = this.state;
    // Logic for displaying page numbers
    // if (data)
    // {
      const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / recordsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers

    // }
    // else
    // {
    //   return [1]
    // }
  }

  toggleEditVisible(row = null) {
    this.setState(prevState => {
      return {
        isEditVisisble: !prevState.isEditVisisble,
        record: row
      }
    })
  }
  toggleVisible(row = null) {
    this.setState(prevState => {
      return {
        isVisisble: !prevState.isVisisble,
        record: row
      }
    })
  }

  editButton(object) {
    return (<button className="btn btn-warning text-light font-weight-bolder" onClick={() => this.toggleEditVisible(object)}>
      <i className='fas fa-edit'> </i>
      {' '}EDIT
      </button>);
  }

  deleteButton(object) {
    return (
      <button className="btn btn-danger font-weight-bolder" onClick={() => this.toggleVisible(object)}>
        <i className="fas fa-trash"></i>
        {' '}DELETE
      </button>);
  }

  disabledDeleteButton(object) {
    return (
      <div>
        <button id="usedRecord" className="btn btn-danger font-weight-bolder" disabled onClick={() => this.toggleVisible(object)}>
          <i className="fas fa-trash"></i>
          {' '}DELETE
    </button>
        <AppToolTip id="usedRecord" />
      </div>
    );
  }

  renderRecords(object) {
    let recordUI = null
    if (this.props.prefix === "sale") {
      recordUI = <tr key={object[`${this.props.prefix}Id`]}>
        <td>{object[constants.customer][constants.customerName]}</td>
        <td>{object[constants.product][constants.productName]}</td>
        <td>{object[constants.store][constants.storeName]}</td>
        <td><Moment format="DD MMM, YYYY">
          {object[constants.dateSold]}
        </Moment></td>
        <td>
          {this.editButton(object)}
        </td>
        <td>
          {this.deleteButton(object)}
        </td>
      </tr>
    }
    else {
      recordUI = <tr key={object[`${this.props.prefix}Id`]}>
        <td>{object[`${this.props.prefix}${this.props.fields[0]}`]}</td>
        <td>{object[`${this.props.prefix}${this.props.fields[1]}`]}</td>
        <td>
          {this.editButton(object)}
        </td>
        <td>
          {object[`sales`] && object[`sales`].length > 0 ? this.disabledDeleteButton(object) : this.deleteButton(object)}
        </td>
      </tr>
    }

    return recordUI
  }

  updateSortStatus(field) {
    var stateValue = field
    this.setState(prevState => {
      var tempValue = prevState.sortSequence && prevState.sortSequence[stateValue] ? prevState.sortSequence[stateValue] : 0
      return {
        sortSequence: {
          [stateValue]: tempValue === 2 ? 0 : tempValue + 1
        }
      }
    })
  }
  sortRecords(column, records) {
    var columnToSort = `${column}`
    if (this.state.sortSequence[columnToSort] === 0) {
      columnToSort = `${this.props.prefix}Id`
    }
    records.sort((a, b) => {
      if (typeof a[columnToSort] === "string") {
        return (
          a[columnToSort].toUpperCase() === b[columnToSort].toUpperCase() ? 0 :
            (a[columnToSort].toUpperCase() > b[columnToSort].toUpperCase()) ? 1 :
              -1
        )
      }
      else if (typeof a[columnToSort] === "number") {
        return (parseInt(a[columnToSort]) - parseInt(b[columnToSort]))
      }
      else if (Object.prototype.toString.call(a[columnToSort]) === '[object Date]') {
        return (new Date(a[columnToSort]) - new Date(b[columnToSort]))
      }
    });
    if (this.state.sortSequence[columnToSort] === 2) {
      records.reverse()
    }
    return records
  }

  sortSaleRecords(category, column, field, records) {
    var columnToSort = `${field}`
    if (this.state.sortSequence[columnToSort] === 0) {
      columnToSort = `${this.props.prefix}Id`
    }
    records.sort((a, b) => {
      if (columnToSort === constants.saleFields.Date_Sold) {
        return (new Date(a[column]) - new Date(b[column]))
      }
      else if (columnToSort === constants.saleId) {
        return (parseInt(a[columnToSort]) - parseInt(b[columnToSort]))
      }
      else if (typeof b[category][column] === "number") {
        return (parseInt(a[category][column]) - parseInt(b[category][column]))
      }
      else if (typeof b[category][column] === "string") {
        return (
          a[category][column].toUpperCase() === b[category][column].toUpperCase() ? 0 :
            (a[category][column].toUpperCase() > b[category][column].toUpperCase()) ? 1 :
              -1
        )
      }
    });
    if (this.state.sortSequence[columnToSort] === 2) {
      records.reverse()
    }
    return records
  }

  getSaleSorted(column, records) {
    switch (column) {
      case constants.saleFields.Customer:
        return this.sortSaleRecords(constants.customer, constants.customerName, column, records)
      case constants.saleFields.Store:
        return this.sortSaleRecords(constants.store, constants.storeName, column, records)
      case constants.saleFields.Product:
        return this.sortSaleRecords(constants.product, constants.productName, column, records)
      default:
        return this.sortSaleRecords(constants.sale, constants.dateSold, column, records)
    }
  }

  showHeader(isSale) {
    if (isSale) {
      return (Object.keys(this.props.fields).map(field => {
        const tempKeyStr = [`${constants.saleFields[field]}`]
        var sortingStatus = this.state.sortSequence && this.state.sortSequence[tempKeyStr] ? this.state.sortSequence[tempKeyStr] : 0
        return (<th key = {tempKeyStr} onClick={() => {
          this.updateSortStatus(tempKeyStr)
        }
        }>{constants.saleFields[field]}{' '}<i className="fas fa-caret-up" style={sortingStatus === 1 ? { color: "black" } : { color: "lightgray" }}></i><i className="fas fa-caret-down" style={sortingStatus === 2 ? { color: "black" } : { color: "lightgray" }}></i>
        </th>)
      }
      )
      )
    }
    else {
      return (this.props.fields.map(field => {
        const tempKeyStr = [`${this.props.prefix}${field}`]
        var sortingStatus = this.state.sortSequence && this.state.sortSequence[tempKeyStr] ? this.state.sortSequence[tempKeyStr] : 0
        return (<th key = {tempKeyStr} onClick={() => {
          this.updateSortStatus(tempKeyStr)
        }
        }>{field}{' '}<i className="fas fa-caret-up" style={sortingStatus === 1 ? { color: "black" } : { color: "lightgray" }}></i><i className="fas fa-caret-down" style={sortingStatus === 2 ? { color: "black" } : { color: "lightgray" }}></i>
        </th>)
      }
      )
      )
    }
  }

  renderPaging() {
    const renderPageNumbers = this.calculationOfPAges().map(number => {
      return (
        <PaginationItem key={`paging${number}`}>
          <PaginationLink key={number}
            id={number}
            onClick={this.handleClick}>
            {number}
          </PaginationLink>
        </PaginationItem>
      );
    });

    return renderPageNumbers
  }

  render() {
    return (
      <div>
        <button className="mt-3 ml-0 btn btn-primary font-weight-bolder" onClick={() => this.toggleEditVisible()}>New {this.props.prefix} </button>
        <table className='table table-striped table-bordered mt-5' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              {this.showHeader(this.props.prefix === "sale")}
              <th key = "EditAction">Edit Record</th>
              <th key = "DeleteAction">Delete Record</th>
            </tr>
          </thead>
          <tbody>
            {this.splitRecords(this.props.prefix === "sale").map(object =>
              this.renderRecords(object)
            )}
          </tbody>
        </table>
        <div className="row">
          <div className="col">
            <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={() => this.toggleDropDown()}>
              <DropdownToggle caret className="bg-white text-dark">
                {this.state.recordsPerPage}
              </DropdownToggle>
              <DropdownMenu>
                {constants.recordQuantity.map(quantity =>
                  <DropdownItem key = {`pagingSelection${quantity}`} onClick={() => this.setState({ recordsPerPage: quantity, currentPage: 1 })}>
                    {quantity}
                  </DropdownItem>
                )
                }
              </DropdownMenu>
            </InputGroupButtonDropdown>
          </div>
          <div className="col">
            <div className="float-right">
              <Pagination aria-label="Page navigation example">
                {this.renderPaging()}
              </Pagination>
            </div>
          </div>
        </div>

        <DeleteToast state={this.state} toggle={this.toggleVisible} controller={this.props} />
        {this.props.prefix === "sale" ? <SaleAddToast state={this.state} toggle={this.toggleEditVisible} controller={this.props} />
          :
          <AddToast state={this.state} toggle={this.toggleEditVisible} controller={this.props} />}
      </div>
    )
  }
}
// const mapDispatchToProps = (dispatch) => ({
//   updateData: (data) =>{dispatch({ type: 'UPDATE_ALL_RECORD', records: data })} 
// });

export default AppTable;
