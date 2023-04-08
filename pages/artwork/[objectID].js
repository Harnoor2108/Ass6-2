import { useRouter } from "next/router";
import { Col, Row, Pagination } from 'react-bootstrap';
import ArtworkCardDetail from "@/components/ArtworkCardDetail";


export default function Object() {
    const router = useRouter();
    const {objectID} = router.query;

    return (
        <Row>
    <Col>
        <ArtworkCardDetail objectID={objectID} />
    </Col>
    </Row>
    )
}