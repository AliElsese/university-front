import * as yup from 'yup';

export const UpdateYearSchema = yup.object().shape({
  name: yup
    .string()
    .required("اسم السنة مطلوب"),
})