import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const products = [
    {
        id: 1,
        title: "Noise Mettle 1.4'' display, ...",
        rating: 4.1,
        reviews: "2,062 Ratings & 554 Reviews",
        price: "₹1,299",
        offer: "56% off",
        features: "Premium metal finish with metallic straps",
        img: "https://rukminim2.flixcart.com/image/300/300/xif0q/smartwatch/2/a/y/-original-imagxp8tywym39uq.jpeg?q=90",
        helpfulReview: {
            rating: 5,
            title: "Simply awesome",
            desc: "The headphone is comfortable to wear for a longer period. Good sound and mic quality. Fast connectivity...",
            user: "Neelay Rajani",
            time: "2 months ago"
        },
        recentReview: {
            rating: 4,
            title: "Worth the money",
            desc: "It's very good headphone overall. I am full justify. 👍",
            user: "Krishna",
            time: "3 days ago"
        }
    },
    {
        id: 2,
        title: "Apple New AirPods Max Bluet...",
        rating: 4.3,
        reviews: "568 Ratings & 32 Reviews",
        price: "₹59,900",
        offer: "",
        features: "Apple-designed dynamic driver provides high-fidelity audio",
        img: "https://rukminim2.flixcart.com/image/300/300/kigbjbk0-0/headphone/p/p/i/mgyh3hn-a-apple-original-imafy8wbdnh4kbkd.jpeg?q=90",
        helpfulReview: {
            rating: 5,
            title: "Must buy!",
            desc: "Excellent sound...bass is little less...not for bass lovers...price is although on higher side...",
            user: "Vivek Maitra",
            time: "Aug, 2021"
        },
        recentReview: {
            rating: 1,
            title: "Did not meet expectations",
            desc: "Extremely uncomfortable headphones, worst product from Apple I have ever seen",
            user: "Shudhanshu Dwivedi",
            time: "Nov, 2023"
        }
    },
    {
        id: 3,
        title: "Green GreenWhite 10 inches ...",
        rating: 3.9,
        reviews: "11 Ratings & 1 Reviews",
        price: "₹25,396",
        offer: "56% off",
        features: "Battery Type: Lead-acid (SLA), Battery Voltage: 48 V, Charging Time: 4 hrs, Motor: 250, Pedal Assist Levels: 1",
        img: "https://rukminim2.flixcart.com/image/300/300/xif0q/electric-cycle/h/e/b/green-udaan-electric-scooter-for-adult-s-with-40km-range-white-original-imah4uhqz8fdkanr.jpeg?q=90", // Add product image URL if available
        helpfulReview: {
            rating: 4,
            title: "Good quality product",
            desc: "Value of money",
            user: "Rahul aggarwal",
            time: "3 months ago"
        },
        recentReview: {
            rating: 4,
            title: "Good quality product",
            desc: "Value of money",
            user: "Rahul aggarwal",
            time: "3 months ago"
        }

    },

];

function ReviewCaed() {
    return (
        <div className="container-fluid">
            <div className=" py-4">
                <h4 className="mb-4">Reviews for Popular Headphones</h4>
                {products.map((product) => (
                    <div key={product.id} className="row mb-5 border-bottom pb-4">
                        <div className="col-md-2 text-center">
                            <img src={product.img} alt={product.title} className="img-fluid" />
                        </div>
                        <div className="col-md-10">
                            <h5 className="fw-semibold">{product.id}. {product.title}</h5>
                            <p className="text-muted mb-1">{product.rating}★ | {product.reviews}</p>
                            <p className="fw-bold text-success">{product.price} <span className="text-muted fw-normal">{product.offer}</span></p>
                            <p>{product.features}</p>

                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <h6 className="text-success">Most Helpful Review</h6>
                                    <p className="mb-1 fw-bold">{product.helpfulReview.rating}★ {product.helpfulReview.title}</p>
                                    <p className="small text-muted">{product.helpfulReview.desc}</p>
                                    <p className="text-muted small">— {product.helpfulReview.user}, {product.helpfulReview.time}</p>
                                </div>
                                <div className="col-md-6">
                                    <h6 className="text-success">Recent Review</h6>
                                    <p className="mb-1 fw-bold">{product.recentReview.rating}★ {product.recentReview.title}</p>
                                    <p className="small text-muted">{product.recentReview.desc}</p>
                                    <p className="text-muted small">— {product.recentReview.user}, {product.recentReview.time}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewCaed;
