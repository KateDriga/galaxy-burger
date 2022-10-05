import React from 'react';
import errorBoundaryStyles from './error-boundary.module.css';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className={errorBoundaryStyles.error_section}>
          <h1>Что-то пошло не так :(</h1>
          <p>Пожалуйста, перезагрузите страницу или зайдите позднее.</p>
        </section>
      );
    }
    return this.props.children;
  }
}
