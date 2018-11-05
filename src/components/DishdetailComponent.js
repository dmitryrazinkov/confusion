import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        if (this.props.dish == null) {
            return (<div></div>);
        }

        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
        )
    }

    renderDish(dish) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>
                        {dish.name}
                    </CardTitle>
                    <CardText>
                        {dish.description}
                    </CardText>
                </CardBody>
            </Card>
        )
    }

    renderComments(dish) {
        if (dish.comments == null) {
            return (
                <div></div>
            );
        }

        let comments = dish.comments.map(comment => {
            return (
                <li>
                    <div className="mt-1">{comment.comment}</div>
                    <div className="mt-1">-- {comment.author} , {comment.date}</div>
                </li>
            );
        });

        return (
          <div>
              <h4>Comments</h4>
              <ul className="list-unstyled">
                  {comments}
              </ul>
          </div>
        );
    }
}

export default DishDetail;