import devMiddleware from './dev';
import prodMiddleware from './prod';

export default process.env.NODE_ENV === 'development'
  ? devMiddleware : prodMiddleware;
