import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useWindowWidth } from '../../hooks/useWindowSize';
import { Modal } from '../modal/modal';
import { AdmissionError } from '../admission-error/admission-error';
import admissionFormStyles from './admission-form.module.css';
import cn from 'classnames';

export const AdmissionForm = ({
  title,
  inputs,
  buttons,
  onFormChange,
  actions,
  errorInfo,
}) => {
  const windowWidth = useWindowWidth();

  return (
    <>
      <div
        className={cn(admissionFormStyles.admission_container, 'custom-scroll')}
      >
        <form className={cn(admissionFormStyles.admission_form, 'pb-20')}>
          {title && <h2 className="text text_type_main-medium">{title}</h2>}
          {inputs.map(i => {
            const InputTag = i.tagType;
            return (
              <InputTag
                key={i.name}
                value={i.value ?? ''}
                onChange={onFormChange}
                name={i.name}
                placeholder={i.placeholder}
                size={windowWidth > 1000 ? 'default' : 'small'}
                icon={i.icon}
              />
            );
          })}
          <div className={admissionFormStyles.admission_buttons}>
            {buttons.map(btn => (
              <Button
                key={btn.title}
                htmlType="submit"
                type="primary"
                size={windowWidth > 1000 ? 'medium' : 'small'}
                onClick={btn.onClick}
              >
                {btn.title}
              </Button>
            ))}
          </div>
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
      {errorInfo?.errorMessage && (
        <Modal onClose={errorInfo.handleCloseModal} title="">
          <AdmissionError errorText={errorInfo.errorMessage} />
        </Modal>
      )}
    </>
  );
};
