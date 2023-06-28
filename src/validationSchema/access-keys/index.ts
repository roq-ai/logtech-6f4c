import * as yup from 'yup';

export const accessKeyValidationSchema = yup.object().shape({
  key_value: yup.string().required(),
  file_type: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
