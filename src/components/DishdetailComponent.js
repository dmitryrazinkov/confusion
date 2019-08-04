import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent'
import { Link } from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl'

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;
const DishDetail = ({ dish, comments, addComment, isLoading, errMess }) => {
    if (isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    } else {
        if (errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>
                            {errMess}
                        </h4>
                    </div>
                </div>
            )
        }
        if (dish == null) {
            return (<div></div>);
        }

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">
                                Menu
                                </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={comments} addComment={addComment} dishId={dish.id} />
                    </div>
                </div>
            </div>
        )
    }
}

function RenderDish({ dish }) {
    return (
        <Card>
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
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

function RenderComments({ comments, addComment, dishId }) {
    if (comments == null) {
        return (
            <div></div>
        );
    }

    comments = comments.map(comment => {
        return (
            <li>
                <div className="mt-1">{comment.comment}</div>
                <div className="mt-1">-- {comment.author} , {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    date: '2-digit'
                }).format(new Date(Date.parse(comment.date)))}</div>
            </li>
        );
    });

    return (
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {comments}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    );
}

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleSubmit(values) {
        this.toggleModal()
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-md">Submit Comment</span>
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label for="rating">Rating</Label>
                                <Control.select type="select" model=".rating" name="rating"
                                    className="form-control">
                                    {[1, 2, 3, 4, 5].map(rating => <option>{rating}</option>)}
                                </Control.select>
                            </div>

                            <div className="form-group">
                                <Label for="author">Your name</Label>
                                <Control.text type="text" model=".author" id="author" name="author"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                    placeholder="Your name" />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be grater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} />
                            </div>

                            <div className="form-group">
                                <Label for="comment">Comment</Label>
                                <Control.textarea type="textarea" id="comment" model=".comment" name="comment"
                                    className="form-control"
                                    rows="6" />
                            </div>

                            <Button type="submit" value="submit" className="bg-primary" color="primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


export default DishDetail;