import { Navbar, Wrapper } from "../components";


const Layout: React.FC = ({ children }) => {
	return (
		<>
			<Navbar />
			<Wrapper>
				{children}
			</Wrapper>
		</>
	);
}

export default Layout;