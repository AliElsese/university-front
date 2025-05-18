import * as yup from 'yup';

export const UpdateSubjectSchema = yup.object().shape({
  name: yup
    .string()
    .required("اسم المادة مطلوب"),
  term: yup
    .string()
    .required("الفصل الدراسي مطلوب"),
  code: yup
    .string()
    .length(4, 'لا يجب ان يزيد عن اربعة ارقام')
    .required("كود المادة مطلوب"),
  hoursNumber: yup
    .string()
    .required("عدد ساعات المادة مطلوب"),
  highestDegree: yup
    .string()
    .required(),
})