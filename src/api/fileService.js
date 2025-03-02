import { axiosClientWithHeaders } from "./config";

export const fileUploadService = async(file) =>{
    try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axiosClientWithHeaders.post('/files/upload', formData);
        
        return res.data;
    } catch (error) {
        // toast.error("Unable to get BusinessTypes")
        
        toast.error(error.response.data.message)
        return new Error(error.response.data.message);
    }
}

export const saveApplicationDocumentService = async(documentData) =>{
    try {
        const res = await axiosClientWithHeaders.post('/application-documents', documentData);
        return res.data;
    } catch (error) {
        // toast.error("Unable to get BusinessTypes")
        toast.error(error.response.data.message)
        return new Error(error.response.data.message);
    }
}


