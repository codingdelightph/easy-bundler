import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserProduct from './user-product';
import UserProductDetail from './user-product-detail';
import UserProductUpdate from './user-product-update';
import UserProductDeleteDialog from './user-product-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserProductUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserProductUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserProductDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserProduct} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UserProductDeleteDialog} />
  </>
);

export default Routes;
