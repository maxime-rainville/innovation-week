import React, { useState, useEffect } from 'react';
import { loadComponent } from 'lib/Injector';
import { withRouter, Route, Switch } from 'react-router-dom';
import Gallery from './Gallery';
import Show from './Show';

const Todo = ({ match: {path}, history: { push }, todos, actions, ...props}) => {
  return (
    <Switch>
      <Route exact path={path} component={Gallery} />
      <Route exact path={`${path}/show/:id`} component={Show} />
    </Switch>
  );
};

function mapStateToProps(state) {
  return {
    todos: state.todo.todos
  };
};

export default withRouter(Todo);
