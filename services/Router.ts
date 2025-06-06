import Route from './Route';
import Block from "./Block";

class Router {
  public routes!: Route[];
  public history!: History;
  private _currentRoute!: Route | null;
  private _rootQuery!: string;
  private _pathnames!: string[];
  private _onRouteCallback!: () => void;
  private _unprotectedPaths!: `/${string}`[];

  static __instance: Router;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this._pathnames = [];
    this._unprotectedPaths = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this._onRouteCallback = () => {};

    Router.__instance = this;
  }

  public use(pathname: string, BlockClass: Block) {
    const route = new Route(pathname, BlockClass, { rootQuery: this._rootQuery });
    this.routes.push(route);
    this._pathnames.push(pathname);
    return this;
  }

  private _hasRoute(pathname: string) {
    if (!this._pathnames.includes(pathname)) {
      return '*';
    }
    return pathname;
  }

  public start() {
    window.onpopstate = () => {
      const pathname = this._hasRoute(window.location.pathname);
      this._onRoute(pathname);
    };

    const pathname = this._hasRoute(window.location.pathname);
    this._onRoute(pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      console.warn(`Нет маршрута для ${pathname}`);
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    if (!this._unprotectedPaths.includes(pathname as `/${string}`)) {
      this._onRouteCallback();
    }

    route.render();
  }

  public onRoute(callback: () => void) {
    this._onRouteCallback = callback;
    return this;
  }

  public setUnprotectedPaths(paths: `/${string}`[]) {
    this._unprotectedPaths = paths;
    return this;

  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }

}

export default Router;
