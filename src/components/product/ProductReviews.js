import React from 'react';
import { IoMdStar } from 'react-icons/io';

const ProductReviews = (props) => {

    const { user, comment, rateCount, createdAt } = props;

    return (
        <>
            <li>
                <div className="user_info">
                    <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt="user-img" />
                    <div>
                        <h4>{user.name}</h4>
                        <div className="user_ratings">
                            <span className="rating_star">
                                {
                                    [...Array(rateCount)].map((_, i) => <IoMdStar key={i} />)
                                }
                            </span>
                            <span>|</span>
                            <span className="date">{new Date(createdAt).toLocaleString(
                                "vi-VN"
                            )}</span>
                        </div>
                    </div>
                </div>
                <p className="user_review">{comment}</p>
            </li>
        </>
    );
};

export default ProductReviews;