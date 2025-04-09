import React from 'react';
import styled, { useTheme } from 'styled-components';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  background: ${(props) => props.theme.colors.background};
  min-height: 100vh;
`;

const Heading = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.xl};
  font-family: ${(props) => props.theme.fonts.heading};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const TableWrapper = styled.div`
  background: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.md};
  box-shadow: ${(props) => props.theme.shadows.sm};
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: ${(props) => props.theme.spacing.sm};
    text-align: left;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
  }

  th {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-weight: bold;
  }

  td {
    color: ${(props) => props.theme.colors.text};
  }
`;

const ActionButton = styled.button<{ color: string }>`
  background: ${(props) => props.color};
  color: white;
  border: none;
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  cursor: pointer;
  margin-right: ${(props) => props.theme.spacing.xs};

  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    opacity: 0.9;
  }
`;

const AddButton = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.base};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  cursor: pointer;
  font-weight: bold;
  margin-bottom: ${(props) => props.theme.spacing.lg};

  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    opacity: 0.95;
  }
`;

const TourManagement: React.FC = () => {
  const theme = useTheme();

  // Mock data
  const tours = [
    { id: 1, name: 'Tour Đà Nẵng', date: '2025-05-10', price: '5,000,000₫' },
    { id: 2, name: 'Tour Sa Pa', date: '2025-06-15', price: '4,500,000₫' },
    { id: 3, name: 'Tour Côn Đảo', date: '2025-07-20', price: '6,000,000₫' },
  ];

  return (
    <Wrapper>
      <Heading>Quản Lý Tour</Heading>

      <AddButton>
        <FaPlus /> Thêm Tour Mới
      </AddButton>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên Tour</th>
              <th>Ngày Khởi Hành</th>
              <th>Giá</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour, index) => (
              <tr key={tour.id}>
                <td>{index + 1}</td>
                <td>{tour.name}</td>
                <td>{tour.date}</td>
                <td>{tour.price}</td>
                <td>
                  <ActionButton color={theme.colors.secondary}>
                    <FaEdit /> Sửa
                  </ActionButton>
                  <ActionButton color={theme.colors.error}>
                    <FaTrash /> Xoá
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Wrapper>
  );
};

export default TourManagement;