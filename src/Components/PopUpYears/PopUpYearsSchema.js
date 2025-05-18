import * as yup from 'yup';

export const PopUpYearsSchema = yup.object().shape({
  name: yup
    .string()
    .required("اسم السنة مطلوب"),
})