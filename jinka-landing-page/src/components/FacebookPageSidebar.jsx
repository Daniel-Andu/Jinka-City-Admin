"use client";

import { useEffect, useState } from "react";


const FACEBOOK_PAGE_URL = "https://web.facebook.com/profile.php?id=100093178223991";

export default function FacebookPageSidebar() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (hidden) {
      return undefined;
    }

    const parsePlugin = () => {
      if (typeof window !== "undefined" && window.FB && window.FB.XFBML) {
        window.FB.XFBML.parse();
        return true;
      }
      return false;
    };

    if (parsePlugin()) {
      return undefined;
    }

    const poll = setInterval(() => {
      if (parsePlugin()) {
        clearInterval(poll);
      }
    }, 1200);

    return () => clearInterval(poll);
  }, [hidden]);

  return (
    <section className="fb-inline-widget" aria-label="Facebook page plugin">
      {hidden ? (
        <button type="button" className="fb-toggle-btn" onClick={() => setHidden(false)}>
          Show Facebook Feed
        </button>
      ) : (
        <>
          <div className="fb-widget-header">
            <strong>Facebook Updates</strong>
            <button type="button" className="fb-toggle-btn" onClick={() => setHidden(true)}>
              Hide
            </button>
          </div>
          <div
            className="fb-page"
            data-href={FACEBOOK_PAGE_URL}
            data-tabs="timeline"
            data-width="350"
            data-height="500"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote cite={FACEBOOK_PAGE_URL} className="fb-xfbml-parse-ignore">
              <a href={FACEBOOK_PAGE_URL}>
                በጂንካ ከተማ መንግሥት ኮሙንኬሽን ጉዳዮች ጽ/ቤት
              </a>
            </blockquote>
          </div>
        </>
      )}

      <style>{`
        .fb-inline-widget {
          max-width: 1440px;
          margin: 1.25rem auto 2rem;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .fb-widget-header {
          width: 350px;
          max-width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border-radius: 10px;
          box-shadow: 0 6px 20px rgba(26, 58, 107, 0.15);
          padding: 10px 12px;
          border: 1px solid #e2e8f0;
        }

        .fb-toggle-btn {
          background: #1a3a6b;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.45rem 0.8rem;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }

        .fb-toggle-btn:hover {
          background: #12305a;
        }

        @media (max-width: 700px) {
          .fb-inline-widget {
            padding: 0 1rem;
          }
        }
      `}</style>
    </section>
  );
}
