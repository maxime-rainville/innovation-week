import { v4 as uuid } from 'uuid';
import actions from './TodoActionTypes';

const initState = {
  todos: [
    {
      title: 'Learn React',
      body: 'The best way to learn React is to build a simple app',
      picture: 'https://picsum.photos/400/400/?random',
      id: 'oeiaoei'
    },
    {
      title: 'Complete the app',
      body: 'We need a show case for our project',
      id: 'aoeiaoeiaoei',
      picture: 'https://picsum.photos/400/400/?random',
    },
    {
      title: 'Implement search',
      body: 'Seaching is a must',
      id: 'oeiioeaii',
      picture: 'https://picsum.photos/400/400/?random',
    },
    {
      title: 'Implement routing',
      body: 'Seaching is a must',
      id: 'oeiaoeiaoi',
      picture: 'https://picsum.photos/400/400/?random',
    },
    {
      title: 'Learn Redux',
      body: 'The best way to learn React is to build a simple app',
      picture: 'https://picsum.photos/400/400/?random',
      id: 'oeiaeuoeioei'
    },
    {
      title: 'Documentation',
      body: 'We need a show case for our project',
      id: 'aoeiaoeuoddoeudeiaoei',
      picture: 'https://picsum.photos/400/400/?random',
    },
    {
      title: 'Pagination',
      body: 'Seaching is a must',
      id: 'oeiiuiaoiaeiaoeioeaii',
      picture: 'https://picsum.photos/400/400/?random',
    },
    {
      title: 'Streamlined GraphQL',
      body: 'Seaching is a must',
      id: 'oeiaoeiao8eig09aoeiaoi',
      picture: 'https://picsum.photos/400/400/?random',
    },
  ]
};

function todoReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.ADD: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            title: payload.title,
            body: payload.body,
            picture: 'https://picsum.photos/200/200/?random',
            id: uuid()
          }
        ]
      };
    }

    case actions.DONE: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== payload.id)
      };
    }

    default:
      return state;
  }
}

export default todoReducer;
