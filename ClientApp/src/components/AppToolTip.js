import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const AppToolTip = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <Tooltip placement="right" isOpen={tooltipOpen} target={props.id} toggle={toggle}>
        This Record is in use, in "Sales" records.
      </Tooltip>
    </div>
  );
}

export default AppToolTip