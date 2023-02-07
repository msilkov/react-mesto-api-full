import { Switch, Route, Link } from "react-router-dom";
import logo from "../images/logo/logo.svg";

export default function Header(props) {
	return (
		<header className="header section section_size_narrow page__header">
			<a href="/" className="logo">
				<img src={logo} alt="Место - Россия" className="logo__icon" />
			</a>
			<div className="header__auth">
				<Switch>
					<Route path="/sign-in">
						<Link to="/sign-up" className="header__auth-link">
							Регистрация
						</Link>
					</Route>
					<Route path="/sign-up">
						<Link to="/sign-in" className="header__auth-link">
							Войти
						</Link>
					</Route>
					<Route path="/">
						<p className="header__auth-email">{props.userEmail}</p>
						<Link
							to="/sign-in"
							className="header__auth-link header__auth-link_active"
							onClick={props.onLogout}
						>
							Выйти
						</Link>
					</Route>
				</Switch>
			</div>
		</header>
	);
}
