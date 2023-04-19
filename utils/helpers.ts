import { Route } from 'vue-router'
export function equalRoute(route: Route, name: string) {
  const routeName = route.name?.split('__')[0]
  return routeName === name
}
