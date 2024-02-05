import React, { useState, useEffect, useRef } from "react";

export default function DescriptionFetch() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
    });

    if (observeTarget) {
      resizeObserver.observe(observeTarget);
    }

    return () => {
      if (observeTarget) {
        resizeObserver.unobserve(observeTarget);
      }
    };
  }, [ref]);

  return (
    <>
      <section className="w-2/3 m-2">
        <div>
          <div className="bg-[#141417]/40 w-[200px] rounded-tr-[8px]">
            <div
              className="bg-[#6c81b6]/40 p-2 rounded-tr-[8px] -translate-y-[10px] translate-x-[10px] h-[70px] overflow-hidden hover:h-full duration-300"
              ref={ref}
            >
              <h2 className="text-white text-xl">Titre</h2>
              <p className="text-white text-[11px]">
                Description Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Modi, voluptatem! Dolor officia sunt fugiat sapiente
                deserunt, repudiandae officiis qui commodi eligendi accusantium
                nemo et natus modi aliquam quo ad labore. elit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
