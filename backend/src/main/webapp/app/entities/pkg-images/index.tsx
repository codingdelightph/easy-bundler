import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PkgImages from './pkg-images';
import PkgImagesDetail from './pkg-images-detail';
import PkgImagesUpdate from './pkg-images-update';
import PkgImagesDeleteDialog from './pkg-images-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PkgImagesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PkgImagesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PkgImagesDetail} />
      <ErrorBoundaryRoute path={match.url} component={PkgImages} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PkgImagesDeleteDialog} />
  </>
);

export default Routes;
