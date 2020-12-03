import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pkg-images.reducer';
import { IPkgImages } from 'app/shared/model/pkg-images.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPkgImagesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PkgImagesDetail = (props: IPkgImagesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { pkgImagesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="bundlerProApp.pkgImages.detail.title">PkgImages</Translate> [<b>{pkgImagesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="packageID">
              <Translate contentKey="bundlerProApp.pkgImages.packageID">Package ID</Translate>
            </span>
          </dt>
          <dd>{pkgImagesEntity.packageID}</dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="bundlerProApp.pkgImages.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{pkgImagesEntity.imageUrl}</dd>
          <dt>
            <Translate contentKey="bundlerProApp.pkgImages.pkg">Pkg</Translate>
          </dt>
          <dd>{pkgImagesEntity.pkg ? pkgImagesEntity.pkg.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/pkg-images" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/pkg-images/${pkgImagesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ pkgImages }: IRootState) => ({
  pkgImagesEntity: pkgImages.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PkgImagesDetail);
