import { useEffect } from "react";
import { ArrowUp } from 'react-bootstrap-icons';

export default function Footer(props: any) {

    const scrollTop: any = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        scrollDisplay()
        window.addEventListener('scroll', (e) => {
            scrollDisplay()
        })
    })

    function scrollDisplay() {
        const scrollBtn:any = document.getElementById('scrollBtn')
        if (window.scrollY > 50) {
            scrollBtn.style.display = "block"
        } else {
            scrollBtn.style.display = "none"
        }
    }

    return (
        <footer id="footer" className="nav-vertical">
                <button className={'btn btn-dark ms-auto '} id="scrollBtn" onClick={scrollTop}>
                    <ArrowUp />
                </button>
        </footer>
    )
}