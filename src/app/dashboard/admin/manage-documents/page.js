"use client";
import React, { useEffect, useState } from "react";
import { getDocumentTypes } from "@/api/client";
import { Button, Table } from "react-bootstrap";
import DocumentTypesModal from "@/app/components/modal/document_types_modal";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import DocumentTypesEditModal from "@/app/components/modal/document_types_edit_modal";

const ManageDocumentTypes = () => {
  const [DocumentTypes, setDocumentType] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);

  useEffect(() => {
    (async function () {
      const data = await getDocumentTypes();
      if (data) {
        setDocumentType(data.data);
      }
    })();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleOpenEditModal = (DocumentType) => {
    console.log('handle open edit modal', DocumentType);
    setSelectedDocumentType(DocumentType);
    setShowEditModal(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="fs-4 fw-bold mb-4">🏢 Manage Document Types</h1>

      <Button 
        className="btn btn-success mb-3"
        onClick={() => handleOpenModal()}>
        ➕ Add Document Type
      </Button>

      <Table bordered hover className="mt-3">
        <thead className="bg-info text-dark">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Edit</th>
          </tr>
        </thead>
        <tbody>
        {DocumentTypes.length > 0 && (
          DocumentTypes.map((b, index) => (
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

      <DocumentTypesModal
        show={showModal}
        onClose={async () => {
          setShowModal(false);
          toast.success("Document type added successfully!");

          const data = await getDocumentTypes();
          if (data) {
            setDocumentType(data.data);
          }
        }}
      />

      <DocumentTypesEditModal
        show={showEditModal}
        documentType={selectedDocumentType}
        onClose={async () => {
          setShowEditModal(false);
          toast.success("Document type updated successfully!");
          setSelectedDocumentType(null);

          const data = await getDocumentTypes();
          if (data) {
            setDocumentType(data.data);
          }
        }}
      />
    </div>
  );
};

export default ManageDocumentTypes;
