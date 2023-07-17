"use client"
import "@/styles/Home/Row.css";
import React, { useEffect, useRef, useState } from 'react';
import { Card } from './Card';
import requests from '@/api/requests';
import serverInstance from '@/api/axios';

const Row = (props) => {
    const [cards, setCards] = useState([]);
    const [scrollInterval, setScrollInterval] = useState(null);
    const [scrollable, setScrollable] = useState({right:true, left:false});
    const rowCardsRef = useRef(null);

    const startScrollLeft = () => {
        // Start scrolling left
        if (!scrollInterval) {
            setScrollInterval(setInterval(() => {
                if (rowCardsRef.current) {
                    isScrollable();
                    rowCardsRef.current.scrollLeft -= 5; // You can adjust the scroll distance as needed
                }
                
            }, 10)); // Adjust the scroll speed (lower interval for faster scrolling)
        }
    };

    const startScrollRight = () => {
        // Start scrolling right
        if (!scrollInterval) {
            setScrollInterval(setInterval(() => {
                if (rowCardsRef.current) {
                    isScrollable();
                    rowCardsRef.current.scrollLeft += 5; // You can adjust the scroll distance as needed
                }
                
            }, 10)); // Adjust the scroll speed (lower interval for faster scrolling)
        }
    };

    const stopScrolling = () => {
        // Stop scrolling when the button is released
        if (scrollInterval) {
            clearInterval(scrollInterval);
            setScrollInterval(null);
        }
    };
    const isScrollable = () => {
        let r=false,l=false;
        if (rowCardsRef.current) {
            const { scrollWidth, clientWidth, scrollLeft } = rowCardsRef.current;
            const maxScrollLeft = scrollWidth - clientWidth;     
            if(
                (Math.floor(scrollLeft) < Math.floor(maxScrollLeft-0.1999999)) || ((maxScrollLeft-0.1999999) <= 0)
            ) r = true;
            if (scrollLeft > 0 ) l = true;    
        }
        console.log(l,r);
        setScrollable({ right: r, left:l });
    };

    useEffect(() => {
        serverInstance.get( requests.searchByCatagory + props.catagory).then((response) => {
            const videoData = response.data;
            const cardComponents = videoData.map((videoDetails) => {
                return <Card key={videoDetails.id} vidDetails={videoDetails} />;
            });
            setCards(cardComponents);
        });
        // Clean up the state when the component is unmounted
        return () => {
            setCards([]);
        };
    }, []);

    return (
        <div>
            <h1 className="catagoryTitle">{props.catagory}</h1>
            <div className='row'>
                <div ref={rowCardsRef} className="row__cards">
                    {cards}
                    {cards}
                    {cards}
                </div>
                <div className="row__buttons">
                    <button className="row__button scrollLeft" 
                        style={{opacity:(scrollable.left)?"1":"0.5"}}
                        onPointerDown={startScrollLeft} 
                         onPointerUp={stopScrolling}>Scroll Left</button>
                    <button className="row__button scrollRight" 
                         style={{opacity:(scrollable.right)?"1":"0.5"}}
                         onPointerDown={startScrollRight}
                         onPointerUp={stopScrolling}>Scroll Right</button>
                 </div>       
            </div>
        </div>
        
    );
};

export default Row;
