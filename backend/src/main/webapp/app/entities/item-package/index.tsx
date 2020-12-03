import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ItemPackage from './item-package';
import ItemPackageDetail from './item-package-detail';
import ItemPackageUpdate from './item-package-update';
import ItemPackageDeleteDialog from './item-package-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ItemPackageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ItemPackageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ItemPackageDetail} />
      <ErrorBoundaryRoute path={match.url} component={ItemPackage} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ItemPackageDeleteDialog} />
  </>
);

export default Routes;
