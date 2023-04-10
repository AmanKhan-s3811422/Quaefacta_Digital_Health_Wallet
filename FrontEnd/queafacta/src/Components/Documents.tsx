import { Container, Stack } from "react-bootstrap";
import { Link} from "react-router-dom";
import { Plus } from "react-bootstrap-icons";


export default function Documents(props: any) {

    return (
        <>
            <h3 className="text-center py-4">Tap on a document to view</h3>
            <Container>
              <div className="max-width">
                <Stack gap={3}>
                  <div className="d-flex align-items-center justify-content-between text-center border border-dark rounded-3 py-1">
                    <h6 className="px-3">Proof of vaccinations.pdf</h6>
                    <div className="px-3">06/10/2022 10:00pm</div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between text-center border border-dark rounded-3 py-1">
                    <h6 className="px-3">Proof of vaccinations.pdf</h6>
                    <div className="px-3">06/10/2022 10:00pm</div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between text-center border border-dark rounded-3 py-1">
                    <h6 className="px-3">Proof of vaccinations.pdf</h6>
                    <div className="px-3">06/10/2022 10:00pm</div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between text-center border border-dark rounded-3 py-1">
                    <h6 className="px-3">Proof of vaccinations.pdf</h6>
                    <div className="px-3">06/10/2022 10:00pm</div>
                  </div>
                </Stack>
              </div>
            </Container>
            <div className="d-flex justify-content-end max-width">
              <Link to="/documentupload" className="btn btn-info rounded-pill p-1 text-white float-end mt-4"><Plus size={50} /></Link>
            </div>
        </>
    )
}