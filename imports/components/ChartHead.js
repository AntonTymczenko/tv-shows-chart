import React from 'react';
import { chartFields } from '/imports/constants';
import { connect } from 'react-redux';

const ChartHead = props => (
  <tr>
    { chartFields.map(field => (
      <th
        key={field.slug}
      >{ field.name }</th>
    ))}
  </tr>
)


const mapStateToProps = (state, props) => ({
  sort: state.shows.sort,
})

export default connect(mapStateToProps)(ChartHead);
