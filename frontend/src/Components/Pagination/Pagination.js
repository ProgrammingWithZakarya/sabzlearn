import React, { useEffect, useState } from "react";

import "./Pagination.css";
import { useParams } from "react-router-dom";
import Button from "../Form/Button";

export default function Pagination({ items, itemsCount, pathname, setShownCourses }) {
  const [pageCount, setPageCount] = useState(null)
  const { page } = useParams()
  useEffect(() => {
    let endIndex = itemsCount * page
    let startIndex = endIndex - itemsCount
    let paginatedItems = items.slice(startIndex, endIndex)
    setShownCourses(paginatedItems)
    let pagesNumber = Math.ceil(items.length / itemsCount)
    setPageCount(pagesNumber)
  }, [page, items])
  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">
        {(pageCount === 0) && (
          <>
            {Array(5).fill(0).map((page, index) => (
              <>
                <li key={index} className="courses__pagination-item">
                  <Button to={`/courses/${index + 1}`} className="courses__pagination-link">
                    {index + 1}
                  </Button>
                </li>
              </>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}
