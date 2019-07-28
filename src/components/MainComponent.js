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
import {addComment, fetchDishes} from '../redux/ActionCreators'
import {actions} from 'react-redux-form'

const mapStateToProps  = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
})

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    promotion={this.props.promotions.find(promo => promo.featured)}
                    leader={this.props.leaders.find(leader => leader.featured)}
                    dish={this.props.dishes.dishes.find(dish => dish.featured)}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                />
            )
        };

        const DishWithId = ({match}) => {
            return(
                <DishDetail
                    comments={this.props.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
                    dish={this.props.dishes.dishes.find(dish => dish.id === parseInt(match.params.dishId, 10))}
                    addComment={this.props.addComment}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                />
            );
        };

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                    <Route path="/menu/:dishId" component={DishWithId}/>
                    <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}></Contact>}/>
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />}/>
                    <Redirect to="/home"/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
