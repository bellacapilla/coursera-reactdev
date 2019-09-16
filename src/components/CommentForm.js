import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Label, Row, Col, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { connectModal } from 'redux-modal';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    static propTypes = {
        handleHide: PropTypes.func.isRequired
      };

    handleSubmit(values) {
        alert('Current State is: ' + JSON.stringify(values));
    }

    render() {
        console.log(this.props)
        const { show, handleHide } = this.props;

        return (
            <Modal isOpen={show}>
                <ModalHeader>
                    Submit Comment
                </ModalHeader>

                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        {/* Rating Select */}
                        <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>

                                </Control.select>
                            </Col>
                        </Row>

                        {/* Your Name */}
                        <Row className="form-group">
                            <Label htmlFor="fullname" md={12}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".fullname" id="fullname" name="fullname"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                        />
                                <Errors
                                    className="text-danger"
                                    model=".fullname"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                    />
                            </Col>
                        </Row>

                        {/* Comment */}
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                            </Col>
                        </Row>

                        {/* Submit Button */}
                        
                        <Button onClick={handleHide}>Close</Button>
                        <Button color="primary" type="submit">Submit</Button>
                        
                        
                    </LocalForm>
                </ModalBody>
            </Modal>
        )
    }
}

export default connectModal({ name: 'commentForm' })(CommentForm)