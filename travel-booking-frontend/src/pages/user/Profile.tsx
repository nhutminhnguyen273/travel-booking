import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import MainLayout from '../../components/layout/MainLayout';

const PageWrapper = styled.div`
  width: 100%;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background};
`;

const Container = styled.div`
  max-width: ${props => props.theme.maxWidth.text};
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes.xxl};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-family: ${props => props.theme.fonts.heading};
  text-align: center;
`;

const ProfileCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  padding: ${props => props.theme.spacing.xl};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text};
  font-weight: 500;

  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.base};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  transition: all ${props => props.theme.animations.normal};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.base};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all ${props => props.theme.animations.normal};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.base} ${props => props.theme.spacing.xl};
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
    transform: translateY(-2px);
  }

  &:disabled {
    background: ${props => props.theme.colors.muted};
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  color: ${props => props.theme.colors.success};
  background: ${props => props.theme.colors.success}10;
  padding: ${props => props.theme.spacing.base};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.base};
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.fontSizes.sm};
  margin-top: ${props => props.theme.spacing.xs};
`;

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: 'Quận 1, TP. Hồ Chí Minh',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      // TODO: Implement API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSuccess(true);
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <PageWrapper>
        <Container>
          <Title>Thông tin cá nhân</Title>
          <ProfileCard>
            {success && (
              <SuccessMessage>
                Cập nhật thông tin thành công!
              </SuccessMessage>
            )}
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Label>
                  <FaUser />
                  Họ và tên
                </Label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <Label>
                  <FaEnvelope />
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
              </InputGroup>

              <InputGroup>
                <Label>
                  <FaPhone />
                  Số điện thoại
                </Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup>
                <Label>
                  <FaMapMarkerAlt />
                  Địa chỉ
                </Label>
                <TextArea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </InputGroup>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <Button type="submit" disabled={loading}>
                {loading ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
              </Button>
            </Form>
          </ProfileCard>
        </Container>
      </PageWrapper>
    </MainLayout>
  );
};

export default Profile; 