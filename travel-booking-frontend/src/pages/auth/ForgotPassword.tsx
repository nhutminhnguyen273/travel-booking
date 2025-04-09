import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';

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
  max-width: 480px;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  text-align: center;
  font-family: ${props => props.theme.fonts.heading};
`;

const Description = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.muted};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSizes.sm};
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

const SuccessMessage = styled.div`
  color: ${props => props.theme.colors.success};
  background: ${props => props.theme.colors.success}10;
  padding: ${props => props.theme.spacing.base};
  border-radius: ${props => props.theme.borderRadius.md};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.base};
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.fontSizes.sm};
  margin-top: ${props => props.theme.spacing.xs};
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email) {
      setError('Vui lòng nhập địa chỉ email');
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement password reset API call
      // const response = await resetPassword(email);
      // if (response.success) {
      //   setSuccess(true);
      // }
      console.log('Reset password for:', email);
      setSuccess(true);
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <FormContainer>
        <Title>Quên mật khẩu?</Title>
        <Description>
          Nhập địa chỉ email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
        </Description>

        {success ? (
          <>
            <SuccessMessage>
              Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn.
              Vui lòng kiểm tra hộp thư (bao gồm cả thư rác).
            </SuccessMessage>
            <Text>
              <StyledLink to="/login">Quay lại đăng nhập</StyledLink>
            </Text>
          </>
        ) : (
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Icon><FaEnvelope /></Icon>
              <Input
                type="email"
                placeholder="Nhập địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Button type="submit" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Gửi yêu cầu'}
            </Button>

            <Text>
              <StyledLink to="/login">Quay lại đăng nhập</StyledLink>
            </Text>
          </Form>
        )}
      </FormContainer>
    </PageWrapper>
  );
};

export default ForgotPassword; 