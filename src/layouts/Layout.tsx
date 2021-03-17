import { Navbar, Wrapper } from "../components";
import { IWrapperVariantProps } from "../components/Wrapper";

const Layout: React.FC<IWrapperVariantProps> = ({ children, variant = 'medium' }) => {
	return (
		<>
			<Navbar />
			<Wrapper variant={variant}>
				{children}
			</Wrapper>
		</>
	);
}

export default Layout;