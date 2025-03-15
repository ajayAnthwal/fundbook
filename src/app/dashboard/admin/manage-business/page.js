"use client";
import React, { useEffect, useState } from "react";
import { getBusinessTypes, saveBusinessTypes } from "@/api/client";
import { Button, Table } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import BusinessTypesModal from "@/app/components/modal/business_types_modal";
import BusinessTypesEditModal from "@/app/components/modal/business_types_edit_modal";
import toast from "react-hot-toast";

const ManageBusinessType = () => {
  const [businessTypes, setBusinessTypes] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBusinessType, setSelectedBusinessType] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const res = await getBusinessTypes();
        setBusinessTypes(res?.data || []);
      } catch (error) {
        console.error("Error fetching business types:", error);
        setBusinessTypes([]);
      }
    })();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleOpenEditModal = (businessType) => {
    console.log('handle open edit modal', businessType);
    setSelectedBusinessType(businessType);
    setShowEditModal(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="fs-4 fw-bold mb-4">🏢 Manage Business Types</h1>

      <Button 
        className="btn btn-success mb-3"
        onClick={() => handleOpenModal()}>
        ➕ Add Business Type
      </Button>

      <Table bordered hover className="mt-3">
        <thead className="bg-info text-dark">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Edit</th>
          </tr>
        </thead>
        <tbody>
        {businessTypes.length > 0 && (
          businessTypes.map((b, index) => (
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

      <BusinessTypesModal
        show={showModal}
        onClose={async () => {
          setShowModal(false);
          toast.success("Business type added successfully!");

          const data = await getBusinessTypes();
          if (data) {
            setBusinessTypes(data.data);
          }
        }}
      />

      <BusinessTypesEditModal
        show={showEditModal}
        businessType={selectedBusinessType}
        onClose={async () => {
          setShowEditModal(false);
          toast.success("Business type updated successfully!");
          setSelectedBusinessType(null);

          const data = await getBusinessTypes();
          if (data) {
            setBusinessTypes(data.data);
          }
        }}
      />
    </div>
  );
};

export default ManageBusinessType;
