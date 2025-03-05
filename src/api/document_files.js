import axios from "axios"

const API_BASE_URL = "http://194.195.112.4:3070/api/v1"

export const fileUploadService = async (file) => {
  const formData = new FormData()
  formData.append("files", file)

  try {
    const token = localStorage.getItem("authToken")
    if (!token) throw new Error("No auth token found")

    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data[0]
  } catch (error) {
    console.error("File upload failed:", error)
    throw error
  }
}

export const saveApplicationDocumentService = async (documentData) => {
  try {
    const token = localStorage.getItem("authToken")
    if (!token) throw new Error("No auth token found")

    const response = await axios.post(`${API_BASE_URL}/application-documents`, documentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    console.error("Failed to save application document:", error)
    throw error
  }
}

