import React from 'react';
import { Header } from './';

const Layout:React.FC<React.ReactNode> = ({ children }) => (
		<>
		<Header />
		{children}
		</>
	)

export default Layout;