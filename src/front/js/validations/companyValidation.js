import * as yup from "yup";


export const companySchema = yup.object().shape({
    name: yup
        .string()
        .required("Company name is required"),
    cif: yup
        .string()
        .min(7)
        .max(8)
        .required("CIF is required"),
    description: yup
        .string()
        .required("Description is required"),
    address: yup
        .string()
        .required("Address is required"),
    opening_time: yup
        .string()
        .required("Opening Time is required"),
    closing_time: yup
        .string()
        .required("Closing Time is required"),
});  