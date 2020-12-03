import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './item-package-details.reducer';
import { IItemPackageDetails } from 'app/shared/model/item-package-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IItemPackageDetailsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ItemPackageDetails = (props: IItemPackageDetailsProps) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    props.getEntities();
  }, []);

  const startSearching = () => {
    if (search) {
      props.getSearchEntities(search);
    }
  };

  const clear = () => {
    setSearch('');
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  const { itemPackageDetailsList, match, loading } = props;
  return (
    <div>
      <h2 id="item-package-details-heading">
        <Translate contentKey="bundlerProApp.itemPackageDetails.home.title">Item Package Details</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="bundlerProApp.itemPackageDetails.home.createLabel">Create new Item Package Details</Translate>
        </Link>
      </h2>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  placeholder={translate('bundlerProApp.itemPackageDetails.home.search')}
                />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      <div className="table-responsive">
        {itemPackageDetailsList && itemPackageDetailsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="bundlerProApp.itemPackageDetails.packageID">Package ID</Translate>
                </th>
                <th>
                  <Translate contentKey="bundlerProApp.itemPackageDetails.rowID">Row ID</Translate>
                </th>
                <th>
                  <Translate contentKey="bundlerProApp.itemPackageDetails.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="bundlerProApp.itemPackageDetails.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="bundlerProApp.itemPackageDetails.pkg">Pkg</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {itemPackageDetailsList.map((itemPackageDetails, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${itemPackageDetails.id}`} color="link" size="sm">
                      {itemPackageDetails.id}
                    </Button>
                  </td>
                  <td>{itemPackageDetails.packageID}</td>
                  <td>{itemPackageDetails.rowID}</td>
                  <td>{itemPackageDetails.code}</td>
                  <td>{itemPackageDetails.description}</td>
                  <td>
                    {itemPackageDetails.pkg ? (
                      <Link to={`item-package/${itemPackageDetails.pkg.id}`}>{itemPackageDetails.pkg.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${itemPackageDetails.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${itemPackageDetails.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${itemPackageDetails.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="bundlerProApp.itemPackageDetails.home.notFound">No Item Package Details found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ itemPackageDetails }: IRootState) => ({
  itemPackageDetailsList: itemPackageDetails.entities,
  loading: itemPackageDetails.loading,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ItemPackageDetails);
