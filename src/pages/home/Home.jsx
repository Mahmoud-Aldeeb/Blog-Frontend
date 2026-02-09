import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";

import Hero from "./Hero";
import Stats from "./Stats";
import Cta from "./Cta";
import PostList from "../../components/posts/PostList";
import ErrorBoundary from "./ErrorBoundary";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, [dispatch]);

  return (
    <>
      {/* SEO Meta Tags */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "StoryHub",
          description:
            "Join thousands of writers and readers in our vibrant community. Create, discover, and engage with amazing content every day.",
          url: window.location.origin,
          potentialAction: {
            "@type": "SearchAction",
            target: `${window.location.origin}/posts?search={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        })}
      </script>

      <div className="home-wrapper page-wrapper">
        <ErrorBoundary>
          {/* Hero Section */}
          <Hero />

          {/* Stats Section */}
          <Stats />

          {/* Posts List */}
          <div className="post-list">
            <PostList posts={posts} />
          </div>

          {/* CTA Section */}
          <Cta />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Home;
