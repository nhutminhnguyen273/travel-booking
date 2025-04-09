import React, {ReactNode} from "react";
import styled, {ThemeProvider} from "styled-components";
import theme from "../../config/theme";

interface AdminLayoutProps {
    children: ReactNode;
}

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Sidebar = styled.aside`
  width: 240px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Header = styled.header`
  height: 64px;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const Content = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};
`;

const NavItem = styled.div<{ active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) =>
    active ? '#fff' : theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }
`;

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <LayoutWrapper>
        <Sidebar>
          <h2 style={{ color: theme.colors.primary, fontFamily: theme.fonts.heading }}>
            Admin Panel
          </h2>
          <NavItem active>Dashboard</NavItem>
          <NavItem>Orders</NavItem>
          <NavItem>Tours</NavItem>
          <NavItem>Users</NavItem>
        </Sidebar>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header>
            <span>Trang quản trị</span>
            <button style={{ color: theme.colors.error, fontSize: theme.fontSizes.sm }}>
              Đăng xuất
            </button>
          </Header>
          <Content>{children}</Content>
        </div>
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default AdminLayout;