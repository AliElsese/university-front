import * as yup from 'yup';

const numbers = /^[0-9]+$/;

export const PopUpStudentsSchema = yup.object().shape({
  nationalId: yup
    .string()
    .length(14, 'لا يجب ان تقل او تزيد عن 14 رقم')
    .required("رقم البطاقة مطلوب"),
  name: yup
    .string()
    .required("اسم الطالب مطلوب"),
  gender: yup
    .string()
    .required("جنس الطالب مطلوب"),
  universityId: yup
    .string()
    .length(4, 'لا يجب ان يزيد عن اربعة ارقام')
    .required("كود الجامعة مطلوب"),
  phoneNumber: yup
    .string()
    .matches(numbers, "لا يسمح الا بالارقام")
    .length(11, 'لا يجب ان يزيد او يقل عن 11 رقم')
    .required("رقم الهاتف مطلوب"),
  hourCost: yup
    .string()
    .required("سعر الساعة مطلوب"),
  email: yup
    .string()
    .required("البريد الالكتروني مطلوب"),
  yearId: yup
    .string()
    .required(""),
})