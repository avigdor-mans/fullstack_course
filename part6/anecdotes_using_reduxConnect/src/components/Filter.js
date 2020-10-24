import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/anecdoteReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    props.setFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={props.filter} onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => ({filter: state.filterAn==='ALL'? '' : state.filterAn})

const ConnectedFilter = connect(mapStateToProps, {setFilter})(Filter)
export default ConnectedFilter