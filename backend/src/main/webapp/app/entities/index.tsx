import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ItemMaster from './item-master';
import ItemPackage from './item-package';
import ItemPackageDetails from './item-package-details';
import PkgImages from './pkg-images';
import UserProduct from './user-product';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}item-master`} component={ItemMaster} />
      <ErrorBoundaryRoute path={`${match.url}item-package`} component={ItemPackage} />
      <ErrorBoundaryRoute path={`${match.url}item-package-details`} component={ItemPackageDetails} />
      <ErrorBoundaryRoute path={`${match.url}pkg-images`} component={PkgImages} />
      <ErrorBoundaryRoute path={`${match.url}user-product`} component={UserProduct} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
