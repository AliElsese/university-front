import * as yup from 'yup';

export const UpdateSectionSchema = yup.object().shape({
  name: yup
    .string()
    .required("اسم السنة مطلوب"),
  slug: yup
    .string()
    .required("اسم السنة مطلوب"),
  
})