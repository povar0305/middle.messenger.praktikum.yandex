import { router } from '../router';

export function handleError(error: XMLHttpRequest) {
  if (!error.response) {
    return router.go('/500');
  }
  const { reason } = JSON.parse(error.response);
  console.error(reason)
  return Promise.reject(error);
}
