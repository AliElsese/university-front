import * as yup from 'yup';

const numbers = /^[0-9]+$/;

export const UpdateDoctorSchema = yup.object().shape({
  nationalId: yup
    .string()
    .length(14, 'لا يجب ان تقل او تزيد عن 14 رقم')
    .required("رقم البطاقة مطلوب"),
  name: yup
    .string()
    .required("اسم الدكتور مطلوب"),
  major: yup
    .string()
    .required("تخصص الدكتور مطلوب"),
  phoneNumber: yup
    .string()
    .matches(numbers, "لا يسمح الا بالارقام")
    .length(11, 'لا يجب ان يزيد او يقل عن 11 رقم')
    .required("رقم الهاتف مطلوب"),
  email: yup
    .string()
    .required("البريد الالكتروني مطلوب"),
})