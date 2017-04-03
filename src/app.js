export class App {

  constructor() {
    
  }

  configureRouter(config, router) {
    config.title = 'Debt Resolver';
    config.options.pushState = true;
    config.map([
      { route: '', moduleId: 'pages/index', name: 'index', title: 'Home' },
      { route: 'about', moduleId: 'pages/about', name: 'about', title: 'About' },
      { route: 'add-persons', moduleId: 'pages/add-persons', name: 'add-persons', title: 'Add Persons' },
      { route: 'add-debt', moduleId: 'pages/add-debt', name: 'add-debt', title: 'Add Debt' },
      { route: 'debt-amount', moduleId: 'pages/debt-amount', name: 'debt-amount', title: 'Debt Amount' },
      { route: 'resolved-debt', moduleId: 'pages/resolved-debt', name: 'resolved-debt', title: 'Resolved Debt' }
    ]);

    this.router = router;
  }

}
