import React, { FC } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../../hooks/useWindowSize';
import { Modal } from '../modal/modal';
import { AdmissionError } from '../admission-error/admission-error';
import {
  IFormAction,
  IFormButton,
  IFormError,
  IFormEvents,
  IFormInput,
} from '../../utils/ts-types/form-types';
import admissionFormStyles from './admission-form.module.css';
import cn from 'classnames';

interface IAdmissionFormProps {
  readonly title?: string;
  readonly inputs: Array<IFormInput>;
  readonly buttons?: Array<IFormButton>;
  readonly formEvents: IFormEvents;
  readonly actions?: Array<IFormAction>;
  readonly errors?: Array<IFormError>;
}

export const AdmissionForm: FC<IAdmissionFormProps> = ({
  title,
  inputs,
  buttons,
  formEvents,
  actions,
  errors,
}) => {
  const windowWidth: number = useWindowWidth();

  return (
    <>
      <div
        className={cn(admissionFormStyles.admission_container, 'custom-scroll')}
      >
        <form
          className={cn(admissionFormStyles.admission_form, 'pb-20')}
          onSubmit={formEvents.onFormSubmit}
          onReset={formEvents.onFormReset}
        >
          {title && <h2 className="text text_type_main-medium">{title}</h2>}
          {inputs.map(i => {
            const InputTag = i.tagType;
            return (
              <InputTag
                key={i.name}
                value={i.value ?? ''}
                onChange={formEvents.onFormChange}
                name={i.name}
                placeholder={i.placeholder}
                size={windowWidth > 1000 ? 'default' : 'small'}
                icon={i.icon}
              />
            );
          })}
          {buttons && (
            <div className={admissionFormStyles.admission_buttons}>
              {buttons.map(btn => (
                <Button
                  key={btn.title}
                  htmlType={btn.htmlType ?? 'submit'}
                  type={btn.type ?? 'primary'}
                  size={windowWidth > 1000 ? 'medium' : 'small'}
                >
                  {btn.title}
                </Button>
              ))}
            </div>
          )}
        </form>
        {actions && (
          <div
            className={cn(
              admissionFormStyles.admission_actions,
              'text text_type_main-default',
              'pl-5 pr-5'
            )}
          >
            {actions.map(a => (
              <Link
                key={a.title}
                to={a.path}
                className={admissionFormStyles.action_item}
              >
                <span>{a.description}</span>
                <Button
                  htmlType="button"
                  type="secondary"
                  size="large"
                  style={{ padding: 0 }}
                >
                  {a.title}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
      {errors?.map(
        (err, idx) =>
          err.errorMessage && (
            // order of errors is stable
            <Modal key={idx} onClose={err.handleCloseModal}>
              <AdmissionError errorText={err.errorMessage} />
            </Modal>
          )
      )}
    </>
  );
};
