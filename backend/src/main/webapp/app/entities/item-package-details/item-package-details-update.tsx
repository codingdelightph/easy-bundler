import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IItemPackage } from 'app/shared/model/item-package.model';
import { getEntities as getItemPackages } from 'app/entities/item-package/item-package.reducer';
import { getEntity, updateEntity, createEntity, reset } from './item-package-details.reducer';
import { IItemPackageDetails } from 'app/shared/model/item-package-details.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IItemPackageDetailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ItemPackageDetailsUpdate = (props: IItemPackageDetailsUpdateProps) => {
  const [pkgId, setPkgId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { itemPackageDetailsEntity, itemPackages, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/item-package-details');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getItemPackages();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...itemPackageDetailsEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="bundlerProApp.itemPackageDetails.home.createOrEditLabel">
            <Translate contentKey="bundlerProApp.itemPackageDetails.home.createOrEditLabel">Create or edit a ItemPackageDetails</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : itemPackageDetailsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="item-package-details-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="item-package-details-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="packageIDLabel" for="item-package-details-packageID">
                  <Translate contentKey="bundlerProApp.itemPackageDetails.packageID">Package ID</Translate>
                </Label>
                <AvField id="item-package-details-packageID" type="string" className="form-control" name="packageID" />
              </AvGroup>
              <AvGroup>
                <Label id="rowIDLabel" for="item-package-details-rowID">
                  <Translate contentKey="bundlerProApp.itemPackageDetails.rowID">Row ID</Translate>
                </Label>
                <AvField id="item-package-details-rowID" type="string" className="form-control" name="rowID" />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="item-package-details-code">
                  <Translate contentKey="bundlerProApp.itemPackageDetails.code">Code</Translate>
                </Label>
                <AvField
                  id="item-package-details-code"
                  type="text"
                  name="code"
                  validate={{
                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="item-package-details-description">
                  <Translate contentKey="bundlerProApp.itemPackageDetails.description">Description</Translate>
                </Label>
                <AvField
                  id="item-package-details-description"
                  type="text"
                  name="description"
                  validate={{
                    maxLength: { value: 140, errorMessage: translate('entity.validation.maxlength', { max: 140 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="item-package-details-pkg">
                  <Translate contentKey="bundlerProApp.itemPackageDetails.pkg">Pkg</Translate>
                </Label>
                <AvInput id="item-package-details-pkg" type="select" className="form-control" name="pkg.id">
                  <option value="" key="0" />
                  {itemPackages
                    ? itemPackages.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/item-package-details" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  itemPackages: storeState.itemPackage.entities,
  itemPackageDetailsEntity: storeState.itemPackageDetails.entity,
  loading: storeState.itemPackageDetails.loading,
  updating: storeState.itemPackageDetails.updating,
  updateSuccess: storeState.itemPackageDetails.updateSuccess,
});

const mapDispatchToProps = {
  getItemPackages,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ItemPackageDetailsUpdate);
