import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './item-package-details.reducer';
import { IItemPackageDetails } from 'app/shared/model/item-package-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IItemPackageDetailsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ItemPackageDetailsDetail = (props: IItemPackageDetailsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { itemPackageDetailsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="bundlerProApp.itemPackageDetails.detail.title">ItemPackageDetails</Translate> [
          <b>{itemPackageDetailsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="packageID">
              <Translate contentKey="bundlerProApp.itemPackageDetails.packageID">Package ID</Translate>
            </span>
          </dt>
          <dd>{itemPackageDetailsEntity.packageID}</dd>
          <dt>
            <span id="rowID">
              <Translate contentKey="bundlerProApp.itemPackageDetails.rowID">Row ID</Translate>
            </span>
          </dt>
          <dd>{itemPackageDetailsEntity.rowID}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="bundlerProApp.itemPackageDetails.code">Code</Translate>
            </span>
          </dt>
          <dd>{itemPackageDetailsEntity.code}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="bundlerProApp.itemPackageDetails.description">Description</Translate>
            </span>
          </dt>
          <dd>{itemPackageDetailsEntity.description}</dd>
          <dt>
            <Translate contentKey="bundlerProApp.itemPackageDetails.pkg">Pkg</Translate>
          </dt>
          <dd>{itemPackageDetailsEntity.pkg ? itemPackageDetailsEntity.pkg.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/item-package-details" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/item-package-details/${itemPackageDetailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ itemPackageDetails }: IRootState) => ({
  itemPackageDetailsEntity: itemPackageDetails.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ItemPackageDetailsDetail);
