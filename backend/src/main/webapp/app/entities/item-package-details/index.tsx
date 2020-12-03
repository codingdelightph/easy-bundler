import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ItemPackageDetails from './item-package-details';
import ItemPackageDetailsDetail from './item-package-details-detail';
import ItemPackageDetailsUpdate from './item-package-details-update';
import ItemPackageDetailsDeleteDialog from './item-package-details-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ItemPackageDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ItemPackageDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ItemPackageDetailsDetail} />
      <ErrorBoundaryRoute path={match.url} component={ItemPackageDetails} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ItemPackageDetailsDeleteDialog} />
  </>
);

export default Routes;
