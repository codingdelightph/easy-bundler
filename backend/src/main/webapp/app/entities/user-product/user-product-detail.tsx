import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-product.reducer';
import { IUserProduct } from 'app/shared/model/user-product.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserProductDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserProductDetail = (props: IUserProductDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { userProductEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="bundlerProApp.userProduct.detail.title">UserProduct</Translate> [<b>{userProductEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="packageID">
              <Translate contentKey="bundlerProApp.userProduct.packageID">Package ID</Translate>
            </span>
          </dt>
          <dd>{userProductEntity.packageID}</dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="bundlerProApp.userProduct.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{userProductEntity.imageUrl}</dd>
          <dt>
            <Translate contentKey="bundlerProApp.userProduct.user">User</Translate>
          </dt>
          <dd>{userProductEntity.user ? userProductEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-product" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-product/${userProductEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ userProduct }: IRootState) => ({
  userProductEntity: userProduct.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserProductDetail);
