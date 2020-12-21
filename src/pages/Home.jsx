import React, { Component } from 'react'
import { connect } from 'react-redux';
// import { updateLoader,loadUsers } from '../store/actions/itemActions'

export class Home extends Component {

    state = {
    
    }


    componentDidMount() {
    }


    render() {
        return (
            <div className="home">
                <h1>HI</h1>
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         isLoader: state.userReducer.isLoader
//     }
// }

// const mapDispatchToProps = {
//     updateLoader,
//     loadUsers
// }

// export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)