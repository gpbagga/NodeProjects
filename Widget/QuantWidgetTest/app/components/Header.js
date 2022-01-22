import headerLogo from '../assets/img/quant-header.png';
import '../assets/css/App.css';

export default function Header() {
    return React.createElement(
        'header',
        { className: 'header' },
        React.createElement('img', { src: headerLogo, style: { height: "100%", width: "100%", top: "0px" } })
    );
}