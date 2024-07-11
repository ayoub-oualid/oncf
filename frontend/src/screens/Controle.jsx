import { Card } from 'react-bootstrap';
import EngineForm from "../components/EngineForm";



const Controle = () => {
    return (
        <div className="d-flex justify-content-center align-items-start vh-100">
            <Card className="col-md-6 p-4">
                <EngineForm />
            </Card>
        </div>
    );
};


export default Controle;