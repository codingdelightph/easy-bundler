import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ItemMaster from './item-master';
import ItemMasterDetail from './item-master-detail';
import ItemMasterUpdate from './item-master-update';
import ItemMasterDeleteDialog from './item-master-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ItemMasterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ItemMasterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ItemMasterDetail} />
      <ErrorBoundaryRoute path={match.url} component={ItemMaster} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ItemMasterDeleteDialog} />
  </>
);

export default Routes;
