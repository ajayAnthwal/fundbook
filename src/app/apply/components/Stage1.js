"use client";
import { useForm } from "react-hook-form";
import { loanAPI } from '@/api/loan';
import { useState } from 'react';

export default function Stage1({ formData, setFormData, nextStage }) {
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData
  });

  const onSubmit = async (data) => {
    try {
      setError('');
      const response = await loanAPI.submitLoanDetails(data);
      setFormData(data);
      nextStage();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title mb-4">Loan Details</h3>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Loan Amount</label>
            <input 
              type="number"
              className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
              {...register("amount", { 
                required: "Loan amount is required",
                min: {
                  value: 10000,
                  message: "Minimum loan amount is 10,000"
                },
                max: {
                  value: 10000000,
                  message: "Maximum loan amount is 1,00,00,000"
                }
              })}
            />
            {errors.amount && (
              <div className="invalid-feedback">{errors.amount.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Loan Type</label>
            <select 
              className={`form-select ${errors.type ? 'is-invalid' : ''}`}
              {...register("type", { 
                required: "Please select a loan type"
              })}
            >
              <option value="">Select loan type</option>
              <option value="business">Business Loan</option>
              <option value="personal">Personal Loan</option>
              <option value="education">Education Loan</option>
            </select>
            {errors.type && (
              <div className="invalid-feedback">{errors.type.message}</div>
            )}
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Next Step
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 