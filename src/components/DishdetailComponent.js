import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

const DishDetail = ({dish, comments}) => {
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
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments dish={comments}/>
                </div>
            </div>
        </div>
    )
}

function RenderDish({dish}) {
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

function RenderComments({dish}) {
    if (dish.comments == null) {
        return (
            <div></div>
        );
    }

    let comments = dish.comments.map(comment => {
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
        </div>
    );
}


export default DishDetail;