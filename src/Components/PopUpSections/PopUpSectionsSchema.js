import * as yup from 'yup';

export const PopUpSectionsSchema = yup.object().shape({
  name: yup
    .string()
    .required("اسم التخصص مطلوب"),
  yearId: yup
    .string()
    .required("سنة التخصص مطلوب"),
})