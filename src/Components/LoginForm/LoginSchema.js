import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  userType: yup
    .string()
    .required(),
  nationalId: yup
    .string()
    .length(14, 'لا يجب ان تقل او تزيد عن 14 رقم')
    .required("رقم البطاقة مطلوب"),
  password: yup
    .string()
    .min(1)
    .required("الرقم السري مطلوب")
})