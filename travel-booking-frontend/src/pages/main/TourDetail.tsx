import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaStar, FaClock } from 'react-icons/fa';

// Mock tour data - in a real app this would come from an API
const mockTours = [
  {
    id: 1,
    name: 'Khám phá Đà Lạt 3N2Đ',
    description: 'Tour du lịch Đà Lạt 3 ngày 2 đêm sẽ đưa bạn đến với thành phố ngàn hoa lãng mạn, với không khí se lạnh, trong lành và những cảnh đẹp nên thơ. Hành trình sẽ đưa bạn tham quan Quảng trường Lâm Viên, Hồ Xuân Hương, Đồi Chè Cầu Đất, Vườn hoa thành phố và nhiều điểm đến hấp dẫn khác.',
    image: 'https://picsum.photos/id/1036/800/400',
    gallery: [
      'https://picsum.photos/id/1039/400/300',
      'https://picsum.photos/id/1019/400/300',
      'https://picsum.photos/id/1029/400/300',
      'https://picsum.photos/id/1033/400/300'
    ],
    price: '3.000.000₫',
    duration: '3 ngày 2 đêm',
    location: 'Đà Lạt, Lâm Đồng',
    groupSize: '10-20 người',
    rating: 4.7,
    reviewCount: 48,
    includes: [
      'Xe du lịch đời mới',
      'Khách sạn 3 sao',
      'Hướng dẫn viên',
      'Bữa ăn theo chương trình',
      'Vé tham quan',
      'Bảo hiểm du lịch'
    ],
    excludes: [
      'Đồ uống',
      'Chi phí cá nhân',
      'Tip cho hướng dẫn viên',
      'Các dịch vụ không đề cập trong chương trình'
    ],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'TP.HCM - ĐÀ LẠT - THAM QUAN THÀNH PHỐ',
        description: 'Khởi hành từ TP.HCM đi Đà Lạt. Đến nơi, tham quan Quảng trường Lâm Viên, Hồ Xuân Hương. Buổi tối tự do khám phá chợ đêm Đà Lạt.'
      },
      {
        day: 'Ngày 2',
        title: 'KHÁM PHÁ VÙNG NGOẠI Ô ĐÀ LẠT',
        description: 'Tham quan Đồi Chè Cầu Đất, Thác Datanla, Thiền Viện Trúc Lâm. Trải nghiệm cáp treo ngắm cảnh toàn thành phố.'
      },
      {
        day: 'Ngày 3',
        title: 'ĐÀ LẠT - TRỞ VỀ TP.HCM',
        description: 'Tham quan vườn hoa thành phố, mua sắm đặc sản. Khởi hành về TP.HCM. Kết thúc chương trình.'
      }
    ]
  },
  {
    id: 2,
    name: 'Tour Phú Quốc nghỉ dưỡng',
    description: 'Tour Phú Quốc 4 ngày 3 đêm sẽ mang đến cho bạn những trải nghiệm tuyệt vời tại hòn đảo ngọc xinh đẹp. Tham quan Bãi Sao với cát trắng mịn, tắm biển tại những bãi biển đẹp nhất Việt Nam và khám phá Vinpearl Safari - vườn thú bán hoang dã đầu tiên của Việt Nam.',
    image: 'https://picsum.photos/id/1043/800/400',
    gallery: [
      'https://picsum.photos/id/1040/400/300',
      'https://picsum.photos/id/1044/400/300',
      'https://picsum.photos/id/1045/400/300',
      'https://picsum.photos/id/1050/400/300'
    ],
    price: '4.500.000₫',
    duration: '4 ngày 3 đêm',
    location: 'Phú Quốc, Kiên Giang',
    groupSize: '15-25 người',
    rating: 4.8,
    reviewCount: 64,
    includes: [
      'Vé máy bay khứ hồi',
      'Resort 4 sao',
      'Hướng dẫn viên',
      'Bữa ăn theo chương trình',
      'Vé tham quan',
      'Bảo hiểm du lịch'
    ],
    excludes: [
      'Đồ uống',
      'Chi phí cá nhân',
      'Tip cho hướng dẫn viên',
      'Các dịch vụ không đề cập trong chương trình'
    ],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'TP.HCM - PHÚ QUỐC',
        description: 'Bay từ TP.HCM đến Phú Quốc. Nhận phòng resort. Tự do tắm biển và nghỉ ngơi.'
      },
      {
        day: 'Ngày 2',
        title: 'KHÁM PHÁ NAM ĐẢO',
        description: 'Tham quan cơ sở sản xuất nước mắm, rượu sim. Khám phá Bãi Sao, nhà tù Phú Quốc.'
      },
      {
        day: 'Ngày 3',
        title: 'VINPEARL SAFARI - GRAND WORLD',
        description: 'Khám phá Vinpearl Safari. Buổi tối tham quan Grand World với show diễn Nụ Hôn Của Biển Cả.'
      },
      {
        day: 'Ngày 4',
        title: 'PHÚ QUỐC - TP.HCM',
        description: 'Tự do tham quan, mua sắm. Trả phòng và ra sân bay. Kết thúc chương trình.'
      }
    ]
  },
  {
    id: 3,
    name: 'Trải nghiệm Hà Giang',
    description: 'Hành trình khám phá Hà Giang 5 ngày 4 đêm sẽ đưa bạn chinh phục những cung đường đèo huyền thoại, thưởng ngoạn cảnh đẹp ngoạn mục của cao nguyên đá Đồng Văn và giao lưu với đồng bào dân tộc thiểu số nơi vùng cao.',
    image: 'https://picsum.photos/id/1015/800/400',
    gallery: [
      'https://picsum.photos/id/1018/400/300',
      'https://picsum.photos/id/1025/400/300',
      'https://picsum.photos/id/1016/400/300',
      'https://picsum.photos/id/1023/400/300'
    ],
    price: '5.200.000₫',
    duration: '5 ngày 4 đêm',
    location: 'Hà Giang',
    groupSize: '10-15 người',
    rating: 4.9,
    reviewCount: 75,
    includes: [
      'Xe du lịch đời mới',
      'Khách sạn 3 sao',
      'Hướng dẫn viên',
      'Bữa ăn theo chương trình',
      'Vé tham quan',
      'Bảo hiểm du lịch'
    ],
    excludes: [
      'Đồ uống',
      'Chi phí cá nhân',
      'Tip cho hướng dẫn viên',
      'Các dịch vụ không đề cập trong chương trình'
    ],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'HÀ NỘI - HÀ GIANG',
        description: 'Khởi hành từ Hà Nội đi Hà Giang. Nghỉ đêm tại thành phố Hà Giang.'
      },
      {
        day: 'Ngày 2',
        title: 'HÀ GIANG - QUẢN BẠ - YÊN MINH - ĐỒNG VĂN',
        description: 'Chinh phục đèo Mã Pí Lèng, thăm Cổng Trời Quản Bạ, Phố cổ Đồng Văn.'
      },
      {
        day: 'Ngày 3',
        title: 'ĐỒNG VĂN - LŨNG CÚ - MÈO VẠC',
        description: 'Tham quan Cột cờ Lũng Cú, Dinh thự họ Vương, Đèo Mã Pí Lèng, Sông Nho Quế.'
      },
      {
        day: 'Ngày 4',
        title: 'MÈO VẠC - DU GIÀNG - HÀ GIANG',
        description: 'Khám phá chợ phiên Du Giàng. Di chuyển về thành phố Hà Giang.'
      },
      {
        day: 'Ngày 5',
        title: 'HÀ GIANG - HÀ NỘI',
        description: 'Tham quan làng văn hóa dân tộc. Khởi hành về Hà Nội. Kết thúc chương trình.'
      }
    ]
  }
];

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

const TourDetailContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.base};
`;

const TourHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TourTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.base};
  color: ${({ theme }) => theme.colors.text};
`;

const TourLocation = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const TourRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  span {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: bold;
  }
  
  svg {
    color: #FFD700;
  }
`;

const TourImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TourGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const TourContent = styled.div``;

const TourSidebar = styled.div``;

const TourDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TourInfoCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TourPrice = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.base};
`;

const BookingButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.base};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const TourInfoList = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TourInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  gap: ${({ theme }) => theme.spacing.sm};
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    min-width: 18px;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.base};
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 50px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TourGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.spacing.base};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ItineraryItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.base};
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItineraryDay = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ItineraryTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ItineraryDescription = styled.p`
  line-height: 1.6;
`;

const ListSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ListTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.base};
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ExcludeItem = styled.li`
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  &:before {
    content: '✕';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.error};
  }
`;

const TourDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchTour = () => {
      setLoading(true);
      
      if (!id) {
        navigate('/tours');
        return;
      }

      const foundTour = mockTours.find(t => t.id === parseInt(id));
      
      if (foundTour) {
        setTour(foundTour);
      } else {
        navigate('/tours');
      }
      
      setLoading(false);
    };

    fetchTour();
  }, [id, navigate]);

  if (loading || !tour) {
    return (
      <MainLayout>
        <Wrapper>
          <TourDetailContainer>
            <div>Đang tải...</div>
          </TourDetailContainer>
        </Wrapper>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Wrapper>
        <TourDetailContainer>
          <TourHeader>
            <TourTitle>{tour.name}</TourTitle>
            
            <TourLocation>
              <FaMapMarkerAlt /> {tour.location}
            </TourLocation>
            
            <TourRating>
              <FaStar /> <span>{tour.rating}</span> ({tour.reviewCount} đánh giá)
            </TourRating>
          </TourHeader>
          
          <TourImage src={tour.image} alt={tour.name} />
          
          <TourGrid>
            <TourContent>
              <TourDescription>{tour.description}</TourDescription>
              
              <SectionTitle>Hình ảnh</SectionTitle>
              <TourGallery>
                {tour.gallery.map((img: string, index: number) => (
                  <GalleryImage key={index} src={img} alt={`Gallery ${index + 1}`} />
                ))}
              </TourGallery>
              
              <SectionTitle>Lịch trình</SectionTitle>
              {tour.itinerary.map((item: any, index: number) => (
                <ItineraryItem key={index}>
                  <ItineraryDay>{item.day}</ItineraryDay>
                  <ItineraryTitle>{item.title}</ItineraryTitle>
                  <ItineraryDescription>{item.description}</ItineraryDescription>
                </ItineraryItem>
              ))}
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <ListSection>
                  <ListTitle>Bao gồm</ListTitle>
                  <List>
                    {tour.includes.map((item: string, index: number) => (
                      <ListItem key={index}>{item}</ListItem>
                    ))}
                  </List>
                </ListSection>
                
                <ListSection>
                  <ListTitle>Không bao gồm</ListTitle>
                  <List>
                    {tour.excludes.map((item: string, index: number) => (
                      <ExcludeItem key={index}>{item}</ExcludeItem>
                    ))}
                  </List>
                </ListSection>
              </div>
            </TourContent>
            
            <TourSidebar>
              <TourInfoCard>
                <TourPrice>{tour.price}</TourPrice>
                
                <TourInfoList>
                  <TourInfoItem>
                    <FaClock /> <span>Thời gian: {tour.duration}</span>
                  </TourInfoItem>
                  <TourInfoItem>
                    <FaMapMarkerAlt /> <span>Điểm đến: {tour.location}</span>
                  </TourInfoItem>
                  <TourInfoItem>
                    <FaUsers /> <span>Số người: {tour.groupSize}</span>
                  </TourInfoItem>
                  <TourInfoItem>
                    <FaCalendarAlt /> <span>Khởi hành: Hàng ngày</span>
                  </TourInfoItem>
                </TourInfoList>
                
                <BookingButton>Đặt tour ngay</BookingButton>
              </TourInfoCard>
            </TourSidebar>
          </TourGrid>
        </TourDetailContainer>
      </Wrapper>
    </MainLayout>
  );
};

export default TourDetail; 