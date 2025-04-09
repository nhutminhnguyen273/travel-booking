import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaStar } from 'react-icons/fa';
import MainLayout from '../../components/layout/MainLayout';

// Using the same mock data from TourDetail.tsx
const mockTours = [
  {
    id: 1,
    name: 'Khám phá Đà Lạt 3N2Đ',
    description: 'Tour du lịch Đà Lạt 3 ngày 2 đêm sẽ đưa bạn đến với thành phố ngàn hoa lãng mạn.',
    image: 'https://picsum.photos/id/1036/800/400',
    price: '3.000.000₫',
    duration: '3 ngày 2 đêm',
    location: 'Đà Lạt, Lâm Đồng',
    rating: 4.7,
    reviewCount: 48,
  },
  {
    id: 2,
    name: 'Tour Phú Quốc nghỉ dưỡng',
    description: 'Tour Phú Quốc 4 ngày 3 đêm sẽ mang đến cho bạn những trải nghiệm tuyệt vời tại hòn đảo ngọc.',
    image: 'https://picsum.photos/id/1043/800/400',
    price: '4.500.000₫',
    duration: '4 ngày 3 đêm',
    location: 'Phú Quốc, Kiên Giang',
    rating: 4.8,
    reviewCount: 64,
  },
  {
    id: 3,
    name: 'Trải nghiệm Hà Giang',
    description: 'Hành trình khám phá Hà Giang 5 ngày 4 đêm sẽ đưa bạn chinh phục những cung đường đèo huyền thoại.',
    image: 'https://picsum.photos/id/1015/800/400',
    price: '5.200.000₫',
    duration: '5 ngày 4 đêm',
    location: 'Hà Giang',
    rating: 4.9,
    reviewCount: 75,
  },
  {
    id: 4,
    name: 'Vịnh Hạ Long 2N1Đ',
    description: 'Khám phá kỳ quan thiên nhiên thế giới Vịnh Hạ Long với hành trình 2 ngày 1 đêm trên du thuyền.',
    image: 'https://picsum.photos/id/1053/800/400',
    price: '2.500.000₫',
    duration: '2 ngày 1 đêm',
    location: 'Hạ Long, Quảng Ninh',
    rating: 4.6,
    reviewCount: 92,
  },
  {
    id: 5,
    name: 'Sapa - Fansipan 3N2Đ',
    description: 'Chinh phục "Nóc nhà Đông Dương" và khám phá vẻ đẹp của Sapa với hành trình 3 ngày 2 đêm.',
    image: 'https://picsum.photos/id/1016/800/400',
    price: '3.800.000₫',
    duration: '3 ngày 2 đêm',
    location: 'Sapa, Lào Cai',
    rating: 4.7,
    reviewCount: 61,
  },
  {
    id: 6,
    name: 'Huế - Đà Nẵng - Hội An 4N3Đ',
    description: 'Hành trình khám phá 3 thành phố đẹp nhất miền Trung Việt Nam.',
    image: 'https://picsum.photos/id/1059/800/400',
    price: '4.200.000₫',
    duration: '4 ngày 3 đêm',
    location: 'Đà Nẵng, Huế, Hội An',
    rating: 4.8,
    reviewCount: 87,
  },
];

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

const ToursContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.base};
`;

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const FiltersContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FilterGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.base};
`;

const FilterLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 500;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FilterButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  font-weight: 500;
  margin-top: ${({ theme }) => theme.spacing.base};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const ToursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const TourCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const TourImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const TourContent = styled.div`
  padding: ${({ theme }) => theme.spacing.base};
`;

const TourTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const TourInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TourDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.sm} 0;
  line-height: 1.5;
`;

const TourFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const TourPrice = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const ViewButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.base};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: inline-block;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

const TourRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  
  span {
    color: ${({ theme }) => theme.colors.text};
  }
  
  svg {
    color: #FFD700;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.muted};
`;

const Tours: React.FC = () => {
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [filteredTours, setFilteredTours] = useState(mockTours);

  const handleFilter = () => {
    let result = [...mockTours];
    
    if (location) {
      result = result.filter(tour => tour.location.includes(location));
    }
    
    if (duration) {
      result = result.filter(tour => tour.duration.includes(duration));
    }
    
    if (priceRange) {
      switch(priceRange) {
        case 'under3':
          result = result.filter(tour => {
            const price = parseInt(tour.price.replace(/\D/g, ''));
            return price < 3000000;
          });
          break;
        case '3to5':
          result = result.filter(tour => {
            const price = parseInt(tour.price.replace(/\D/g, ''));
            return price >= 3000000 && price <= 5000000;
          });
          break;
        case 'over5':
          result = result.filter(tour => {
            const price = parseInt(tour.price.replace(/\D/g, ''));
            return price > 5000000;
          });
          break;
        default:
          break;
      }
    }
    
    setFilteredTours(result);
  };

  const resetFilters = () => {
    setLocation('');
    setDuration('');
    setPriceRange('');
    setFilteredTours(mockTours);
  };

  return (
    <MainLayout>
      <Wrapper>
        <ToursContainer>
          <PageTitle>Khám phá các tour du lịch</PageTitle>
          
          <FiltersContainer>
            <FilterGrid>
              <FilterGroup>
                <FilterLabel htmlFor="location">Điểm đến</FilterLabel>
                <FilterSelect 
                  id="location" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Tất cả địa điểm</option>
                  <option value="Đà Lạt">Đà Lạt</option>
                  <option value="Phú Quốc">Phú Quốc</option>
                  <option value="Hà Giang">Hà Giang</option>
                  <option value="Hạ Long">Hạ Long</option>
                  <option value="Sapa">Sapa</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                </FilterSelect>
              </FilterGroup>
              
              <FilterGroup>
                <FilterLabel htmlFor="duration">Thời gian</FilterLabel>
                <FilterSelect 
                  id="duration" 
                  value={duration} 
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="">Tất cả thời gian</option>
                  <option value="2 ngày">2 ngày</option>
                  <option value="3 ngày">3 ngày</option>
                  <option value="4 ngày">4 ngày</option>
                  <option value="5 ngày">5 ngày</option>
                </FilterSelect>
              </FilterGroup>
              
              <FilterGroup>
                <FilterLabel htmlFor="price">Giá tour</FilterLabel>
                <FilterSelect 
                  id="price" 
                  value={priceRange} 
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">Tất cả mức giá</option>
                  <option value="under3">Dưới 3 triệu</option>
                  <option value="3to5">3 - 5 triệu</option>
                  <option value="over5">Trên 5 triệu</option>
                </FilterSelect>
              </FilterGroup>
            </FilterGrid>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <FilterButton onClick={handleFilter}>Tìm tour</FilterButton>
              <FilterButton onClick={resetFilters} style={{ background: '#666' }}>Xóa bộ lọc</FilterButton>
            </div>
          </FiltersContainer>
          
          {filteredTours.length > 0 ? (
            <ToursGrid>
              {filteredTours.map(tour => (
                <TourCard key={tour.id}>
                  <TourImage src={tour.image} alt={tour.name} />
                  <TourContent>
                    <TourTitle>
                      <Link to={`/tour/${tour.id}`}>{tour.name}</Link>
                    </TourTitle>
                    
                    <TourInfo>
                      <FaMapMarkerAlt /> {tour.location}
                    </TourInfo>
                    
                    <TourInfo>
                      <FaCalendarAlt /> {tour.duration}
                    </TourInfo>
                    
                    <TourRating>
                      <FaStar /> <span>{tour.rating} ({tour.reviewCount} đánh giá)</span>
                    </TourRating>
                    
                    <TourDescription>{tour.description}</TourDescription>
                    
                    <TourFooter>
                      <TourPrice>{tour.price}</TourPrice>
                      <ViewButton to={`/tour/${tour.id}`}>Xem chi tiết</ViewButton>
                    </TourFooter>
                  </TourContent>
                </TourCard>
              ))}
            </ToursGrid>
          ) : (
            <EmptyState>
              <h3>Không tìm thấy tour du lịch phù hợp.</h3>
              <p>Vui lòng thử lại với các bộ lọc khác.</p>
            </EmptyState>
          )}
        </ToursContainer>
      </Wrapper>
    </MainLayout>
  );
};

export default Tours; 