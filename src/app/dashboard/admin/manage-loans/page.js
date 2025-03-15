"use client";
import React, { useEffect, useState } from "react";
import { getLoanTypes } from "@/api/client";
import { Button, Table } from "react-bootstrap";
import LoanTypesModal from "@/app/components/modal/loan_types_modal";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import LoanTypesEditModal from "@/app/components/modal/loan_types_edit_modal";

const ManageLoanTypes = () => {
  const [loanTypes, setLoanType] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState(null);

  useEffect(() => {
    (async function () {
      const data = await getLoanTypes();
      if (data) {
        setLoanType(data.data);
      }
    })();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleOpenEditModal = (loanType) => {
    console.log('handle open edit modal', loanType);
    setSelectedLoanType(loanType);
    setShowEditModal(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="fs-4 fw-bold mb-4">🏢 Manage Loan Types</h1>

      <Button 
        className="btn btn-success mb-3"
        onClick={() => handleOpenModal()}>
        ➕ Add Loan Type
      </Button>

      <Table bordered hover className="mt-3">
        <thead className="bg-info text-dark">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Edit</th>
          </tr>
        </thead>
        <tbody>
        {loanTypes.length > 0 && (
          loanTypes.map((b, index) => (
            <tr key={index}>
              <td>{b.name}</td>
              <td>
                <Button 
                  className="btn btn-xs bg-dark"
                  onClick={() => handleOpenEditModal(b)}>
                  <CiEdit />
                </Button>
              </td>
            </tr>
          ))
        )}
        </tbody>
      </Table>

      <LoanTypesModal
        show={showModal}
        onClose={async () => {
          setShowModal(false);
          toast.success("Loan type added successfully!");

          const data = await getLoanTypes();
          if (data) {
            setLoanType(data.data);
          }
        }}
      />

      <LoanTypesEditModal
        show={showEditModal}
        loanType={selectedLoanType}
        onClose={async () => {
          setShowEditModal(false);
          toast.success("Loan type updated successfully!");
          setSelectedLoanType(null);

          const data = await getLoanTypes();
          if (data) {
            setLoanType(data.data);
          }
        }}
      />
    </div>
  );
};

export default ManageLoanTypes;
