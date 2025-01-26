/* eslint-disable no-magic-numbers */
import React, { useEffect, useState } from 'react';
import { Offer } from '@/interfaces/OfferInterface';
import { FaClock } from '@react-icons/all-files/fa/FaClock';
import { FaRegHourglass } from '@react-icons/all-files/fa/FaRegHourglass';

interface TimerProps {
    offer: Offer;
}

const Timer: React.FC<TimerProps> = ({ offer }) => {
    const [timeLeft, setTimeLeft] = useState<string>('');

    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const endDate = new Date(offer.endDate).getTime();
        const difference = endDate - now;

        if (difference <= 0) {
            setTimeLeft('Offer ended');
            return;
        }

        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(
            `${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${seconds
                .toString()
                .padStart(2, '0')}s`
        );
    };

    useEffect(() => {
        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [offer.endDate]);

    return (
        <div className="flex items-center space-x-2 text-lg font-semibold">
            <FaClock size={20} />
            <div>
                {timeLeft === 'Offer ended' ? (
                    <span className="flex items-center text-gray-600">
                        <FaRegHourglass size={18} className="mr-2" />
                        <span>{timeLeft}</span>
                    </span>
                ) : (
                    <span>{`Time left: ${timeLeft}`}</span>
                )}
            </div>
        </div>
    );
};

export default Timer;
