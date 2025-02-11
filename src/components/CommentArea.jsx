import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import { Alert, Image, Spinner } from "react-bootstrap";

const CommentArea = (asin, imgSrc, title) => {
  // state = {
  //   reviews: [],
  //   fetched: false,
  // };

  const [reviews, setReviews] = useState("");
  const [fetched, setFetched] = useState(false);

  const fetchComments = async () => {
    const resp = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + asin, {
      method: "GET",
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2FhMGQwZGJiZTAwNDAwMTU5OWY0MzkiLCJpYXQiOjE3MzkxOTc3MDksImV4cCI6MTc0MDQwNzMwOX0.39x81mE2ZspUlGJJxZlu6FUf_FrXkJwRGXeWi7w58m8",
      },
    });

    if (resp.ok) {
      const reviews = await resp.json();
      console.log(reviews);

      //   this.setState({reviews: reviews})
      // this.setState({ reviews, fetched: true });
      setReviews(reviews);
      setFetched(true);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [asin]);

  // componentDidMount() {
  //   console.log("componentDidMount()");
  //   this.fetchComments();
  // }

  // componentDidUpdate(prevProps) {
  //   console.log(prevProps.asin);
  //   console.log(this.props.asin);
  //   if (prevProps.asin !== this.props.asin) {
  //     console.log("prop diversa, vai di fetch!");

  //     this.fetchComments();
  //   } else {
  //     console.log("prop uguale, STOP!");
  //   }
  // }

  console.log("RENDER COMMENT AREA", reviews);
  return (
    <div className="commentArea sticky-top">
      <Image fluid className="d-block w-75 mx-auto mb-4 img-fluid" src={imgSrc} />
      <h6>Recensioni per {title}</h6>
      {fetched ? (
        reviews.length > 0 ? (
          <CommentList reviews={reviews} fetchComments={fetchComments} />
        ) : (
          <Alert variant="info">Non ci sono ancora recensioni</Alert>
        )
      ) : (
        <Spinner animation="border" variant="info" />
      )}

      <AddComment asin={asin} fetchComments={fetchComments} />
    </div>
  );
};

export default CommentArea;
