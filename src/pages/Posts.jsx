import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";

const Posts = () => {
  const [productName, setProductName] = useState("");
  const [productLink, setProductLink] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [posting, setPosting] = useState(null);
  const [error, setError] = useState(null);

  const createPost = async () => {
    try {
      const response = await axios.post(
        "https://2f8a-45-226-91-98.ngrok.io/post/postagem",
        {
          productName,
          productLink,
          productDescription,
        }
      );
      setPosting(response.data);
    } catch (error) {
      setError("Erro ao criar post");
      console.error("Erro ao criar post", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center", padding: "3rem 0" }}>
        <div
          style={{
            background: "#630a0a",
            padding: "30px 70px",
            borderRadius: "15px",
          }}
        >
          <h1
            style={{
              fontFamily: "Heebo",
              fontWeight: 800,
              textAlign: "center",
              color: "#fff",
              fontSize: "3rem",
              marginBottom: "5px",
            }}
          >
            Postar
          </h1>
          <div style={{ height: "2px", backgroundColor: "#000000" }}></div>

          <form style={{ marginTop: "25px" }} onSubmit={(e) => e.preventDefault()}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontSize: "1.2rem",
                  fontFamily: "Poppins",
                }}
              >
                Nome do Produto:
                <input
                  type="text"
                  name="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  style={{
                    width: "100%",
                    color: "#000000",
                    borderRadius: "10px",
                    border: "0",
                    outline: "0",
                    fontSize: "1.2rem",
                    paddingLeft: "15px",
                    height: "45px",
                  }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontSize: "1.2rem",
                  fontFamily: "Poppins",
                }}
              >
                Link do Produto:
                <input
                  type="text"
                  name="productLink"
                  value={productLink}
                  onChange={(e) => setProductLink(e.target.value)}
                  style={{
                    width: "100%",
                    color: "#000000",
                    borderRadius: "10px",
                    border: "0",
                    outline: "0",
                    fontSize: "1.2rem",
                    paddingLeft: "15px",
                    height: "45px",
                  }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontSize: "1.2rem",
                  color: "#000000",
                  fontFamily: "Poppins",
                }}
              >
                Descrição do Produto:
                <textarea
                  name="productDescription"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    border: "0",
                    outline: "0",
                    fontSize: "1.2rem",
                    paddingLeft: "15px",
                    height: "190px",
                    resize: "none",
                    paddingTop: "10px",
                  }}
                ></textarea>
              </label>
            </div>
            <div style={{ marginTop: "30px", textAlign: "center" }}>
              <button
                onClick={createPost}
                style={{
                  boxShadow: "0px 10px 40px #2b2727",
                  fontFamily: "Heebo",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  padding: "5px 50px",
                  color: "#fff",
                  backgroundColor: "#111111",
                  border: "0",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Criar Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Posts;
