import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createAccessKey } from 'apiSdk/access-keys';
import { Error } from 'components/error';
import { accessKeyValidationSchema } from 'validationSchema/access-keys';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { AccessKeyInterface } from 'interfaces/access-key';

function AccessKeyCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AccessKeyInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAccessKey(values);
      resetForm();
      router.push('/access-keys');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AccessKeyInterface>({
    initialValues: {
      key_value: '',
      file_type: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: accessKeyValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Access Key
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="key_value" mb="4" isInvalid={!!formik.errors?.key_value}>
            <FormLabel>Key Value</FormLabel>
            <Input type="text" name="key_value" value={formik.values?.key_value} onChange={formik.handleChange} />
            {formik.errors.key_value && <FormErrorMessage>{formik.errors?.key_value}</FormErrorMessage>}
          </FormControl>
          <FormControl id="file_type" mb="4" isInvalid={!!formik.errors?.file_type}>
            <FormLabel>File Type</FormLabel>
            <Input type="text" name="file_type" value={formik.values?.file_type} onChange={formik.handleChange} />
            {formik.errors.file_type && <FormErrorMessage>{formik.errors?.file_type}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'access_key',
  operation: AccessOperationEnum.CREATE,
})(AccessKeyCreatePage);
