"use client"
import "@/styles/Home/Row.css";
import React, { useEffect, useRef, useState } from 'react';
import { Card } from './Card';
import Link from "next/link";


const Row = (props) => {
    const [cards, setCards] = useState([]);
    const [scrollInterval, setScrollInterval] = useState(null);
    const [scrollable, setScrollable] = useState({right:true, left:false});
    const rowCardsRef = useRef(null);


    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX = e.touches[0].clientX;
        const scrollDistance = touchStartX - touchEndX;
        rowCardsRef.current.scrollLeft += scrollDistance;
        touchStartX = touchEndX;
    };
    const handleTouchEnd = () => {
        stopScrolling();
    };

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
        setScrollable({ right: r, left:l });
    };

    useEffect(() => {
        props.getCardDataFunction(props.params).then((videoData) => {
            const cardComponents = videoData.map((videoDetails) => {
                return <Card key={videoDetails._id+props.heading} vidDetails={videoDetails} />;
            });
            setCards(cardComponents);
        });
        // Clean up the state when the component is unmounted
        return () => {
            setCards([]);
        };
    }, [props.getCardDataFunction]);

    if (cards==[] || cards==null || cards == ""){
        return null
    }
    return (
        <div>
            <Link href={"/CatagoryDetails/"+props.params}><h1 className="catagoryTitle">Watch {props.heading} Videos </h1></Link>
            <div className='row'>
                <div ref={rowCardsRef} className="row__cards">
                    {cards}
                </div>
                <div className="row__buttons">
                    <button className="row__button scrollLeft" 
                        style={{visibility:(scrollable.left)?"visible":"hidden"}}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onPointerDown={startScrollLeft} 
                         onPointerUp={stopScrolling}>Scroll Left</button>
                    <button className="row__button scrollRight" 
                         style={{visibility:(scrollable.right)?"visible":"hidden"}}
                         onPointerDown={startScrollRight}
                         onPointerUp={stopScrolling}>Scroll Right</button>
                 </div>       
            </div>
        </div>
        
    );
};

export default Row;
