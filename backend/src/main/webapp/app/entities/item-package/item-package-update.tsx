import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './item-package.reducer';
import { IItemPackage } from 'app/shared/model/item-package.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IItemPackageUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ItemPackageUpdate = (props: IItemPackageUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { itemPackageEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/item-package');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...itemPackageEntity,
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
          <h2 id="bundlerProApp.itemPackage.home.createOrEditLabel">
            <Translate contentKey="bundlerProApp.itemPackage.home.createOrEditLabel">Create or edit a ItemPackage</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : itemPackageEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="item-package-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="item-package-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="packageIDLabel" for="item-package-packageID">
                  <Translate contentKey="bundlerProApp.itemPackage.packageID">Package ID</Translate>
                </Label>
                <AvField id="item-package-packageID" type="string" className="form-control" name="packageID" />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="item-package-code">
                  <Translate contentKey="bundlerProApp.itemPackage.code">Code</Translate>
                </Label>
                <AvField
                  id="item-package-code"
                  type="text"
                  name="code"
                  validate={{
                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="item-package-description">
                  <Translate contentKey="bundlerProApp.itemPackage.description">Description</Translate>
                </Label>
                <AvField
                  id="item-package-description"
                  type="text"
                  name="description"
                  validate={{
                    maxLength: { value: 140, errorMessage: translate('entity.validation.maxlength', { max: 140 }) },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/item-package" replace color="info">
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
  itemPackageEntity: storeState.itemPackage.entity,
  loading: storeState.itemPackage.loading,
  updating: storeState.itemPackage.updating,
  updateSuccess: storeState.itemPackage.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ItemPackageUpdate);
