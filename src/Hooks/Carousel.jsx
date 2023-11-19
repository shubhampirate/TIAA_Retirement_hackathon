// src/components/Carousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./Carouselstyles.css";

const CarouselAd = () => {
    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 6000,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },

        ]
    };

    const data = [
        {
            id: 1,
            imageUrl: 'https://www.youtube.com/embed/Bd89RijKF9I?si=d4g0xoBkujeVX_BY',
        },
        {
            id: 2,
            imageUrl: 'https://www.youtube.com/embed/pjR3wIGOZsc?si=PnA_FOQh9G2iVRwy',
        },
        {
            id: 3,
            imageUrl: 'https://www.youtube.com/embed/ifykklPqqxg?si=AMCgomt-rIGPfYu3',
        },
        {
            id: 4,
            imageUrl: 'https://www.youtube.com/embed/C2_gq2a7LzM?si=01rDspWNzHdQt0QE',
        },
        {
            id: 5,
            imageUrl: 'https://www.youtube.com/embed/W78IOLblD_M?si=nzXWEffzHyQIM_rQ',
        },
        {
            id: 6,
            imageUrl: 'https://www.youtube.com/embed/eiLIh38WZIM?si=8BrzAqoe4DFRnd-T',
        },
    ];


    return (
        <Slider {...settings} style={{ marginLeft: "-0.8rem" }}>
            {data.map(item => (
                <div key={item.id}>
                    <iframe
                        width="100%"
                        height="250"
                        src={item.imageUrl}
                        title="Video 1"
                        allowFullScreen
                        style={{ borderRadius: '10px' }}
                    ></iframe>
                </div>
            ))}
        </Slider>
    );
};

export default CarouselAd;

// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { Container, Typography } from '@mui/material';

// const imageUrls = [
//     'https://via.placeholder.com/1200x600?text=Image+1',
//     'https://via.placeholder.com/1200x600?text=Image+2',
//     'https://via.placeholder.com/1200x600?text=Image+3',
// ];

// const CarouselAd = () => {
//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         fade: true,
//     };

//     return (
//         <div className="App">
//             <Slider {...settings}>
//                 {imageUrls.map((imageUrl, index) => (
//                     <div key={index}>
//                         <img src={imageUrl} alt={`Carousel ${index + 1}`} style={{ width: "100%", height: "99%" }} />
//                     </div>
//                 ))}
//             </Slider>
//             <div className="text-overlay">
//                 <Container>
//                     <Typography variant="h3" component="h1" gutterBottom>
//                         Welcome to Our Website
//                     </Typography>
//                     <Typography variant="body1" gutterBottom>
//                         Explore our services and products to find what suits you best.
//                     </Typography>
//                 </Container>
//             </div>
//             <style>
//                 {`
//           .App {
//             position: relative;
//           }

//           .text-overlay {
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             text-align: center;
//             color: white;
//           }

//         `}
//             </style>
//         </div>
//     );
// };

// export default CarouselAd;
