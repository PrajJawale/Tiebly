import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setSerachJobInHeroFilter } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

function CategoryCarousel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categories = [
        "Backend Developer",
        "Frontend Developer",
        "Data Scientist",
        "Graphic Designer",
        "Full Stack Developer",
        "Content Writer"
    ];

    const handleCategoryClick = (category) => {
        dispatch(setSerachJobInHeroFilter(category)); // Dispatch the selected category as search filter
        navigate("/browse"); // Navigate to the browse page
    };

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {categories.map((item, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg-basic-1/3">
                            <Button
                                onClick={() => handleCategoryClick(item)} // Wrap actions in an arrow function
                                variant="outline"
                                className="rounded-full"
                            >
                                {item}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

export default CategoryCarousel;
