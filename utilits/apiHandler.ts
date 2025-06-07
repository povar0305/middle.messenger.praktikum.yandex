import { router } from '../router';

export function handleError(error: XMLHttpRequest) {
  if (!error.response) {
    console.error(error)
    return router.go('/500');
  }
  const { reason } = JSON.parse(error.response);
  console.error(reason)

  if (reason === 'User already in system') {
    router.go('/messenger');

  }

  return Promise.reject(error);
}
