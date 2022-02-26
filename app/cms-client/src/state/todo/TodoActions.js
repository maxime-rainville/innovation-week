import actions from './TodoActionTypes';

export function add(title, body) {
  return { type: actions.ADD, payload: { title, body } };
}

export function done(id) {
  return { type: actions.DONE, payload: { id } };
}
