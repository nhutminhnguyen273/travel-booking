import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import MainLayout from '../../components/layout/MainLayout';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background};
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
  font-family: ${props => props.theme.fonts.heading};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.base};
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.base} ${props => props.theme.spacing.base} ${props => props.theme.spacing.base} 2.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  transition: all ${props => props.theme.animations.normal};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.muted};
  }
`;

const Icon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.muted};
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.base};
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: 600;
  cursor: pointer;
  transition: all ${props => props.theme.animations.fast};

  &:hover {
    background: ${props => props.theme.colors.accent};
  }

  &:disabled {
    background: ${props => props.theme.colors.muted};
    cursor: not-allowed;
  }
`;

const Text = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.text};
  margin-top: ${props => props.theme.spacing.base};
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ForgotPasswordLink = styled(Link)`
  display: block;
  text-align: right;
  color: ${props => props.theme.colors.muted};
  font-size: ${props => props.theme.fontSizes.sm};
  text-decoration: none;
  margin-top: ${props => props.theme.spacing.xs};

  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.fontSizes.sm};
  margin-top: ${props => props.theme.spacing.xs};
`;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Vui lòng nhập email và mật khẩu');
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement login API call
      // const response = await loginUser(formData);
      // if (response.success) {
      //   localStorage.setItem('token', response.token);
      //   navigate('/');
      // }
      
      // For demo purposes
      if (formData.email === 'demo@example.com' && formData.password === 'password') {
        localStorage.setItem('token', 'demo-token');
        navigate('/');
      } else {
        setError('Email hoặc mật khẩu không đúng');
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <PageWrapper>
        <FormContainer>
          <Title>Đăng nhập</Title>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Icon><FaEnvelope /></Icon>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <Icon><FaLock /></Icon>
              <Input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
              />
            </InputGroup>

            <ForgotPasswordLink to="/forgot-password">
              Quên mật khẩu?
            </ForgotPasswordLink>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Button type="submit" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </Button>
          </Form>

          <Text>
            Chưa có tài khoản? <StyledLink to="/register">Đăng ký ngay</StyledLink>
          </Text>
        </FormContainer>
      </PageWrapper>
    </MainLayout>
  );
};

export default Login; 