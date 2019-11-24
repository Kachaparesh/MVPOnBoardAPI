import React, { Component }  from 'react';
import AppTable from "./AppTable";
import constants from '../constants';

import { connect } from 'react-redux';

export class AppAPICall extends Component {
  static displayName = AppAPICall.name;
  
  renderRecordsTable(records){
    let prefixStr = this.props.location.pathname.substr(1)
    prefixStr = prefixStr.length > 0 ? prefixStr : constants.customer
    let fields = []
    switch (prefixStr) {
        case constants.product:
            fields = constants.productFields
            break
        case constants.sale:
            fields = constants.saleFields
            break
        default:
            fields = constants.customerFields //Store and Customer fields handled here because both have same name
            break                
    }
    return (
      
        <AppTable dbdata={records[prefixStr]} fields={fields} prefix={prefixStr} additionaRecords = {records}/>
    );
  }
  render() {
    let contents = this.props.records.fetching
      ? <p><em>Loading...</em></p>
      : this.renderRecordsTable(this.props.records.allRecords);
    return (
        <div>
        {contents}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  records: state
});

export default connect(
  mapStateToProps
)(AppAPICall);