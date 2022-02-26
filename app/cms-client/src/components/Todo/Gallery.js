import React, { useState, useEffect } from 'react';
import { loadComponent } from 'lib/Injector';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Item from './Item';
import Form from './Form';
import * as todoActions from 'state/todo/TodoActions';

const breadcrumbs = [
  {
    text: 'Todo List',
    href: 'innovation-week',
  },
];

const LeftAndMain = loadComponent('LeftAndMain');

const Gallery = ({ match: {path}, history: { push }, todos, actions, ...props}) => {

  const [showModal, setShowModal] = useState(false);

  const topActions = [
    {
      color: 'primary',
      label: 'Add',
      icon: 'plus',
      value: 'add',
      onClick: () => {
       setShowModal(true);
      }
    },
  ];

  const tabProps = {
    tabs: [
      { title: 'Todo', current: true },
      { title: 'Done' }
    ]
  };

  const onInsert = (data) => {
    setShowModal(false);
    actions.add(data.title, data.body);
  };

  return (
    <LeftAndMain topActions={topActions} breadcrumbs={breadcrumbs} {...tabProps}>
      <div className="todo-flex-box">
        {todos.map(todo => <Item key={todo.id} {...todo} path={`${path}/show`} />)}
      </div>
      <Form title="Add a todo" isOpen={showModal} onClosed={() => setShowModal(false)} onInsert={onInsert} identifer="boom" />
    </LeftAndMain>
  );
};

function mapStateToProps(state) {
  return {
    todos: state.todo.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      add: (title, body) => dispatch(todoActions.add(title, body)),
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gallery));
