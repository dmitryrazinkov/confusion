import React, {Component} from 'react'
import Home from './HomeComponent'
import Menu from './MenuComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'
import DishDetail from './DishdetailComponent'
import {DISHES} from '../shared/dishes'
import {COMMENTS} from '../shared/comments'
import {PROMOTIONS} from '../shared/promotions'
import {LEADERS} from '../shared/leaders'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

const mapStateToProps  = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

class Main extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        const HomePage = () => {
            return (
                <Home
                    promotion={this.props.promotions.find(promo => promo.featured)}
                    leader={this.props.leaders.find(leader => leader.featured)}
                    dish={this.props.dishes.find(dish => dish.featured)}
                />
            )
        };

        const DishWithId = ({match}) => {
            return(
                <DishDetail
                    comments={this.props.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
                    dish={this.props.dishes.find(dish => dish.id === parseInt(match.params.dishId, 10))}/>
            );
        };

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                    <Route path="/menu/:dishId" component={DishWithId}/>
                    <Route exact path="/contactus" component={Contact}/>
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />}/>
                    <Redirect to="/home"/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));
