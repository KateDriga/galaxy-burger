import React from 'react';
import { ChangeEvent, FormEvent } from 'react';

type TChangeFormInput = (e: ChangeEvent<HTMLInputElement>) => void;
type TSubmitForm = (e: FormEvent<HTMLFormElement>) => void;
type TSetFormState<IFormState> = React.Dispatch<
  React.SetStateAction<IFormState>
>;

export interface IFormState {
  [key: string]: string;
}

export interface IUseFormInputs {
  readonly form: IFormState;
  readonly handleFormChange: TChangeFormInput;
  readonly setForm: TSetFormState<IFormState>;
}

export interface IFormInput {
  readonly name: string;
  readonly placeholder: string;
  readonly tagType: any;
  readonly value?: string;
  readonly icon?: string;
}

export interface IFormInputs {
  readonly [title: string]: IFormInput;
}

export interface IFormButton {
  readonly title: string;
  readonly type?: 'primary' | 'secondary';
  readonly htmlType?: 'button' | 'submit' | 'reset';
}

export interface IFormEvents {
  readonly onFormChange: TChangeFormInput;
  readonly onFormSubmit: TSubmitForm;
  readonly onFormReset?: TSubmitForm;
}

export interface IFormAction {
  readonly path: string;
  readonly description: string;
  readonly title: string;
}

export interface IFormError {
  readonly errorMessage: string | null;
  readonly handleCloseModal: () => void;
}
