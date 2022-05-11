import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap";

export class People extends Component {

    constructor(props) {
        super(props);

        this.state = {
            persons: [],
            modalTitle: "",
            PersonFirstName: "",
            PersonLastName: "",
            PersonId: 0,
            PersonAge: 0,
            PersonDOB: "",

            PersonFirstNameFilter: "",
            PersonLastNameFilter: "",
            personsWithoutFilter: [],
            show: false
        }
    }


    FilterFn() {
        var PersonFirstNameFilter = this.state.PersonFirstNameFilter;
        var PersonLastNameFilter = this.state.PersonLastNameFilter;

        var filteredData = this.state.personsWithoutFilter.filter(
            //function (el) {
            //    return el.FirstName.toString().toLowerCase().includes(
            //        PersonFirstNameFilter.toString().trim().toLowerCase()
            //    ) &&
            //        el.LastName.toString().toLowerCase().includes(
            //            PersonLastNameFilter.toString().trim().toLowerCase()
            //        )
            //}
            person => person.firstName.toString().toLowerCase().includes(PersonFirstNameFilter.toString().trim().toLowerCase()) && person.lastName.toString().toLowerCase().includes(PersonLastNameFilter.toString().trim().toLowerCase())
        );

        this.setState({ persons: filteredData });

    }



    changePersonFirstNameFilter = (e) => {
        this.state.PersonFirstNameFilter = e.target.value;
        this.FilterFn();
    }
    changePersonLastNameFilter = (e) => {
        this.state.PersonLastNameFilter = e.target.value;
        this.FilterFn();
    }

    refreshList() {
        fetch('person')
            .then(response => response.json())
            .then(data => {
                this.setState({ persons: data, personsWithoutFilter: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }
    changePersonFirstName = (e) => {
        this.setState({ PersonFirstName: e.target.value });
    }
    changePersonLastName = (e) => {
        this.setState({ PersonLastName: e.target.value });
    }
    changePersonDOB = (e) => {
        this.setState({ PersonDOB: e.target.value });
        var age_latest = this.calculate_age(e.target.value)
        this.setState({ PersonAge: age_latest }, () => {
            // this will have the latest this.state.age1     
        })
    }
    handleClose() {
        if (this.state.show) {
            this.setState({
                show: false
            });
        }

    }
    addClick() {
        this.setState({
            modalTitle: "Add Person",
            PersonId: 0,
            PersonLastName: "",
            PersonFirstName: "",
            PersonAge: 0,
            PersonDOB: "",
            show: true
        });
    }
    editClick(person) {
        this.setState({
            modalTitle: "Edit Person",
            PersonFirstName: person.firstName,
            PersonLastName: person.lastName,
            PersonDOB: person.dobString,
            PersonAge: person.age,
            PersonId: person.personId,
            show: true
        });
    }

    createClick() {
        fetch('person', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                FirstName: this.state.PersonFirstName,
                LastName: this.state.PersonLastName,
                DOB: this.state.PersonDOB
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }


    updateClick() {
        fetch('person', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PersonId : this.state.PersonId,
                FirstName: this.state.PersonFirstName,
                LastName: this.state.PersonLastName,
                DOB: this.state.PersonDOB
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch('person/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }
    calculate_age = (dob1) => {
        var today = new Date();
        var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        return age_now;
    }
    render() {
        const {
            persons,
            modalTitle,
            PersonFirstName,
            PersonLastName,
            PersonId,
            PersonAge,
            PersonDOB,
            show
        } = this.state;

        return (
            <div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-toggle="modal" data-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Person
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">


                                    <input className="form-control m-2"
                                        onChange={this.changePersonFirstNameFilter}
                                        placeholder="Filter" />



                                </div>
                                First Name
                            </th>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changePersonLastNameFilter}
                                        placeholder="Filter" />



                                </div>
                                Last Name

                            </th>
                            <th> Age </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {persons.map(person =>
                            <tr key={person.personId}>
                                <td>{person.firstName}</td>
                                <td>{person.lastName}</td>
                                <td>{person.age}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-toggle="modal"
                                        data-target="#exampleModal"
                                        onClick={() => this.editClick(person)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(person.personId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Modal show={show}  >
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">First Name</span>
                                <input type="text" className="form-control"
                                    value={PersonFirstName}
                                    onChange={this.changePersonFirstName} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Last Name</span>
                                <input type="text" className="form-control"
                                    value={PersonLastName}
                                    onChange={this.changePersonLastName} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">DOB</span>
                                <input type="date" className="form-control"
                                    value={PersonDOB}
                                    onChange={this.changePersonDOB} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Age</span>
                                <input readOnly={true} type="text" className="form-control"
                                    value={PersonAge}
                                />
                            </div>

                        </div>



                   </Modal.Body>
                <Modal.Footer>
                    {PersonId === 0 ?
                        <button type="button"
                            className="btn btn-primary float-start"
                            onClick={() => this.createClick()}
                        >Create</button>
                        : null}

                    {PersonId != 0 ?
                        <button type="button"
                            className="btn btn-primary float-start"
                            onClick={() => this.updateClick()}
                        >Update</button>
                        : null}
                    <button type="button"
                        className="btn btn-primary float-start"
                        onClick={() => this.handleClose()}
                    >Close</button>

                </Modal.Footer>
                </Modal>
                {/*<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">*/ }
        {/*    <div className="modal-dialog modal-lg modal-dialog-centered">*/ }
        {/*        <div className="modal-content">*/ }
        {/*            <div className="modal-header">*/ }
        {/*                <h5 className="modal-title">{modalTitle}</h5>*/ }
        {/*                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"*/ }
        {/*                ></button>*/ }
        {/*            </div>*/ }



        {/*        </div>*/ }
        {/*    </div>*/ }
        {/*</div>*/ }


            </div >
        )
    }
}