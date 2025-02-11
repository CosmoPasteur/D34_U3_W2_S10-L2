import { useCallback } from "react";
import { Badge, Card, Col } from "react-bootstrap";
// import CommentArea from "./CommentArea";

const SingleBook = ({ book, selectedBookAsin, changeBookSelected }) => {
  const checkSelected = useCallback(
    () => (book.asin === selectedBookAsin ? "border-danger" : ""),
    [book, selectedBookAsin]
  );

  return (
    <Col>
      <Card className={checkSelected()}>
        <Card.Img
          variant="top"
          src={book.img}
          onClick={() => {
            changeBookSelected(book);
          }}
        />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>{book.category}</Card.Text>
          <Card.Text>
            <Badge bg="info">€{book.price}</Badge>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleBook;
