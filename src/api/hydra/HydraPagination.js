import PropTypes from 'prop-types';

function getQueryStringsFromUrl(url) {
  if (url === undefined || url === null) {
    return null;
  }

  return url.split('?')[1];
}

export default class HydraPagination {
  /**
     * Create a Hydra pagination with all values from the hydra view
     * @param hydraView the hydra view
     */
  constructor(hydraView) {
    // get all values from the url
    const currentValue = new URLSearchParams(getQueryStringsFromUrl(hydraView['@id'])).get('page');
    const firstValue = new URLSearchParams(getQueryStringsFromUrl(hydraView['hydra:first'])).get('page');
    const previousValue = new URLSearchParams(getQueryStringsFromUrl(hydraView['hydra:previous'])).get('page');
    const lastValue = new URLSearchParams(getQueryStringsFromUrl(hydraView['hydra:last'])).get('page');
    const nextValue = new URLSearchParams(getQueryStringsFromUrl(hydraView['hydra:next'])).get('page');
    // convert all values to number
    this.current = currentValue !== null ? +currentValue : null;
    this.first = firstValue !== null ? +firstValue : null;
    this.previous = previousValue !== null ? +previousValue : null;
    this.last = lastValue !== null ? +lastValue : null;
    this.next = nextValue !== null ? +nextValue : null;
  }

  static getPropType() {
    return {
      current: PropTypes.number,
      first: PropTypes.number,
      last: PropTypes.number,
      previous: PropTypes.number,
      next: PropTypes.number,
    };
  }

  static get defaultProps() {
    return {
      current: null,
      first: null,
      last: null,
      previous: null,
      next: null,
    };
  }
}
