import React, { useState } from 'react';
import { useRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsFileEarmarkCodeFill } from "react-icons/bs";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const CreateCohortModal = () => {
  // backend url 
  const url = "http://localhost:8000"

  // state for CreateCohort Modal displaying/not displaying
  const [showCreateCohortModal, setShowCreateCohortModal] = useState(false);
  // state for cohort begin date
  const [beginDate, setBeginDate] = useState(null);
  // state for cohort end date
  const [endDate, setEndDate] = useState(null);
  // close CreateCohort Modal function
  const handleCloseCreateCohortModal = () => setShowCreateCohortModal(false);
  // open CreateCohort Modal function
  const handleShowCreateCohortModal = () => setShowCreateCohortModal(true);
  // state for CohortDetails modal displaying/not displaying
  const [AddCohortStudentsModal, setAddCohortStudentsModal] = useState(false);
  // close CohortDetails modal function
  const handleCloseCohortDetailsModal = () => setAddCohortStudentsModal(false);
  // open CohortDetails modal function
  const handleAddCohortStudentsModal = () => setAddCohortStudentsModal(true);

  // references for fetch
  const instructorNameRef = useRef()
  const cohortNameRef = useRef()
  
  let createCohort = () => {
    fetch(`${url}/api/create/cohort`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        newCohort: {
          name: cohortNameRef.current.value,
          begin_date: beginDate,
          end_date: endDate,
          instructor: instructorNameRef.current.value,
        }
      })
    })
    .then(result => result.json())
    .then(data => console.log(data))
    .then(alert('success'))
  }

  return (
    <>
      <Dropdown.Item id="btn-create-cohort" onClick={handleShowCreateCohortModal}><BsFileEarmarkCodeFill /> Create Cohort </Dropdown.Item>

      {/* CreateCohort Modal */}
      <Modal id="cohort-create-modal" size="md" centered show={showCreateCohortModal} onHide={handleCloseCreateCohortModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Cohort</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="input-container">
            Cohort Name: <input ref={cohortNameRef} type="text" name="cohortName" />
            Instructor Name:  <input ref={instructorNameRef} type="text" name="instructorName" />
            Start Date: <DatePicker
              selected={beginDate}
              onChange={date => setBeginDate(date)}
            />
            Graduation Date: <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
            />
          </div>
            
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={() =>  { createCohort(); handleCloseCreateCohortModal()}}>
            Next
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}