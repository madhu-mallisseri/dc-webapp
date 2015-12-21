import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { actions as counterActions } from '../redux/modules/counter';
import './HomeView.scss';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter
});
export class HomeView extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    doubleAsync: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>DATA CORAL</h1>
        <hr />
        <Link className='btn btn-default' to='/about'>Go To About View</Link><br />
        <Link className='btn btn-default' to='/login'>Login</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, counterActions)(HomeView);
