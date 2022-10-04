const axios = require('axios');
const { GE_URLS } = require('./constants');

/**
 * Fetches and returns the specified item's detailed infos from the official API
 *
 * @access private
 * @param {number} id Item's id
 */
const _fetchItem = (id, config) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${GE_URLS.detail}?item=${id}`, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (!err.response) {
          reject(new Error('An unknown networking error occurred.'));
        } else if (
          (err.response.data && err.response.data.includes('not found')) ||
          (err.data && err.data.includes('not found'))
        ) {
          reject(new Error('No items were found for the specified id'));
        } else reject(err);
      });
  });

/**
 * Returns a JSON friendly object containing all the detailed infos for the specified item
 *
 * @access public
 * @param {number} id Item's id
 */
const getItem = async (id, config = undefined) => {
  if (typeof id !== 'number' || id <= 0) throw new Error('Invalid item id');

  return _fetchItem(id, config);
};

/**
 * Fetches and returns the specified item's graph infos from the official API
 *
 * @access private
 * @param {number} id Item's id
 */
const _fetchGraph = (id, config) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${GE_URLS.graph}/${id}.json`, config)
      .then((res) => resolve(res.data))
      .catch((err) => {
        if (!err.response) {
          reject(new Error('An unknown networking error occurred.'));
        } else if (
          (err.response.data && err.response.data.includes('not found')) ||
          (err.data && err.data.includes('not found'))
        ) {
          reject(new Error('No items were found for the specified id'));
        } else reject(err);
      });
  });

/**
 * Returns a JSON friendly object containing all the graph infos for the specified item
 *
 * @access public
 * @param {number} id Item's id
 */
const getGraph = (id, config = undefined) => {
  if (typeof id !== 'number' || id <= 0) throw new Error('Invalid item id');

  return _fetchGraph(id, config);
};

module.exports = { getItem, getGraph };
