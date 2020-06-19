import mergeAll from 'lodash/fp/mergeAll';

function importAll(resolve) {
  return resolve.keys().map((path) => resolve(path).default);
}

const modules = importAll(require.context('./', true, /\.*resolvers\.js$/));

export default mergeAll(modules);
