import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import FormBuilderModal from 'components/FormBuilderModal/FormBuilderModal';
import * as schemaActions from 'state/schema/SchemaActions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.getModalProps = this.getModalProps.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(oldProps) {
    const props = this.props;
    // if ((props.isOpen && !oldProps.isOpen) || (!props.isOpen && oldProps.isOpen)) {
    //   props.setOverrides(props.isOpen ? props : null);
    // }
  }

  /**
   * Generates the properties for the modal
   * @returns {object}
   */
  getModalProps() {
    const props = Object.assign(
      {},
      this.props,
      {
        onSubmit: this.handleSubmit,
        onClosed: this.props.onClosed,
        autoFocus: true,
        showErrorMessage: true,
      }
    );

    return props;
  }

  handleSubmit(data, action) {
    switch (action) {
      case 'action_cancel': {
        this.props.onClosed();
        break;
      }
      default: {
        this.props.onInsert(data, action);
      }
    }

    return Promise.resolve();
  }

  render() {
    const modalProps = this.getModalProps();
    return <FormBuilderModal {...modalProps} />;
  }
}

// Form.propTypes = {
//   isOpen: PropTypes.bool,
//   schemaUrl: PropTypes.string,
//   onInsert: PropTypes.func.isRequired,
//   onClosed: PropTypes.func.isRequired,
//   setOverrides: PropTypes.func.isRequired,
//   actions: PropTypes.object,
//   requireLinkText: PropTypes.bool,
//   currentPageID: PropTypes.number,
// };

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      schema: bindActionCreators(schemaActions, dispatch),
    },
  };
}

function mapStateToProps(state) {
  // get the schemaUrl to use as a key for overrides
  const schemaUrl = '/admin/todo/formSchema';

  return {
    schemaUrl,
  };
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Form);
