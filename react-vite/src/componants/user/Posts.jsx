import { useEffect, useState } from "react";
import "./Posts.scss";
import Loader from "../Loader/Loader";
import { ServiceUrl } from "../Helpers/Help";
import { Link } from "react-router-dom";

export default function Posts() {
  const [loading, setLoading] = useState(true);
  const [postView, setPOstView] = useState([]);
  const [likes, setLikes] = useState(0)
  // const [comments, setComments] = useState("")
  const token = localStorage.getItem("token");
  // const navigator = useNavigate()

  const mainUrl = ServiceUrl();

  useEffect(() => {
    setLoading(true);

    const fetchingPosts = async () => {
      const endpoint = mainUrl + "post/user/posts";

      await fetch(endpoint, {
        method: "get",
        headers: { "Content-Type": "application/json", header_kn: token },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setPOstView(data.findPost);
            setLikes(data.likes)
            setLoading(false);
          } else {
            alert(data.message);
          }
        });
    };
    return () => fetchingPosts();

  }, []);

  const mapping = postView.map((post, p) => {
   

    return (
      <>
        <div key={p}>
      <Link to={`/post/${post._id}`}>
        <div className="post">
          <h4 className="heading">{post.postHeading}<span style={{float : "right", color : "#908E9B"}}>{post.postTime}</span></h4>
          <hr />
          <p>{post.postText}</p>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            >
            <div>
              <button
                style={{
                  marginRight: "10px",
                  border: "none",
                  padding: "8px",
                  borderRadius: "5px",
                  background: "rgb(128 232 245)",
                }}
                className="btn-edit"
              >
                Likes
              </button>
              <button
                style={{
                  border: "none",
                  padding: "8px",
                  borderRadius: "5px",
                  background: "rgb(128 232 245)",
                }}
                className="btn-delete"
              >
                Comments
              </button>
              <p>{likes} people liked post <span style={{marginLeft : "15px"}}> {""} comments </span></p> 
            </div>
            <div>
            </div>
          </div>
        </div>
    </Link>
      </div>
      </>
    );
  });

  return (
    <>
      <div className="container-posts">
        <div className="box">
          <h1 className="main-heading">Personal Posts</h1>
          <hr />
          <br />
          {loading ? <Loader /> : mapping}
        </div>
      </div>
    </>
  );
}
