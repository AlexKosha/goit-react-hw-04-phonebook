import styled from '@emotion/styled';
import { Form, Field } from 'formik';

export const FromPhonebook = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 20px;
`;

export const Input = styled(Field)`
  display: block;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 16px;
`;

export const FromButton = styled.button`
  width: 100px;
`;
