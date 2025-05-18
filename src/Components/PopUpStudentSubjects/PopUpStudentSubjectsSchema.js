import * as yup from 'yup';

export const PopUpStudentSubjectsSchema = yup.object().shape({
  subjectId: yup
    .string()
    .required("المادة مطلوب"),
})