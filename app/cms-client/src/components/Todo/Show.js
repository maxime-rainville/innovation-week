import React, { useState, useEffect } from 'react';
import { loadComponent } from 'lib/Injector';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as todoActions from 'state/todo/TodoActions';

const LeftAndMain = loadComponent('LeftAndMain');

const Show = ({ history: { push }, todo, path, actions, ...props}) => {

  const breadcrumbs = [
    {
      text: 'Todo List',
      href: 'admin/todo',
      onClick: (event) => {
        event.preventDefault();
        push('..');
      }
    },
    {
      text: todo.title,
      href: `${path}/show/${todo.id}`,
    },
  ];

  const topActions = [
    {
      color: 'primary',
      label: 'Mark has done',
      icon: 'check-mark',
      value: 'done',
      onClick: () => {
        actions.done(todo.id);
        push('..');
      }
    },
  ];

  return (
    <LeftAndMain bottomActions={topActions} breadcrumbs={breadcrumbs}>
      <h1>{todo.title}</h1>
      <p>{todo.body}</p>
      <img src={`${todo.picture}?id=${todo.id}`} alt="" />
    </LeftAndMain>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    todo: state.todo.todos.find(todo => todo.id === ownProps.match.params.id),
    path: ownProps.match.path,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      done: (id) => dispatch(todoActions.done(id)),
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Show));
