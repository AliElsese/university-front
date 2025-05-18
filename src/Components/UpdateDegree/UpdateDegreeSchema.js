import * as yup from 'yup';

export const UpdateDegreeSchema = yup.object().shape({
  subjectDegree: yup
    .string()
    .required("اسم السنة مطلوب"),
})