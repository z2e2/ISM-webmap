export default {
  Query: {
    getCountries(root, params, { General }) {
      return General.getCountries();
    },
  },
};
