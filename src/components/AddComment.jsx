import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = ({ asin, fetchComments }) => {
  const [review, setReview] = useState({
    comment: "",
    rate: "",
    elementId: asin,
  });

  useEffect(() => setReview({ ...review, elementId: asin }), [asin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SUBMIT");

    const resp = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E0ZGUxYmNhMDcwNDAwMTU4YmY5NzkiLCJpYXQiOjE3Mzg4NTgwMTEsImV4cCI6MTc0MDA2NzYxMX0.KY1i3aAaFytdpVHLectYt_unBT7ZsLQJtlf6z-iXCXg",
      },
    });

    if (resp.ok) {
      fetchComments();
    }

    if (resp.ok) {
      alert("hai creato una nuova risorsa");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="comment">
        <Form.Label>Commento</Form.Label>
        <Form.Control
          type="text"
          placeholder="Scrivi la recensione"
          value={review.comment}
          onChange={(e) => setReview({ review: { ...review, comment: e.target.value } })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="rate">
        <Form.Label>Voto</Form.Label>
        <Form.Select
          aria-label="Default select example"
          value={review.rate}
          onChange={(e) => setReview({ review: { ...review, rate: e.target.value } })}
          required
        >
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
          <option value="5">Five</option>
        </Form.Select>
      </Form.Group>
      <Button type="submit" variant="success">
        Invia Recensione
      </Button>
    </Form>
  );
};
export default AddComment;
