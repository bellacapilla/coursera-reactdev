import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { show } from 'redux-modal';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import CommentForm from './CommentForm';

function formatDate(unixTimestamp) {
    let months = { 'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12' };
    let newDateTime = String(new Date(unixTimestamp));
    let newTime = newDateTime.substring(15, 24);
    let newDay = newDateTime.substring(8, 10);
    let newMonthNum = months[newDateTime.substring(4, 7)];
    let newYear = newDateTime.substring(11, 15);
    let newDateFormat = newDay + '.' + newMonthNum + '.' + newYear + ' ' + newTime;
    return newDateFormat;
}

function RenderDish({dish}) {
    return(
        <div>
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
    if (comments != null) {
        return (
            <div>
                <h4>Comments</h4>
                <ul className='list-unstyled'>
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {formatDate(comment.date)}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        ) 
    } else {
        return(
            <div></div>
        );
    }
}

class DishDetail extends Component {
    handleOpen = name => () => {
        console.log('open', name)
        this.props.show(name)
      };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={this.props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={this.props.comments} />
                        <Button onClick={this.handleOpen('commentForm')}>
                            <i className="fa fa-pencil fa-lg"></i> Submit Comment
                        </Button>
                        <CommentForm name='commentForm'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => bindActionCreators({ show }, dispatch))(DishDetail);