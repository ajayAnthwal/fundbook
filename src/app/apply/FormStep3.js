export default function FormStep3({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) {
  return (
    <div>
      <h3>Step 3: KYC</h3>
      <input
        type="text"
        placeholder="KYC Details"
        value={formData.kycDetails}
        onChange={(e) =>
          setFormData({ ...formData, kycDetails: e.target.value })
        }
      />
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
}
