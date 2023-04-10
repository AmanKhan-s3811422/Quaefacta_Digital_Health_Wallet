import { Link } from "react-router-dom";
import { Stack } from "react-bootstrap";

// Renders the home
export default function NewHere(props: any) {
    return (
        <>
            <div className="QF-Home-div">
                <Stack gap={4} className="QF-Home-div">
                    <img src="/logo512.png" alt="Quaefacta logo" className="QF-Icon-Big" />
                    <h2>Are you new here?</h2>
                    <p>
                        Manage your vaccinations and personal health information, for a lifetime
                        of good health.
                    </p>
                </Stack>
                <Stack gap={3}>
                    <Link className="btn btn-primary QF-Primary-Button" to="/signup">Create Account</Link>
                    <br/>
                    <p>Existing user?</p>
                    <Link className="btn btn-primary QF-Primary-Button-White" to="/signin">Log In</Link>
                </Stack>
            </div>
        </>
    );
}