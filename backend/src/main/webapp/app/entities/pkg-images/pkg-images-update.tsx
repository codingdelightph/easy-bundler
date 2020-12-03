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
import { getEntity, updateEntity, createEntity, reset } from './pkg-images.reducer';
import { IPkgImages } from 'app/shared/model/pkg-images.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPkgImagesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PkgImagesUpdate = (props: IPkgImagesUpdateProps) => {
  const [pkgId, setPkgId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { pkgImagesEntity, itemPackages, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/pkg-images');
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
        ...pkgImagesEntity,
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
          <h2 id="bundlerProApp.pkgImages.home.createOrEditLabel">
            <Translate contentKey="bundlerProApp.pkgImages.home.createOrEditLabel">Create or edit a PkgImages</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : pkgImagesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="pkg-images-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="pkg-images-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="packageIDLabel" for="pkg-images-packageID">
                  <Translate contentKey="bundlerProApp.pkgImages.packageID">Package ID</Translate>
                </Label>
                <AvField id="pkg-images-packageID" type="string" className="form-control" name="packageID" />
              </AvGroup>
              <AvGroup>
                <Label id="imageUrlLabel" for="pkg-images-imageUrl">
                  <Translate contentKey="bundlerProApp.pkgImages.imageUrl">Image Url</Translate>
                </Label>
                <AvField
                  id="pkg-images-imageUrl"
                  type="text"
                  name="imageUrl"
                  validate={{
                    maxLength: { value: 500, errorMessage: translate('entity.validation.maxlength', { max: 500 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="pkg-images-pkg">
                  <Translate contentKey="bundlerProApp.pkgImages.pkg">Pkg</Translate>
                </Label>
                <AvInput id="pkg-images-pkg" type="select" className="form-control" name="pkg.id">
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
              <Button tag={Link} id="cancel-save" to="/pkg-images" replace color="info">
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
  pkgImagesEntity: storeState.pkgImages.entity,
  loading: storeState.pkgImages.loading,
  updating: storeState.pkgImages.updating,
  updateSuccess: storeState.pkgImages.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(PkgImagesUpdate);
