import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './item-master.reducer';
import { IItemMaster } from 'app/shared/model/item-master.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IItemMasterDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ItemMasterDetail = (props: IItemMasterDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { itemMasterEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="bundlerProApp.itemMaster.detail.title">ItemMaster</Translate> [<b>{itemMasterEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="bundlerProApp.itemMaster.code">Code</Translate>
            </span>
          </dt>
          <dd>{itemMasterEntity.code}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="bundlerProApp.itemMaster.description">Description</Translate>
            </span>
          </dt>
          <dd>{itemMasterEntity.description}</dd>
          <dt>
            <Translate contentKey="bundlerProApp.itemMaster.user">User</Translate>
          </dt>
          <dd>{itemMasterEntity.user ? itemMasterEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/item-master" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/item-master/${itemMasterEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ itemMaster }: IRootState) => ({
  itemMasterEntity: itemMaster.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ItemMasterDetail);
