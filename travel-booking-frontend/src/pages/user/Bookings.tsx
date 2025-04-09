import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import MainLayout from '../../components/layout/MainLayout';

const PageWrapper = styled.div`
  width: 100%;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background};
`;

const Container = styled.div`
  max-width: ${props => props.theme.maxWidth.content};
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes.xxl};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.base};
  font-family: ${props => props.theme.fonts.heading};
  text-align: center;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.muted};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const BookingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const BookingCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
`;

const BookingHeader = styled.div`
  padding: ${props => props.theme.spacing.base} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.primary}10;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BookingId = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const BookingStatus = styled.span<{ status: 'pending' | 'confirmed' | 'completed' | 'cancelled' }>`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.base};
  border-radius: ${props => props.theme.borderRadius.round};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  
  ${props => {
    switch (props.status) {
      case 'pending':
        return `
          background: ${props.theme.colors.accent}20;
          color: ${props.theme.colors.accent};
        `;
      case 'confirmed':
        return `
          background: ${props.theme.colors.primary}20;
          color: ${props.theme.colors.primary};
        `;
      case 'completed':
        return `
          background: ${props.theme.colors.success}20;
          color: ${props.theme.colors.success};
        `;
      case 'cancelled':
        return `
          background: ${props.theme.colors.error}20;
          color: ${props.theme.colors.error};
        `;
    }
  }}
`;

const BookingContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const TourTitle = styled(Link)`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.base};
  display: block;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const BookingInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.base};
  margin-bottom: ${props => props.theme.spacing.base};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.muted};

  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

const EmptyStateText = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ExploreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.base} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  transition: all ${props => props.theme.animations.fast};

  &:hover {
    background: ${props => props.theme.colors.accent};
    transform: translateY(-2px);
  }
`;

interface Booking {
  id: string;
  tourId: string;
  tourName: string;
  location: string;
  startDate: string;
  participants: number;
  totalPrice: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch bookings
    const fetchBookings = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBookings([
          {
            id: 'B001',
            tourId: '1',
            tourName: 'Tour Đà Lạt 3N2Đ',
            location: 'Đà Lạt',
            startDate: '2024-04-15',
            participants: 2,
            totalPrice: '6.000.000₫',
            status: 'confirmed'
          },
          {
            id: 'B002',
            tourId: '2',
            tourName: 'Tour Phú Quốc Nghỉ Dưỡng',
            location: 'Phú Quốc',
            startDate: '2024-05-01',
            participants: 3,
            totalPrice: '13.500.000₫',
            status: 'pending'
          },
          {
            id: 'B003',
            tourId: '3',
            tourName: 'Tour Hạ Long 2N1Đ',
            location: 'Hạ Long',
            startDate: '2024-03-10',
            participants: 2,
            totalPrice: '4.000.000₫',
            status: 'completed'
          }
        ]);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <PageWrapper>
          <Container>
            <Title>Đang tải...</Title>
          </Container>
        </PageWrapper>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageWrapper>
        <Container>
          <Title>Đơn đặt tour của bạn</Title>
          <Subtitle>Quản lý và theo dõi các tour bạn đã đặt</Subtitle>

          {bookings.length === 0 ? (
            <EmptyState>
              <EmptyStateText>
                Bạn chưa đặt tour nào
              </EmptyStateText>
              <ExploreButton to="/tours">
                Khám phá các tour
              </ExploreButton>
            </EmptyState>
          ) : (
            <BookingList>
              {bookings.map(booking => (
                <BookingCard key={booking.id}>
                  <BookingHeader>
                    <BookingId>Mã đơn: {booking.id}</BookingId>
                    <BookingStatus status={booking.status}>
                      {booking.status === 'pending' && 'Chờ xác nhận'}
                      {booking.status === 'confirmed' && 'Đã xác nhận'}
                      {booking.status === 'completed' && 'Đã hoàn thành'}
                      {booking.status === 'cancelled' && 'Đã hủy'}
                    </BookingStatus>
                  </BookingHeader>
                  <BookingContent>
                    <TourTitle to={`/tour/${booking.tourId}`}>
                      {booking.tourName}
                    </TourTitle>
                    <BookingInfo>
                      <InfoItem>
                        <FaMapMarkerAlt />
                        {booking.location}
                      </InfoItem>
                      <InfoItem>
                        <FaCalendarAlt />
                        {new Date(booking.startDate).toLocaleDateString('vi-VN')}
                      </InfoItem>
                      <InfoItem>
                        <FaUsers />
                        {booking.participants} người
                      </InfoItem>
                      <InfoItem>
                        <FaMoneyBillWave />
                        {booking.totalPrice}
                      </InfoItem>
                    </BookingInfo>
                  </BookingContent>
                </BookingCard>
              ))}
            </BookingList>
          )}
        </Container>
      </PageWrapper>
    </MainLayout>
  );
};

export default Bookings; 