import * as Yup from "yup"

export const validationSchema = Yup.object({
    name: Yup.string().required("Firstname field is required"),
    email: Yup.string().email("Invalid email format").required("Email field is required"),
    message: Yup.string().min(10, "Message must contain more 10 symbols").required("Message field is required"),
    select: Yup.string().required("Plesae select a country"),
})