import React, { useState, useEffect } from "react";
import "./DummyList.css";
import {
  fetchBusinessDetailsData,
  fetchPlatformLogs,
} from "../../services/api";
import AddName from "../AddName/addName";

const DummyList = ({ onSelectInteraction, onSelectBusinessId }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  // const [items, setItems] = useState([]);
  const [businessData, setBusinessData] = useState([])
  const [platFormData, setPlatFormData] = useState([]);

  // console.log(interactionLogs, "response");

  // const defaultItems = [
  //   {
  //     title: "Site 1",
  //     links: [],
  //   },
  //   {
  //     title: "Site 2",
  //     links: ["Chat 1", "Chat 2", "Chat 3"],
  //   },
  //   {
  //     title: "Site 3",
  //     links: ["Chat 1", "Chat 2", "Chat 3"],
  //   },
  //   {
  //     title: "Site 4",
  //     links: ["Chat 1", "Chat 2", "Chat 3"],
  //   },
  //   {
  //     title: "Site 5",
  //     links: ["Chat 1", "Chat 2", "Chat 3"],
  //   },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBusinessDetailsData();
        setBusinessData(response);
      } catch (error) {
        console.error("Error fetching Business data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPlatformLogs();
        setPlatFormData(response);
      } catch (error) {
        console.error("Error fetching Business data:", error);
      }
    };
    fetchData();
  }, []);

  const handleItemClick = async (index,id) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      return;
    }
    setActiveIndex(index);
    onSelectBusinessId(id)
  };

  const handleLinkClick = (log, e) => {
    e.preventDefault()
    onSelectInteraction(log);
  };

  const handleNameSubmit = (name) => {
    const newItem = {
      name: name,
      // links: ["Chat 1", "Chat 2", "Chat 3"],
    };

    const updatedItems = [...businessData, newItem];
    setBusinessData(updatedItems);
  };

  return (
    <div className="dummy-list">
      <div className="container">
        <div className="listStyle">
          {businessData.length === 0 ? (
            <>
              <p style={{ color: "black" }}>Loading . . .</p>
            </>
          ) : (
            <>
              {businessData.map((item, index) => (
                <div key={index} className="dummy-item-container">
                  <button
                    className="dummy-item"
                    onClick={() => handleItemClick(index, item.id)}
                  >
                    {item.name}
                  </button>
                  {activeIndex === index && (
                    <div className={`sub-links ${activeIndex === index ? 'expanded' : ''}`}>
                      {(() => {
                        return platFormData.map((log, logIndex) => (
                          <a
                            key={logIndex}
                            href={`/rep-chat?interactionLogId=${log.id}`}
                            className="sub-link"
                            onClick={(e) => handleLinkClick(log,e)}
                          >
                            {log.name}{" "}
                          </a>
                        ));
                      })()}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
        <AddName onSubmitName={handleNameSubmit} />
      </div>
    </div>
  );
};

export default DummyList;
