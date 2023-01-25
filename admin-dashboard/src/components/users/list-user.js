import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../common/breadcrumb';
import { Card, CardBody, CardHeader, Container } from 'reactstrap';
import Datatable from '../common/datatable';
import {
  DataGrid,
  ColumnChooser,
  ColumnFixing,
  Column,
  RequiredRule,
  FilterRow,
  SearchPanel,
  GroupPanel,
  Selection,
  Summary,
  GroupItem,
  Editing,
  Grouping,
  Toolbar,
  Item,
  MasterDetail,
  Export,
} from 'devextreme-react/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../features/user/userThunk';

const List_user = () => {
  // const { data, isLoading } = useGetAllUsersQuery();
  const { users, loading, userToken } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /*
    Header component is responsible for fetching
   the user's details once the broswer finds a token
  */
  useEffect(() => {
    if (userToken) {
      dispatch(getAllUsers());
      navigate(`${process.env.PUBLIC_URL}/users/list-user`);
    }
  }, [userToken, navigate, dispatch]);

  return (
    <Fragment>
      <Breadcrumb title="User List" parent="Users" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>User Details</h5>
          </CardHeader>
          <CardBody>
            <div className="btn-popup pull-right">
              <Link to="/users/create-user" className="btn btn-secondary">
                Create User
              </Link>
            </div>
            <div className="clearfix"></div>
            <div
              id="batchDelete"
              className="category-table user-list order-table coupon-list-delete"
            >
              {users || !loading ? (
                <DataGrid
                  dataSource={users}
                  allowColumnResizing={true}
                  columnAutoWidth={true}
                  allowColumnReordering={true}
                >
                  <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true}
                  />
                </DataGrid>
                // <Datatable
                //   multiSelectOption={true}
                //   myData={users}
                //   pageSize={10}
                //   pagination={true}
                //   class="-striped -highlight"
                // />
              ) : (
                <>Loading...</>
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default List_user;
