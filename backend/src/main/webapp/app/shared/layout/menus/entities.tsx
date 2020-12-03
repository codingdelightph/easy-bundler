import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/item-master">
      <Translate contentKey="global.menu.entities.itemMaster" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/item-package">
      <Translate contentKey="global.menu.entities.itemPackage" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/item-package-details">
      <Translate contentKey="global.menu.entities.itemPackageDetails" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pkg-images">
      <Translate contentKey="global.menu.entities.pkgImages" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-product">
      <Translate contentKey="global.menu.entities.userProduct" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
