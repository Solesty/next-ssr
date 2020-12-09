import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, initialCards, addItem } from '../store'
import withRedux from 'next-redux-wrapper'

import "./index.css"
import Card from "./Card"

class Index extends React.Component {
    // how to initialize state in nextjs
    // you can not use getInitialProps and getStaticProps together


    static async getInitialProps({ store }) {
        console.log("getInitialProps")
        store.dispatch(initialCards())
    }


    render() {
        return (
            <div className="App" >
                <header className="App-header" >
                    <img src={"/static/logo.png"} className="static-logo" />
                </header>
                <div className="Grid" >
                    {
                        this.props.cards.map((card) => <Card key={card.id} />)
                    }
                </div>
            </div>
        )
    }
}


// export async function getStaticProps() {
//     // all these happens in the server

//     // Perform network request
//     const res = await fetch('https://api.github.com/repos/vercel/next.js')
//     const json = await res.json()

//     // this is printed on the servr's console
//     // console.log(json)

//     return { props: { cards: data } }
// }


const mapDispatchToProps = (dispatch) => {
    return {
        initialCards: bindActionCreators(initialCards, dispatch),
        addItem: bindActionCreators(addItem, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards
    }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
