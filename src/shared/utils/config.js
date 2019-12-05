import 'whatwg-fetch';

let config;

const loadConfiguration = async () => {
  if (config) {
    return config;
  }

  const response = await fetch('./config.json');
  const json = await response.json();
  config = json;

  return config;
};

export default loadConfiguration;
