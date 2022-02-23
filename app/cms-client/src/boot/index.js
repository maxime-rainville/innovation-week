/* global window */
import reactRouteRegister from 'lib/ReactRouteRegister';
import Config from 'lib/Config';
import Index from 'components/Pages/Index';
import Foo from 'components/Pages/Foo';
import Bar from 'components/Pages/Bar';
import NotFound from 'components/Pages/NotFound';

window.document.addEventListener('DOMContentLoaded', () => {

  const sectionConfig = Config.getSection('InnovationWeek');

  reactRouteRegister.add({
    path: '/',
    routes: [
      {
        path: `/${sectionConfig.url}/bar/:parameterOne?/:parameterTwo?`,
        component: Bar,
      },
      {
        path: `/${sectionConfig.url}/foo`,
        component: Foo,
      },
      {
        path: `/${sectionConfig.url}`,
        component: Index,
        exact: true,
      },
      {
        path: `/`,
        component: NotFound,
        exact: false,
      },
    ],
  });
});
