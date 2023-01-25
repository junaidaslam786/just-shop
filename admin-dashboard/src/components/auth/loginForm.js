import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../features/user/userThunk';

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const dispatch = useDispatch()
  const navigate = useNavigate()



  const user = useSelector((state) => state.user)
  const { loading, error, userToken } = user

  // const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userToken) {
      navigate('/dashboard')
    }
  }, [navigate, userToken])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(userLogin({ email, password }))
  }


  return (
    <Form
      className="form-horizontal auth-form"
      onSubmit={submitHandler}
    >
      <FormGroup>
        <Input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <div className="form-terms">
        <div className="custom-control custom-checkbox me-sm-2">
          <Label className="d-block">
            <Input
              className="checkbox_animated"
              id="chk-ani2"
              type="checkbox"
            />
            Reminder Me{' '}
            <span className="pull-right">
              {' '}
              <a href="/#" className="btn btn-default forgot-pass p-0">
                lost your password
              </a>
            </span>
          </Label>
        </div>
      </div>
      <div className="form-button">
        <Button color="primary" type="submit">
          {loading ? 'Loading...' : 'Login'}
        </Button>
      </div>
      <div className="form-footer">
        <span>Or Login up with social platforms</span>
        <ul className="social">
          <li>
            <a href="/#">
              <i className="icon-facebook"></i>
            </a>
          </li>
          <li>
            <a href="/#">
              <i className="icon-twitter-alt"></i>
            </a>
          </li>
          <li>
            <a href="/#">
              <i className="icon-instagram"></i>
            </a>
          </li>
          <li>
            <a href="/#">
              <i className="icon-pinterest-alt"></i>
            </a>
          </li>
        </ul>
      </div>
    </Form>
  );
};

export default LoginForm;
