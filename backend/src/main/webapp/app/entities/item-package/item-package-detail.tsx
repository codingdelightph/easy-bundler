import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './item-package.reducer';
import { IItemPackage } from 'app/shared/model/item-package.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IItemPackageDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ItemPackageDetail = (props: IItemPackageDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { itemPackageEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="bundlerProApp.itemPackage.detail.title">ItemPackage</Translate> [<b>{itemPackageEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="packageID">
              <Translate contentKey="bundlerProApp.itemPackage.packageID">Package ID</Translate>
            </span>
          </dt>
          <dd>{itemPackageEntity.packageID}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="bundlerProApp.itemPackage.code">Code</Translate>
            </span>
          </dt>
          <dd>{itemPackageEntity.code}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="bundlerProApp.itemPackage.description">Description</Translate>
            </span>
          </dt>
          <dd>{itemPackageEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/item-package" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/item-package/${itemPackageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ itemPackage }: IRootState) => ({
  itemPackageEntity: itemPackage.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ItemPackageDetail);
