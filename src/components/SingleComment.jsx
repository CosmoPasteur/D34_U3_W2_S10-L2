import { Button, ListGroupItem } from "react-bootstrap";

const SingleComment = ({ review, fetchComments }) => {
  const handleDelete = () => {
    fetch("https://striveschool-api.herokuapp.com/api/comments/" + review._id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E0ZGUxYmNhMDcwNDAwMTU4YmY5NzkiLCJpYXQiOjE3Mzg4NTgwMTEsImV4cCI6MTc0MDA2NzYxMX0.KY1i3aAaFytdpVHLectYt_unBT7ZsLQJtlf6z-iXCXg",
      },
    }).then((resp) => {
      if (resp.ok) {
        fetchComments();
      }
    });
  };

  return (
    <ListGroupItem className="d-flex justify-content-between">
      <span>{review.comment}</span> <span>{review.rate}</span>
      <Button
        variant="danger"
        onClick={() => {
          handleDelete();
        }}
      >
        🗑️
      </Button>
    </ListGroupItem>
  );
};

export default SingleComment;
