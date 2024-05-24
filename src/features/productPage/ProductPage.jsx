import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../core/header/Header';
import './ProductPage.css';
import { ProductList } from '../productList/ProductList';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const ProductPage = () => {
  const { search } = useParams();
  const [filterTopics, setFilterTopics] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [averageVotes, setAverageVotes] = useState(0);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchTopics = async () => {
      const topicsSnapshot = await getDocs(collection(db, "topics"));
      const topics = topicsSnapshot.docs.map(doc => doc.data().name);
      setAvailableTopics(topics);
    };

    fetchTopics();
  }, []);

  const handleTopicChange = (topic) => {
    setFilterTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAverageVotes = (average) => {
    setAverageVotes(average)
  };

  return (
    <div>
      <header>
        <Header />
      </header>
      <div className='landing'>
        <div className="home-wrapper">
          <div className="welcome-banner">
            <h1>The best products in 2024</h1>
            <p>Tried, tested, and reviewed by the community</p>
          </div>
          <div className="filters">
            <div className="dropdown" ref={dropdownRef}>
              <button className="dropdown-button" onClick={toggleDropdown}>
                Filter by Topics
              </button>
              {dropdownOpen && (
                <div className="dropdown-content">
                  {availableTopics.map((topic, index) => (
                    <div key={index} className="dropdown-item">
                      <input
                        type="checkbox"
                        id={`topic-${index}`}
                        value={topic}
                        onChange={() => handleTopicChange(topic)}
                        checked={filterTopics.includes(topic)}
                      />
                      <label htmlFor={`topic-${index}`}>{topic}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="prom"><b>Average:</b> {averageVotes}</div>
          </div>
          <div className="top-products">
            <hr />
            <ProductList filterTopics={filterTopics} searchQuery={search} onAverageVotes={handleAverageVotes} />
          </div>
        </div>

        <div className='extra-info'>
          <span className='quick-link'>Blog • Newsletter • Questions • Categories •
            Apps • About • FAQ • Terms • Privacy and Cookies • Twitter • Facebook •
            Instagram • LinkedIn • YouTube • Advertise</span>
          <div className='brand-register'>© 2024 PRODUCT HUNT</div>
        </div>
      </div >
    </div >
  )
};