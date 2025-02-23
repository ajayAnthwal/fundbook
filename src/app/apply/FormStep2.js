export default function FormStep2({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) {
  return (
    <div>
      <h3>Step 2: Business Details</h3>
      <input
        type="text"
        placeholder="Business Name"
        value={formData.businessName}
        onChange={(e) =>
          setFormData({ ...formData, businessName: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Business Registration No."
        value={formData.businessRegNo}
        onChange={(e) =>
          setFormData({ ...formData, businessRegNo: e.target.value })
        }
      />
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}
