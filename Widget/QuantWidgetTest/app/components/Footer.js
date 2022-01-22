
import footerLogo from '../assets/img/quant-footer.png';
import '../assets/css/App.css';
export default function Footer() {
    return React.createElement(
        'footer',
        { className: 'footer' },
        React.createElement('img', { src: footerLogo, style: { height: "100%", width: "100%" } })
    );
}