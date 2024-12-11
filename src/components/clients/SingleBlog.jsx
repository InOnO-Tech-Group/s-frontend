import React, { useEffect, useState } from "react";
import { clientViewBlog } from "../../redux/slices/blogSlice";
import { useParams } from "react-router-dom";
import { IoLogoTwitter, IoLogoWhatsapp } from "react-icons/io5";

function SingleBlog() {
  const [singleBlog, setSingleBlog] = useState([]);
  const { id } = useParams();
  const getSingleBlog = async () => {
    try {
      const response = await clientViewBlog(id);
      if (response.status === 200) {
        setSingleBlog(response.data);
        console.log("asas",response.data);
      } else {
        console.log(
          "error",
          response.message || "Error in getting announcement"
        );
      }
    } catch (error) {
      console.log("error", error.toString() || "Unknown error occurred");
    }
  };
  useEffect(() => {
    getSingleBlog(id);
  }, [id]);
  return (
    <section className="bg-gray-100 py-10 px-4 md:px-20">
      <h3>{singleBlog.title}</h3>
      <img
        src={singleBlog.coverImage}
        alt={singleBlog.title}
        className="w-full h-[50vh] object-cover mb-4 rounded-lg"
      />
      <div className="flex w-full items-center">
        <h3>
          {new Date(singleBlog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>
        <div className="flex ml-auto">
          <IoLogoWhatsapp className="text-3xl mx-1 shadow border p-1" />
          <IoLogoTwitter className="text-3xl mx-1 shadow border p-1" />
        </div>
      </div>
    </section>
  );
}

export default SingleBlog;
