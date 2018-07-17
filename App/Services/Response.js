import ErrorMessage from '../Transform/ErrorMessage';
import { store } from '../Containers/App';
import AppAction from '../Redux/AppRedux';

const resolve = response => {
  return new Promise((resolve, reject) => {
    if (response.ok) {
      resolve(response.data);
    } else {



      if (response.status === 401 && !response.config.url.includes('login')) {
        console.tron.log({ log: '401 error', response });
        store.dispatch(AppAction.logout());
        return;
      }

      let message = null;
      const problem = response.problem;

      if (!response.data) {
        message = problem;
      } else {
        const { errors } = response.data;
        message = errors ? ErrorMessage.parse(errors) : response.data.message;
      }

      reject({
        message,
        problem,
      });
    }
  });
};

export default {
  resolve,
};
