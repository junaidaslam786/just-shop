import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/user/userThunk';
import Error from './error';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;

  // const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate('/setting/profile')
    }
  }, [navigate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(registerUser({ name, email, password }))
    }
  }

  return (
    <Form className="form-horizontal auth-form" onSubmit={submitHandler}>
      {/* {error && <Error>{error}</Error>}
      {customError && <Error>{customError}</Error>} */}
      <FormGroup>
        <Input
          type="name"
          className="form-control"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          required=""
          type="password"
          className="form-control"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          required=""
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
            I agree all statements in{' '}
            <span>
              <a href="/#">Terms &amp; Conditions</a>
            </span>
          </Label>
        </div>
      </div>
      <div className="form-button">
        <Button color="primary" type="submit" >
          {loading ? 'Loading...' : 'Register'}
        </Button>
      </div>
      <div className="form-footer">
        <span>Or Sign up with social platforms</span>
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

export default RegisterForm;
